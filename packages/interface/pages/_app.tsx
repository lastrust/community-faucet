import '../styles/globals.css';
import { AppProps } from 'next/app';
import { NextUIProvider, Spacer } from '@nextui-org/react';
import { withTRPC } from '@trpc/next';
import type { AppRouter } from './api/trpc/[trpc]';



import Layout from 'src/layout/layout';
import Themes from 'src/layout/themes';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Themes>
        <Layout>
          <Spacer y={3} />
          <Component {...pageProps} />
        </Layout>
      </Themes>
    </NextUIProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';
    return {
      url,
    };
  },

  ssr: false,
})(MyApp);

