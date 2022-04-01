import { Head, Html, Main, NextScript } from "next/document";
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";
GA_TRACKING_ID || console.warn("GA_TRACKING_ID is not defined");

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9592509925467345"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1HXFRJPWX4"
        ></script>
        {GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}');
                  `,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
