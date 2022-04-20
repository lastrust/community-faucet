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
    rpcUrls: ["https://matic-mainnet.chainstacklabs.com"],
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
    rpcUrls: ["https://evm.shibuya.astar.network"],
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
    rpcUrls: ["https://evm.astar.network/"],
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
    rpcUrls: ["https://shiden.api.onfinality.io/public"],
  },
};

export type ChainIds = keyof typeof chainParameters;

export const providerOptions = async () => ({
  walletconnect: {
    package: (await import("@walletconnect/web3-provider")).default,
    options: {
      rpc: {
        1: `https://mainnet.infura.io/v3/${
          process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || ""
        }`,
        80001: `https://rpc-mumbai.matic.today`,
        81: `https://evm.shibuya.astar.network`,
        592: `https://evm.astar.network/`,
        336: `https://evm.shiden.astar.network/`,
        137: `https://polygon-rpc.com/`,
      },
    },
  },
});

export const contractList = {
  astar: {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
    rpc: chainParameters["0x250"].rpcUrls[0],
    chainId: "0x250" as ChainIds,
  },
  shiden: {
    address: process.env["NEXT_PUBLIC_SHIDEN_CONTRACT_ADDRESS"] as string,
    rpc: chainParameters["0x150"].rpcUrls[0],
    chainId: "0x150" as ChainIds,
  },
  polygon: {
    address: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as string,
    rpc: chainParameters["0x89"].rpcUrls[0],
    chainId: "0x89" as ChainIds,
  },
  shibuya: {
    address: process.env.NEXT_PUBLIC_SHIBUYA_CONTRACT_ADDRESS as string,
    rpc: chainParameters["0x51"].rpcUrls[0],
    chainId: "0x51" as ChainIds,
  },
};

export type contractTypes = keyof typeof contractList;

export const symbolList: Record<contractTypes, string> = {
  astar: "ASTR",
  shiden: "SDN",
  polygon: "MATIC",
  shibuya: "SBY",
};

export const scanList: Record<contractTypes, string> = {
  astar:
    "https://astar.subscan.io/account/0x26DA9C05A9f7bcEFb9e342Bb35FA8aE338F9cCed?tab=transfer",
  shiden:
    "https://shiden.subscan.io/account/0x7F3D0a403dBAc1496DCa0D5cFb3196e9830e0fB8",
  polygon:
    "https://polygonscan.com/address/0xe29BFb891Db927E88134846DC34B482dd7f875f0",
  shibuya:
    "https://shibuya.subscan.io/account/0xd546Fa7F58d247C8c03d6b97525eE259ac50b63F",
};
