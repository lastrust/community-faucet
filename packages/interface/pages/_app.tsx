import { NextUIProvider, Spacer } from '@nextui-org/react';
import { AppProps } from 'next/app';
import Layout from 'src/layout/layout';
import Themes from 'src/layout/themes';
import '../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Themes>
        <Layout>
          <Spacer y={1} />
          <Component {...pageProps} />
        </Layout>
      </Themes>
    </NextUIProvider>
  );
}

export default MyApp
