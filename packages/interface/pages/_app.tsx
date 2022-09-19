import '../styles/globals.css';
import App_nav from 'src/components/appshell';
import { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App_nav><Component {...pageProps} /></App_nav>
  );
}

export default MyApp
