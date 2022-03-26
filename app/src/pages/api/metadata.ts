import { StudentFaucet__factory } from "@/util/contract";
import { targetChain } from "@/util/web3Util";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";

type queryMeta = {
  id?: number;
};

const tokenUri = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as queryMeta;
  invariant(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS && targetChain().rpcUrls[0] && id
  );

  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.astar.network:8545"
  );
  const contract = StudentFaucet__factory.connect(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    provider
  );

  const supportData = await contract.supportData(id);
  invariant(supportData);
  const { value, name, icon } = supportData;
  const astr = ethers.utils.formatEther(value);
  const grade = Math.min(3, Math.floor(Math.log10(Number(astr)))).toString();
  const imageQuery = new URLSearchParams([
    ["title", name],
    ["icon", icon],
    ["value", ethers.utils.formatEther(value.toString())],
    ["grade", grade],
  ]);

  const metadata = {
    description: `Proof NFT of ${name}'s ${astr}ASTR donation to the AStar Student Faucet`,
    image: `https://www.as-faucet.xyz/api/nftimage?${imageQuery.toString()}`,
    external_url: ``,
    name: `Proof of ${name}'s donation`,
    attributes: [
      { trait_type: "name", value: name },
      { trait_type: "icon", value: icon },
      { trait_type: "value", value: `${astr}ASTR` },
      { trait_type: "grade", value: grade },
    ],
  };
  res.status(200).json(metadata);
};

export default tokenUri;
