import { useWeb3 } from "@/hooks/useWeb3";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { account, isLoading, connectWallet } = useWeb3();
  return (
    <div className="container mx-auto text-gray-800 flex flex-col h-full justify-center items-center">
      <h1 className="text-6xl font-bold">Hello Web3 World!!</h1>
      <p className="text-lg">
        This template contains
        Next.js,Hardhat,TypeScript,TailwindCSS,ESlint,Prettier and Web3Provider
        created by inaridiy.eth.
      </p>
      {isLoading ? (
        <button className="text-white bg-gray-600 text-4xl p-4" disabled>
          Loading
        </button>
      ) : account ? (
        <div className="text-3xl">
          {`wellcome ${account.ethName || account.abbreviatedId}`}
        </div>
      ) : (
        <button
          className="text-white bg-gray-800 text-4xl p-4 hover:scale-95 transition duration-150"
          onClick={() => void connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Home;
