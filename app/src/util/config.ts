export const chainParameters = {
  "0x89": {
    chainId: "0x89",
    blockExplorerUrls: ["https://polygonscan.com/"],
    chainName: "Polygon Mainnet",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    rpcUrls: ["https://polygon-rpc.com/"],
  },
  "0x13881": {
    chainId: "0x13881",
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    chainName: "Matic Mumbai",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  },
  "0x51": {
    chainId: "0x51",
    blockExplorerUrls: ["https://shibuya.subscan.io"],
    chainName: "Shibuya Network",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "SBY",
      symbol: "SBY",
    },
    rpcUrls: ["https://rpc.shibuya.astar.network:8545"],
  },
  "0x250": {
    chainId: "0x250",
    blockExplorerUrls: ["https://astar.subscan.io"],
    chainName: "Astar Network",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "ASTR",
      symbol: "ASTR",
    },
    rpcUrls: ["https://rpc.astar.network:8545"],
  },
  "0x150": {
    chainId: "0x150",
    blockExplorerUrls: ["https://blockscout.com/shiden/"],
    chainName: "Shiden Network",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "SDN",
      symbol: "SDN",
    },
    rpcUrls: ["https://evm.shiden.astar.network"],
  },
};

export const providerOptions = async () => ({
  walletconnect: {
    package: (await import("@walletconnect/web3-provider")).default,
    options: {
      rpc: {
        1: `https://mainnet.infura.io/v3/${
          process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || ""
        }`,
        80001: `https://rpc-mumbai.matic.today`,
        81: `https://rpc.shibuya.astar.network:8545`,
        592: `https://rpc.astar.network:8545`,
        336: `https://evm.shiden.astar.network`,
      },
    },
  },
});

export const contractList = {
  astar: {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
    rpc: chainParameters["0x250"].rpcUrls[0],
    chainId: "0x250",
  },
  shiden: {
    address: process.env["NEXT_PUBLIC_SHIDEN_CONTRACT_ADDRESS"] as string,
    rpc: chainParameters["0x150"].rpcUrls[0],
    chainId: "0x150",
  },
};
