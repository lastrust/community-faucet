import "@/styles/global.css";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}) {
  return <Component {...pageProps} />;
}

export default MyApp;
