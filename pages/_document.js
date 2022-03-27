import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link rel="preload" href="/fonts/inter-v8-latin-ext_latin-regular.woff2" as="font" type="font/woff2" crossOrigin="true"></link>
        <link rel="preload" href="/fonts/quattrocento-v15-latin-700.woff2" as="font" type="font/woff2" crossOrigin="true"></link>
        <link rel="preload" href="/fonts/quattrocento-v15-latin-regular.woff2" as="font" type="font/woff2" crossOrigin="true"></link>
        </Head>

        <body className="bg-white dark:bg-zinc-900 font-body text-lg">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
