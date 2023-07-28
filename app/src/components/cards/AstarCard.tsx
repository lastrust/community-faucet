import { FC } from "react";

const gradients = [
  "linear-gradient(90deg, #16a34a 0%, #3b82f6 100%)",
  "linear-gradient(90deg, #06b6d4 0%, #ec4899 100%)",
  "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
  "linear-gradient(90deg, #eab308 0%, #f97316 50%, #ec4899 100%)",
];

export const AstarCard: FC<{
  title: string;
  grade: number;
  value: number;
  id: string;
  icon: string;
}> = (props) => {
  return (
    <div tw="flex w-full h-full bg-black p-10">
      <div
        style={{ background: gradients[props.grade] }}
        tw="flex w-full h-full p-1 rounded-xl"
      >
        <div tw="flex items-center justify-center w-full h-full bg-black rounded-xl">
          <div tw="flex flex-col flex-1 p-8">
            <div tw="flex mb-8 flex items-center">
              {props.icon && (
                <img
                  alt=""
                  src={props.icon}
                  tw="mr-2 h-28 w-28 rounded-full bg-white object-cover"
                />
              )}
              <div tw="text-4xl font-bold text-white">{props.title}</div>
            </div>
            <div tw="flex items-center">
              <div tw="flex text-5xl font-bold text-white mr-2">
                #{props.id}
              </div>
              <div tw="flex text-3xl font-light italic text-gray-300">
                AStar Community Faucet
              </div>
            </div>
          </div>
          <div
            style={{ borderLeft: "2px dashed white" }}
            tw="flex h-full text-white text-6xl font-bold w-26"
          >
            <div
              style={{ transform: `rotate(90deg) translate(-30px,0)` }}
              tw="flex items-center"
            >
              {props.value}
              <span tw="text-5xl">ASTR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
