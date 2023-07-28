import { unstable_createNodejsStream } from "@vercel/og";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import url from "node:url";
import { join } from "path";

const loadFontFromName = async (name: string) => {
  const font = await fs.readFile(
    join(url.fileURLToPath(import.meta.url), `../../../assets/${name}`)
  );
  return font;
};

const loadFonts = async () => {
  const notoSansRegular = await loadFontFromName("NotoSansJP-Regular.ttf");
  const notoSansBold = await loadFontFromName("NotoSansJP-Bold.ttf");
  const robotoRegular = await loadFontFromName("Roboto-Regular.ttf");
  const robotoBold = await loadFontFromName("Roboto-Bold.ttf");
  return {
    notoSansRegular,
    notoSansBold,
    robotoRegular,
    robotoBold,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fonts = await loadFonts();

  const props = {
    title: "Unknown supporter",
    grade: 0,
    value: 0,
    id: "000",
    icon: "https://pbs.twimg.com/profile_images/1534222359271723009/h-OK92Rp_400x400.jpg",
    ...req.query,
  };

  const stream = await unstable_createNodejsStream(
    <div tw="flex w-full h-full bg-black p-10">
      <div tw="flex w-full h-full bg-white p-1 rounded-xl">
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
    </div>,
    {
      width: 800,
      height: 400,
      fonts: [
        {
          name: "NotoSans",
          data: fonts.notoSansRegular,
          weight: 400,
        },
        {
          name: "NotoSans",
          data: fonts.notoSansBold,
          weight: 700,
        },
        {
          name: "Roboto",
          data: fonts.robotoRegular,
          weight: 400,
        },
        {
          name: "Roboto",
          data: fonts.robotoBold,
          weight: 700,
        },
      ],
    }
  );
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.statusCode = 200;
  res.statusMessage = "OK";
  stream.pipe(res);
}
