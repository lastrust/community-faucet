import { astar, shibuya, shiden } from "@/constants/chains";
import { Address } from "wagmi";
import { Chain, polygon } from "wagmi/chains";

export const supportedChains = [
  polygon,
  shibuya,
  astar,
  shiden,
] satisfies Chain[];

export const supportedContracts = {
  astar: {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    chain: astar,
  },
  shiden: {
    address: process.env.NEXT_PUBLIC_SHIDEN_CONTRACT_ADDRESS as Address,
    chain: shiden,
  },
  polygon: {
    address: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as Address,
    chain: polygon,
  },
  shibuya: {
    address: process.env.NEXT_PUBLIC_SHIBUYA_CONTRACT_ADDRESS as Address,
    chain: shibuya,
  },
};

export type SupportedContracts = keyof typeof supportedContracts;

export const symbolList: Record<SupportedContracts, string> = {
  astar: "ASTR",
  shiden: "SDN",
  polygon: "MATIC",
  shibuya: "SBY",
};

export const scanList: Record<SupportedContracts, string> = {
  astar:
    "https://astar.subscan.io/account/0x26DA9C05A9f7bcEFb9e342Bb35FA8aE338F9cCed?tab=transfer",
  shiden:
    "https://shiden.subscan.io/account/0x7F3D0a403dBAc1496DCa0D5cFb3196e9830e0fB8",
  polygon:
    "https://polygonscan.com/address/0xe29BFb891Db927E88134846DC34B482dd7f875f0",
  shibuya:
    "https://shibuya.subscan.io/account/0xd546Fa7F58d247C8c03d6b97525eE259ac50b63F",
};
