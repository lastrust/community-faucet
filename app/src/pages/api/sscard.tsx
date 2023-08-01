import { AstarCard } from "@/components/cards/AstarCard";
import { PolygonCard } from "@/components/cards/PolygonCard";
import { ShidenCard } from "@/components/cards/ShidenCard";
import { unstable_createNodejsStream } from "@vercel/og";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const loadFonts = async () => {
  const notoSansRegular = await fs.readFile(
    new URL(`../../assets/NotoSansJP-Regular.ttf`, import.meta.url),
  );
  const notoSansBold = await fs.readFile(
    new URL(`../../assets/NotoSansJP-Bold.ttf`, import.meta.url),
  );
  const robotoRegular = await fs.readFile(
    new URL(`../../assets/Roboto-Regular.ttf`, import.meta.url),
  );
  const robotoBold = await fs.readFile(new URL(`../../assets/Roboto-Bold.ttf`, import.meta.url));
  return {
    notoSansRegular,
    notoSansBold,
    robotoRegular,
    robotoBold,
  };
};

const cards = {
  astar: AstarCard,
  shiden: ShidenCard,
  polygon: PolygonCard,
  default: ShidenCard,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query;
  const fonts = await loadFonts();

  const props = {
    title: "Unknown supporter",
    grade: 0,
    value: "0.0",
    id: "000",
    icon: "",
    ...req.query,
  };

  const Card = cards[type as keyof typeof cards] || cards.default;

  const stream = await unstable_createNodejsStream(<Card {...props} />, {
    width: Card.size.width,
    height: Card.size.height,
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
