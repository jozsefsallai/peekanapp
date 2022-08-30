import '../styles/globals.css';
import type { AppProps } from 'next/app';

import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <section className="container">
      <Head>
        <title>Peek-An-App API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Free-to-use API for fetching information about Android and iOS apps."
        />
      </Head>
      <Component {...pageProps} />
    </section>
  );
}

export default MyApp;
