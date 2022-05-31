const HomePage = () => {
  const test = () => {
    void import("@polkadot/extension-dapp").then(
      ({ web3Accounts, web3Enable }) => {
        void web3Enable("Community Faucet");
        void web3Accounts().then(console.log);
      }
    );
  };
  return (
    <div className="container">
      <button className="btn" onClick={test}>
        Test
      </button>
    </div>
  );
};

export default HomePage;
