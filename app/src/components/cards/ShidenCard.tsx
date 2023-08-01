import { CardComponent } from "@/types/util";

const gradients = [
  "linear-gradient(90deg, #16a34a 0%, #3b82f6 100%)",
  "linear-gradient(90deg, #06b6d4 0%, #ec4899 100%)",
  "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
  "linear-gradient(90deg, #eab308 0%, #f97316 50%, #ec4899 100%)",
];

export const ShidenCard: CardComponent = (props) => {
  return (
    <div style={{ background: "#15191e" }} tw="flex h-full w-full p-12 bg-">
      <div
        style={{ background: "#1d232a", color: "#A6ADBB" }}
        tw="flex h-full w-full items-center shadow-xl rounded-xl"
      >
        <div tw="flex-1 flex flex-col p-8 h-full">
          <div
            style={{
              background: gradients[props.grade],
              backgroundClip: "text",
            }}
            tw="text-7xl flex font-bold text-transparent -mb-6"
          >
            {props.value}SDN
          </div>
          <p tw="text-xl italic">Shiden Community Faucet</p>
          <div tw="flex flex-1" />
          <div tw="flex items-center">
            {props.icon && (
              <img tw="w-20 h-20 mr-4 rounded-full object-cover" src={props.icon} alt="" />
            )}
            <div tw="text-3xl font-bold">{props.title}</div>
          </div>
        </div>
        <div tw="flex flex-col p-8 items-center">
          <img alt="" src="https://www.as-faucet.xyz/shiden.png" tw="w-40" />
          <p tw="text-5xl font-bold">#{props.id || "000"}</p>
        </div>
      </div>
    </div>
  );
};

ShidenCard.size = {
  width: 800,
  height: 400,
};
