import { db } from "@/firebase/server";
import { supportedContracts, SupportedContracts } from "@/util/config";
import { CommunityFaucetV2__factory } from "@/util/contract";
import { LimitChecker } from "@/util/limitChecker";
import axios from "axios";
import { ethers } from "ethers";
import { firestore } from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import Error from "next/error";
import requestIp from "request-ip";
import invariant from "tiny-invariant";

type BodyType = {
  message?: string;
  signature?: string;
  token?: string;
};

type RecaptchaResult = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  score: string;
  action: string;
};
const limitChecker = LimitChecker();

export class FixedProvider extends ethers.providers.JsonRpcBatchProvider {
  async getFeeData(): Promise<ethers.providers.FeeData> {
    const history = (await this.send("eth_feeHistory", [
      "0x1",
      "latest",
      [25],
    ])) as {
      baseFeePerGas: string[];
      reward: string[][];
    };

    const feeData = {
      gasPrice: null,
      lastBaseFeePerGas: null,
      maxFeePerGas: ethers.BigNumber.from(history.baseFeePerGas[1])
        .mul(2)
        .add(history.reward[0][0]),
      maxPriorityFeePerGas: ethers.BigNumber.from(history.reward[0][0]),
    };
    return feeData;
  }
}

const allowedTime = 1000 * 60 * 1; //署名の有効期限
const getRecaptchaVerificationUrl = (token: string) => {
  invariant(
    process.env.RECAPTCHA_SECRET_KEY,
    "RECAPTCHA_SECRET_KEY is not found"
  );
  return `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
};

const VerifyResult = (
  _action: string,
  { success, score, action }: RecaptchaResult
) => {
  if (process.env.NODE_ENV === "development") return true;
  success && Number(score) >= 0.7 && action === _action;
};

const tokenUri = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientIp = requestIp.getClientIp(req) || "IP_NOT_FOUND";
  await limitChecker.check(res, 3, clientIp);
  console.log(clientIp);
  if (clientIp.includes("162.158") || clientIp.includes("172.68")) {
    console.log("Teapot");
    return res.status(418).send("I'am a teapot.");
  }

  invariant(req.method == "POST", "must be POST method");

  const { message, signature, token } = req.body as BodyType;

  invariant(message && signature && token, "Body is not correct.");

  const [, , targetLine, timeLine, addressLine] = message.split("\n");
  const [type, time, address] = [
    targetLine.slice(8) as SupportedContracts,
    timeLine.slice(6),
    addressLine.slice(9),
  ];

  const { data: recaptchaResult } = await axios<RecaptchaResult>(
    getRecaptchaVerificationUrl(token)
  );

  invariant(VerifyResult(`drop_to__${address}`, recaptchaResult));

  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  const isMatchAddress =
    recoveredAddress.toLowerCase() === address.toLowerCase();
  const isInTime = Date.now() - Number(time) < allowedTime;
  invariant(isMatchAddress && isInTime, "Invalid signature");

  const { address: contractAddress, rpc } = supportedContracts[type];
  invariant(
    process.env.PRIVATE_KEY &&
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS &&
      contractAddress &&
      rpc,
    "env not found"
  );

  const provider = new FixedProvider(rpc);

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = CommunityFaucetV2__factory.connect(contractAddress, signer);

  const txOrError = await contract.drop(address).catch((e: Error) => e);

  await db.collection("drops").add({
    target: address,
    chain: type,

    timestamp: firestore.Timestamp.fromDate(new Date()),
    ip: clientIp,
    ip8: clientIp.split(".").slice(0, 1).join("."),
    ip16: clientIp.split(".").slice(0, 2).join("."),
    ip24: clientIp.split(".").slice(0, 3).join("."),
    txHash:
      txOrError instanceof Error || !txOrError.hash ? null : txOrError.hash,
    fullLog: JSON.stringify(txOrError),
    request: {
      time,
      address,
      signature,
    },
    recaptchaResult,
  });

  res.json({ status: "success" });
};

export default tokenUri;
