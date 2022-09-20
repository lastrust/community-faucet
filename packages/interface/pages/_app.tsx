import '../styles/globals.css';
import { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import Layout from 'src/layout/layout';
import Themes from 'src/layout/themes';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Themes>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Themes>
    </NextUIProvider>
  );
}

export default MyApp
