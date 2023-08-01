import { SupportedContracts, supportedContracts } from "@/config";
import { FAUCET_CONTRACT_ABI } from "@/constants/abis";
import { feeSuggester } from "@/util/feeSuggester";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Address,
  Hex,
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  verifyMessage,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";

interface RequestBody {
  message?: string;
  signature?: string;
  token?: string;
}

interface RecaptchaResult {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  score: string;
  action: string;
}

const ALLOWED_TIME = 1000 * 60 * 5; // 5 minutes

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST requests are allowed" });

  const { message, signature, token } = req.body as RequestBody;

  if (!message || !signature || !token)
    return res.status(400).json({ error: "Body is not correct." });

  const [, , targetLine, timeLine, addressLine] = message.split("\n");
  const [type, time, address] = [
    targetLine.slice(8) as SupportedContracts,
    timeLine.slice(6),
    addressLine.slice(9),
  ];

  const { data: recaptchaResult } = await axios<RecaptchaResult>(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  );
  const { success, score } = recaptchaResult;
  if (!success || Number(score) < 0.5)
    return res.status(400).json({ error: "Recaptcha failed." });

  const isInTime = Date.now() - Number(time) < ALLOWED_TIME;
  if (!isInTime) return res.status(400).json({ error: "Time is not correct." });

  const valid = await verifyMessage({
    address: address as Address,
    message,
    signature: signature as Hex,
  });
  if (!valid)
    return res.status(400).json({ error: "Signature verification failed." });

  const wallet = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
  const { chain, address: contractAddress } = supportedContracts[type];
  const publicClient = createPublicClient({ chain, transport: http() });
  const walletClient = createWalletClient({
    chain,
    transport: http(),
    account: wallet,
  });
  const contract = getContract({
    address: contractAddress,
    abi: FAUCET_CONTRACT_ABI,
    publicClient,
    walletClient,
  });

  try {
    const tx = await contract.write.drop(
      [address as Address],
      await feeSuggester(publicClient)
    );

    return res.status(200).json({ status: "success", tx });
  } catch (e) {
    const e_ = e as Error;
    return res.status(400).json({
      status: "error",
      error: e_.message,
    });
  }
}
