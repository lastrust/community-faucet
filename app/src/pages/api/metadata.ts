import { usefulZeroFill } from "@/util";
import { contractList, contractTypes } from "@/util/config";
import { StudentFaucet__factory } from "@/util/contract";
import { targetChain } from "@/util/web3Util";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";

type queryMeta = {
  id?: number;
  type?: contractTypes;
};

const getGrade = (value: number | string, min = 0, max = 3) =>
  Math.max(
    min,
    Math.min(max, Math.floor(Math.log10(Number(value))))
  ).toString();

const getQueryUrl = (query: Record<string, string | number>) =>
  new URLSearchParams(
    Object.entries(query).map(([key, value]) => [key, String(value)])
  ).toString();

const tokenUri = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, type = "astar" } = req.query as queryMeta;
  invariant(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS && targetChain().rpcUrls[0] && id
  );

  const { rpc, address } = contractList[type];
  const contract = StudentFaucet__factory.connect(
    address,
    new ethers.providers.JsonRpcProvider(rpc)
  );

  const supportData = await contract.supportData(id);
  invariant(supportData);
  const { value, name, icon } = supportData;

  const astr = ethers.utils.formatEther(value);
  const grade = getGrade(astr, 0, 3);
  const idString = usefulZeroFill(id, 3);
  const imageQuery = getQueryUrl({
    title: name,
    icon,
    value: ethers.utils.formatEther(value),
    grade,
    id: idString,
  });

  if (type === "astar") {
    const metadata = {
      description: `Proof NFT of ${name}'s ${astr}ASTR donation to the AStar Student Faucet`,
      image: `https://www.as-faucet.xyz/api/nftimage?${imageQuery.toString()}`,
      external_url: `https://www.as-faucet.xyz/`,
      name: `Proof of ${name}'s donation`,
      attributes: [
        { trait_type: "name", value: name },
        { trait_type: "icon", value: icon },
        { trait_type: "value", value: `${astr}ASTR` },
        { trait_type: "grade", value: grade },
      ],
    };
    res.status(200).json(metadata);
  } else if (type === "shiden") {
    const metadata = {
      description: `Proof NFT of ${name}'s ${astr}SDN donation to the SDN Student Faucet`,
      image: `https://www.as-faucet.xyz/api/sscard?type=${type}&${imageQuery.toString()}`,
      external_url: `https://www.as-faucet.xyz/`,
      name: `${name}'s Shiden Student Faucet Supporter NFT`,
      attributes: [
        { trait_type: "name", value: name },
        { trait_type: "icon", value: icon },
        { trait_type: "value", value: `${astr}SDN` },
        { trait_type: "grade", value: grade },
      ],
    };
    res.status(200).json(metadata);
  } else if (type === "polygon") {
    const metadata = {
      description: `Proof NFT of ${name}'s ${astr}MATIC donation to the MATIC Student Faucet`,
      image: `https://www.as-faucet.xyz/api/sscard?type=${type}&${imageQuery.toString()}`,
      external_url: `https://www.as-faucet.xyz/`,
      name: `${name}'s MATIC Student Faucet Supporter NFT`,
      attributes: [
        { trait_type: "name", value: name },
        { trait_type: "icon", value: icon },
        { trait_type: "value", value: `${astr}MATIC` },
        { trait_type: "grade", value: grade },
      ],
    };
    res.status(200).json(metadata);
  } else if (type === "shibuya") {
    const metadata = {
      description: `Proof NFT of ${name}'s ${astr}SBY donation to the Shibuya Student Faucet`,
      image: `https://www.as-faucet.xyz/api/sscard?type=${type}&${imageQuery.toString()}`,
      external_url: `https://www.as-faucet.xyz/`,
      name: `${name}'s SBY Student Faucet Supporter NFT`,
      attributes: [
        { trait_type: "name", value: name },
        { trait_type: "icon", value: icon },
        { trait_type: "value", value: `${astr}SBY` },
        { trait_type: "grade", value: grade },
      ],
    };
    res.status(200).json(metadata);
  } else {
    res.status(400).json({});
  }
};

export default tokenUri;
