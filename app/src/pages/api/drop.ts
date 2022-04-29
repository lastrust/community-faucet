import { contractList, contractTypes } from "@/util/config";
import { CommunityFaucetV2__factory } from "@/util/contract";
import { LimitChecker } from "@/util/limitChecker";
import axios from "axios";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
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

const allowedTime = 1000 * 60 * 1; //署名の有効期限
const getRecaptchaVerificationUrl = (token: string) => {
  invariant(process.env.RECAPTCHA_SECRET_KEY);
  return `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
};
const VerifyResult = (
  _action: string,
  { success, score, action, challenge_ts }: RecaptchaResult
) => success && Number(score) >= 0.7 && action === _action;

const tokenUri = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientIp = requestIp.getClientIp(req) || "IP_NOT_FOUND";
  await limitChecker.check(res, 3, clientIp);

  invariant(req.method == "POST", "must be POST method");

  const { message, signature, token } = req.body as BodyType;

  invariant(message && signature && token, "Body is not correct.");

  const [, , targetLine, timeLine, addressLine] = message.split("\n");
  const [type, time, address] = [
    targetLine.slice(8) as contractTypes,
    timeLine.slice(6),
    addressLine.slice(9),
  ];

  const { data: recaptchaResult } = (await axios(
    getRecaptchaVerificationUrl(token)
  )) as { data: RecaptchaResult };

  invariant(VerifyResult(`drop_to_${address}`, recaptchaResult));

  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  const isMatchAddress =
    recoveredAddress.toLowerCase() === address.toLowerCase();
  const isInTime = Date.now() - Number(time) < allowedTime;
  invariant(isMatchAddress && isInTime, "Invalid signature");

  const { address: contractAddress, rpc } = contractList[type];
  invariant(
    process.env.PRIVATE_KEY &&
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS &&
      contractAddress &&
      rpc,
    "env not found"
  );

  const signer = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    new ethers.providers.JsonRpcProvider(rpc)
  );
  const contract = CommunityFaucetV2__factory.connect(contractAddress, signer);

  const tx = await contract.drop(
    address,
    type === "polygon"
      ? {
          maxFeePerGas: ethers.utils.parseUnits("40", "gwei"),
          maxPriorityFeePerGas: ethers.utils.parseUnits("40", "gwei"),
        }
      : {}
  );

  res.json({ status: "success" });
};

export default tokenUri;
