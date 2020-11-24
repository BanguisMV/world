import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
         <Head> 
            <link rel="shortcut icon" href="/worldwide.png" />
            <link rel="apple-touch-icon" href="/worldwide.png" />
            <meta name="theme-color" content="#61df0e" />
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-PGN7VFF6BL"></script>
            <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-PGN7VFF6BL');`
                    }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument