import { supportedContracts, SupportedContracts } from "@/config";
import { FAUCET_CONTRACT_ABI } from "@/constants/abis";
import { usefulZeroFill } from "@/util";
import { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";
import { createPublicClient, formatEther, getContract, http } from "viem";

type QueryMeta = {
  id?: number;
  type?: SupportedContracts;
};

const getGrade = (value: number | string, min = 0, max = 3) =>
  Math.max(min, Math.min(max, Math.floor(Math.log10(Number(value))))).toString();

const getQueryUrl = (query: Record<string, string | number>) =>
  new URLSearchParams(Object.entries(query).map(([key, value]) => [key, String(value)])).toString();

const tokenUri = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, type = "astar" } = req.query as QueryMeta;
  invariant(id);

  const { chain, address } = supportedContracts[type];
  const client = createPublicClient({ chain, transport: http() });

  const contract = getContract({
    address,
    abi: FAUCET_CONTRACT_ABI,
    publicClient: client,
  });

  const supportData = await contract.read.supportData([BigInt(id)]);
  invariant(supportData);
  const { value, name, icon } = supportData;

  const formatedValue = formatEther(value);
  const grade = getGrade(formatedValue, 0, 3);
  const idString = usefulZeroFill(id, 3);
  const imageQuery = getQueryUrl({
    title: name,
    icon,
    value: formatedValue,
    grade,
    id: idString,
  });

  if (type === "astar") {
    const metadata = {
      description: `Proof NFT of ${name}'s ${formatedValue}ASTR donation to the AStar Student Faucet`,
      image: `https://www.as-faucet.xyz/api/sscard?type=${type}&${imageQuery.toString()}`,
      external_url: `https://www.as-faucet.xyz/`,
      name: `Proof of ${name}'s donation`,
      attributes: [
        { trait_type: "name", value: name },
        { trait_type: "icon", value: icon },
        { trait_type: "value", value: `${formatedValue}ASTR` },
        { trait_type: "grade", value: grade },
      ],
    };
    res.status(200).json(metadata);
  } else if (type === "shiden") {
    const metadata = {
      description: `Proof NFT of ${name}'s ${formatedValue}SDN donation to the SDN Student Faucet`,
      image: `https://www.as-faucet.xyz/api/sscard?type=${type}&${imageQuery.toString()}`,
      external_url: `https://www.as-faucet.xyz/`,
      name: `${name}'s Shiden Student Faucet Supporter NFT`,
      attributes: [
        { trait_type: "name", value: name },
        { trait_type: "icon", value: icon },
        { trait_type: "value", value: `${formatedValue}SDN` },
        { trait_type: "grade", value: grade },
      ],
    };
    res.status(200).json(metadata);
  } else if (type === "polygon") {
    const metadata = {
      description: `Proof NFT of ${name}'s ${formatedValue}MATIC donation to the MATIC Student Faucet`,
      image: `https://www.as-faucet.xyz/api/sscard?type=${type}&${imageQuery.toString()}`,
      external_url: `https://www.as-faucet.xyz/`,
      name: `${name}'s MATIC Student Faucet Supporter NFT`,
      attributes: [
        { trait_type: "name", value: name },
        { trait_type: "icon", value: icon },
        { trait_type: "value", value: `${formatedValue}MATIC` },
        { trait_type: "grade", value: grade },
      ],
    };
    res.status(200).json(metadata);
  } else if (type === "shibuya") {
    const metadata = {
      description: `Proof NFT of ${name}'s ${formatedValue}SBY donation to the Shibuya Student Faucet`,
      image: `https://www.as-faucet.xyz/pi/sscard?type=${type}&${imageQuery.toString()}`,
      external_url: `https://www.as-faucet.xyz/`,
      name: `${name}'s SBY Student Faucet Supporter NFT`,
      attributes: [
        { trait_type: "name", value: name },
        { trait_type: "icon", value: icon },
        { trait_type: "value", value: `${formatedValue}SBY` },
        { trait_type: "grade", value: grade },
      ],
    };
    res.status(200).json(metadata);
  } else {
    res.status(400).json({});
  }
};

export default tokenUri;
