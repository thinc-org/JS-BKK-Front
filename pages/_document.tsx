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
      <Html lang='en'>
        <Head>
          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=UA-99360357-6'
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-99360357-6');
              `
            }}
          />
          <meta
            name='msapplication-config'
            content='/static/icons/browserconfig.xml'
          />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta httpEquiv='content-language' content='en' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
