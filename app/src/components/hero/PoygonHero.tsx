import dynamic from "next/dynamic";
import { useState } from "react";

const FaucetModal = dynamic(() => import("../modal/FaucetModal"), {
  ssr: false,
});
const SupportModal = dynamic(() => import("../modal/SupportModal"), {
  ssr: false,
});

const PolygonHero = () => {
  const [openSupport, setOpenSupport] = useState(false);
  const [openFaucet, setOpenFaucet] = useState(false);

  return (
    <>
      <SupportModal
        type="polygon"
        open={openSupport}
        onChange={setOpenSupport}
      />
      <FaucetModal type="polygon" open={openFaucet} onChange={setOpenFaucet} />
      <div className="hero hero-content mx-auto flex-col text-center sm:mt-32">
        <div className="max-w-xl py-8">
          <h1 className="text-4xl font-bold">Polygon Community Faucet</h1>
        </div>
        <div className="flex w-full max-w-2xl items-center justify-center gap-4">
          <button
            className="btn btn-primary"
            onClick={() => setOpenFaucet(!openFaucet)}
          >
            Get MATIC
          </button>
          <div className="text-xl font-bold">OR</div>
          <button
            className="btn btn-secondary"
            onClick={() => setOpenSupport(!openSupport)}
          >
            Support Faucet
          </button>
        </div>
      </div>
    </>
  );
};
export default PolygonHero;
