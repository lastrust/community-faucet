export const shibuya = {
  id: 81,
  name: "Shibuya",
  network: "shibuya",
  nativeCurrency: {
    name: "SBY",
    symbol: "SBY",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://evm.shibuya.astar.network"] },
    public: { http: ["https://evm.shibuya.astar.network"] },
  },
  blockExplorers: {
    default: { name: "Subscan", url: "https://shibuya.subscan.io" },
  },
  testnet: true,
};

export const astar = {
  id: 592,
  name: "Astar",
  network: "astar",
  nativeCurrency: {
    name: "ASTR",
    symbol: "ASTR",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://evm.astar.network/"] },
    public: { http: ["https://evm.astar.network/"] },
  },
  blockExplorers: {
    default: { name: "Subscan", url: "https://astar.subscan.io" },
  },
  testnet: false,
};

export const shiden = {
  id: 336,
  name: "Shiden",
  network: "shiden",
  nativeCurrency: {
    name: "SDN",
    symbol: "SDN",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://shiden.api.onfinality.io/public"] },
    public: { http: ["https://shiden.api.onfinality.io/public"] },
  },
  blockExplorers: {
    default: { name: "Subscan", url: "https://shiden.subscan.io" },
  },
  testnet: true,
};
