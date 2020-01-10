import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name='msapplication-config'
            content='/static/icons/browserconfig.xml'
          />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta http-Equiv='content-language' content='en' />
          <meta http-Equiv='Content-Type' content='text/html; charset=utf-8' />
          <title>Bangkok JS</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
