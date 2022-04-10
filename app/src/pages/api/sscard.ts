import { NextApiRequest, NextApiResponse } from "next";
import * as playwright from "playwright-aws-lambda";
import invariant from "tiny-invariant";

const sscard = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type } = req.query;
  invariant(type === "shiden" || type === "polygon" || type == "shibuya");
  const browser = await playwright.launchChromium({ headless: true });
  const page = await browser.newPage({
    viewport:
      type === "polygon"
        ? { width: 400, height: 800 }
        : type === "shibuya"
        ? { width: 600, height: 600 }
        : { width: 800, height: 400 },
  });
  const queryString = new URLSearchParams(
    Object.entries(req.query as Record<string, string>)
  ).toString();
  //console.log(`http://localhost:3000/cards/${type}?${queryString}`);
  await page.goto(`http://localhost:3000/cards/${type}?${queryString}`, {
    waitUntil: "networkidle",
  });

  const image = await page.screenshot({ type: "png" });
  await browser.close();
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");
  res.setHeader("Content-Type", "image/png");
  res.end(image);
};

export default sscard;
