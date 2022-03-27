import { StudentFaucet__factory } from "@/util/contract";
import { targetChain } from "@/util/web3Util";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";

type BodyType = {
  message?: string;
  signature?: string;
};

const allowedTime = 1000 * 60 * 1; //

const tokenUri = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    invariant(req.method == "POST", "must be POST method");

    const { message, signature } = req.body as BodyType;
    invariant(message && signature, "Body is not correct.");

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
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: String(e) });
  }
};

export default tokenUri;
