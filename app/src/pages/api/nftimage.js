import * as ethers from "ethers";
import * as playwright from "playwright-aws-lambda";
import ReactDOM from "react-dom/server";

const frameColors = [
  "bg-gradient-to-br from-green-600 to-blue-500",
  "bg-gradient-to-br from-cyan-500 to-pink-500",
  "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
  "bg-gradient-to-br from-yellow-500 via-orange-500 to-pink-500",
];

const Content = (props) => (
  <html>
    <head>
      <style>
        {`
          html, body {
            height: 100%;
          }
          .vertical-hr{
            writing-mode: vertical-rl;
          }
        `}
      </style>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>

    <body className={`h-full overflow-hidden bg-black px-10 py-10`}>
      <div
        className={`h-full w-full rounded-lg p-1 ${frameColors[props.grade]}`}
      >
        <div className="flex h-full w-full items-center rounded-lg bg-black px-4 shadow-2xl">
          <div className="flex grow flex-col gap-8">
            <div className="flex items-center gap-2">
              <img
                src={props.icon}
                className="h-28 w-28 rounded-full bg-white object-cover"
              />
              <p className="text-4xl font-bold text-white">{props.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-4xl font-light italic text-white">
                AStar Student Faucet
              </p>
            </div>
          </div>
          <div
            class={`vertical-hr h-full border-l-2 border-dashed border-gray-400 px-4 text-center font-mono text-6xl font-extrabold text-white`}
          >
            {props.value}
            <span className="text-5xl">ASTR</span>
          </div>
        </div>
      </div>
    </body>
  </html>
);

const debug = false;

export default async (req, res) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com/"
  );

  const browser = await playwright.launchChromium({ headless: !debug });
  const page = await browser.newPage({ viewport: { width: 800, height: 400 } });

  const props = {
    title: "inaridiy.eth",
    grade: 0,
    value: 100,
    icon: `https://lh3.googleusercontent.com/nq68MZh2ZssfDMCvGL-iyx-3a4kXmU8jmtBO0vWgYAsPNiHxxWmoONT4dalD9cIAig_CxDMkvueN5GpDh2btDZkgTGZufONV8CJwzGk=s0`,
  };
  const markup = ReactDOM.renderToStaticMarkup(<Content {...props} />);
  const html = `<!doctype html>${markup}`;

  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const imagePng = await page.screenshot({ type: "png" });
  // const imageWebp = await sharp(imagePng).webp({ quality: 75 }).toBuffer();
  !debug && (await browser.close());

  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");
  res.setHeader("Content-Type", "image/webp");
  res.end(imagePng);
};