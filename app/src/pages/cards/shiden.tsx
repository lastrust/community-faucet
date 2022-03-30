import type { NextPage } from "next";
import { useRouter } from "next/router";

const frameColors = [
  "bg-gradient-to-br from-green-500 to-blue-400",
  "bg-gradient-to-br from-cyan-400 to-pink-500",
  "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
  "bg-gradient-to-br from-yellow-500 via-orange-500 to-pink-500",
];

const ShidenCard: NextPage = () => {
  const { query } = useRouter();
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-base-300 text-base-content"
      data-theme="dark"
    >
      <div className="artboard card artboard-horizontal phone-2 card-side max-h-72 bg-base-100 shadow-xl">
        <div className="card-body w-2/3">
          <h1
            className={`card-title -mb-2 w-fit bg-clip-text font-mono text-7xl font-extrabold text-transparent ${frameColors[2]}`}
          >
            {query.value || "0.0"}SDN
          </h1>
          <p className="text-xl italic">Shiden Student Faucet</p>
          <div className="flex items-center">
            {query.icon && (
              <div className="mask mask-hexagon mr-2 w-24 bg-primary">
                <img src={String(query.icon)} />
              </div>
            )}
            <p className="break-all text-3xl font-bold">
              {query.title || "Unknown supporter"}
            </p>
          </div>
        </div>
        <div className="card-body w-40">
          <img src="/shiden.png" alt="shiden" className="object-contain" />
          <p className="text-5xl font-bold">#{query.id || "000"}</p>
        </div>
      </div>
    </div>
  );
};

export default ShidenCard;
