import { PolygonCard } from "@/components/cards/PolygonCard";
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

  const stream = await unstable_createNodejsStream(<PolygonCard {...props} />, {
    width: 400,
    height: 800,
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
  });
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.statusCode = 200;
  res.statusMessage = "OK";
  stream.pipe(res);
}
