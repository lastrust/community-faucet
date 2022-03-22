import * as playwright from "playwright-aws-lambda";
import ReactDOM from "react-dom/server";

const frameColors = [
  "bg-cyan-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-red-600",
];

const Content = (props) => (
  <html>
    <head>
      <style>
        {`
          html, body {
            height: 100%;
          }
        `}
      </style>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>

    <body className="h-full bg-black p-8 text-white">
      <div className={`h-full w-full p-2 ${frameColors[props.grade]}`}>
        <div className="h-full w-full bg-black">
          <h1 className="text-6xl">{frameColors[2]}</h1>
        </div>
      </div>
    </body>
  </html>
);

export default async (req, res) => {
  const browser = await playwright.launchChromium();
  const page = await browser.newPage({ viewport: { width: 500, height: 800 } });

  const props = { title: "Hello OGP!", grade: 0 };
  const markup = ReactDOM.renderToStaticMarkup(<Content {...props} />);
  const html = `<!doctype html>${markup}`;

  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const image = await page.screenshot({ type: "png" });
  await browser.close();

  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");
  res.setHeader("Content-Type", "image/png");
  res.end(image);
};
