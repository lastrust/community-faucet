import { StudentFaucet__factory } from "@/util/contract";
import { targetChain } from "@/util/web3Util";
import axios from "axios";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
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

const allowedTime = 1000 * 60 * 1; //署名の有効期限
const getRecaptchaVerificationUrl = (token: string) => {
  invariant(process.env.RECAPTCHA_SECRET_KEY);
  return `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
};
const VerifyResult = (
  _action: string,
  { success, score, action, challenge_ts }: RecaptchaResult
) =>
  success &&
  Number(score) > 0.8 &&
  action === _action &&
  Date.now() - new Date(challenge_ts).getTime() < allowedTime;

const tokenUri = async (req: NextApiRequest, res: NextApiResponse) => {
  invariant(req.method == "POST", "must be POST method");

  const { message, signature, token } = req.body as BodyType;
  invariant(message && signature && token, "Body is not correct.");

  const { data: recaptchaResult } = (await axios(
    getRecaptchaVerificationUrl(token)
  )) as { data: RecaptchaResult };

  invariant(VerifyResult("faucet_astar", recaptchaResult));

  const [, , timeLine, addressLine] = message.split("\n");
  const [time, address] = [timeLine.slice(6), addressLine.slice(9)];

  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  const isMatchAddress =
    recoveredAddress.toLowerCase() === address.toLowerCase();
  const isInTime = Date.now() - Number(time) < allowedTime;
  invariant(isMatchAddress && isInTime, "Invalid signature");

  invariant(
    process.env.PRIVATE_KEY && process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    "env not found"
  );
  const provider = new ethers.providers.JsonRpcProvider(
    targetChain().rpcUrls[0]
  );
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = StudentFaucet__factory.connect(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    signer
  );

  const tx = await contract.drop(address, {
    gasLimit: "100000",
  });

  res.json({ status: "success" });
};

export default tokenUri;
