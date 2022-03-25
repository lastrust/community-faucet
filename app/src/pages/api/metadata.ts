import { StudentFaucet__factory } from "@/util/contract";
import { selectFirst, targetChain } from "@/util/web3Util";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";

type queryMeta = {
  id?: number;
};

const tokenUri = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as queryMeta;
  invariant(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  invariant(id);
  const provider = new ethers.providers.JsonRpcProvider(
    targetChain().rpcUrls[0]
  );
  const contract = StudentFaucet__factory.connect(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    provider
  );
  const supportData = selectFirst(
    await contract.queryFilter(contract.filters.Support(id))
  );
  invariant(supportData);
  const { value, name, icon } = supportData.args;
  const astr = ethers.utils.formatEther(value);
  const grade = Math.max(3, Math.floor(Math.log10(Number(astr)))).toString();
  const imageQuery = new URLSearchParams([
    ["title", name],
    ["icon", icon],
    ["value", value.toString()],
    ["grade", grade],
  ]);

  const metadata = {
    description: `Proof NFT of ${name}'s ${astr}ASTR donation to the AStar Student Faucet`,
    image: `https://www.as-faucet.xyz/api/nftimage?${imageQuery.toString()}`,
    external_url: ``,
    name: `${""}'s  Meishi`,
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
