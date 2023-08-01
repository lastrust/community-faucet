import { FC } from "react";

const gradients = [
  "linear-gradient(90deg, #16a34a 0%, #3b82f6 100%)",
  "linear-gradient(90deg, #06b6d4 0%, #ec4899 100%)",
  "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
  "linear-gradient(90deg, #eab308 0%, #f97316 50%, #ec4899 100%)",
];

export const PolygonCard: FC<{
  title: string;
  grade: number;
  value: string;
  id: string;
  icon: string;
}> = (props) => {
  return (
    <div
      style={{ background: "#d1c300" }}
      tw="flex flex-col h-full w-full items-center px-8 py-24"
    >
      <div
        style={{ background: "#ffee00" }}
        tw="flex flex-col h-full w-full items-center shadow-xl"
      >
        {props.icon && (
          <img
            style={{
              width: "182px",
              height: "201px",
              clipPath:
                "path(M.3 65.486c0-9.196 6.687-20.063 14.211-25.078l61.86-35.946c8.36-5.016 20.899-5.016 29.258 0l61.86 35.946c8.36 5.015 14.211 15.882 14.211 25.078v71.055c0 9.196-6.687 20.063-14.211 25.079l-61.86 35.945c-8.36 4.18-20.899 4.18-29.258 0L14.51 161.62C6.151 157.44.3 145.737.3 136.54V65.486Z)",
            }}
            tw="mt-4 object-cover"
            src={String(props.icon)}
            alt=""
          />
        )}

        <div
          style={{
            background: gradients[2],
            backgroundClip: "text",
          }}
          tw={`my-4 flex text-center text-4xl font-bold text-transparent`}
        >
          {props.title}
        </div>

        <div tw="flex flex-1" />
        <p tw="text-center text-5xl font-bold -mb-4 ">
          {props.value || "0.0"}MATIC
        </p>
        <p tw="mb-4 text-center text-lg">Matic Community Faucet</p>
      </div>
    </div>
  );
};
