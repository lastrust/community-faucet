import { BigNumberish } from "ethers";

export const CORE_DOMAIN = {
  name: "CommunityFaucet",
  version: "2.0.0",
};

export type FieldTypes = {
  uint256: BigNumberish;
  address: string;
};

export type StructType<
  T extends Readonly<{ name: string; type: keyof FieldTypes }[]>
> = {
  [K1 in T[number]["name"]]: FieldTypes[Extract<
    T[number],
    { name: K1 }
  >["type"]];
};

export const DropRequestParam = [
  { name: "chainId", type: "uint256" },
  { name: "address", type: "address" },
  { name: "signedAt", type: "uint256" },
] as const;

export type DropRequest = StructType<typeof DropRequestParam>;
