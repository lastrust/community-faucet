import '../styles/globals.css';
import { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp
