import axios from "axios";
import { PublicClient, parseGwei } from "viem";

interface PolygonGasStationResponse {
  safeLow: {
    maxPriorityFee: number;
    maxFee: number;
  };
  standard: {
    maxPriorityFee: number;
    maxFee: number;
  };
  fast: {
    maxPriorityFee: number;
    maxFee: number;
  };
  estimatedBaseFee: number;
  blockTime: number;
  blockNumber: number;
}

const POLYGON_GAS_STATION_URL = "https://gasstation.polygon.technology/v2";

export const feeSuggester = async (client: PublicClient) => {
  const { chain } = client;
  if (chain?.id === 137) {
    const { data } = await axios.get<PolygonGasStationResponse>(POLYGON_GAS_STATION_URL);
    return {
      maxPriorityFeePerGas: parseGwei(String(data.fast.maxPriorityFee)),
      maxFeePerGas: parseGwei(String(data.fast.maxFee)),
    };
  }

  return { maxPriorityFeePerGas: undefined, maxFeePerGas: undefined };
};
