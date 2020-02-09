import React from 'react';
import { ServerStyleSheets } from '@material-ui/styles';
import NextDocument, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import theme from '../src/theming/theme';

class Document extends NextDocument {
  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="true" />
          <link rel="preconnect" href="https://www.google-analytics.com/" crossOrigin="true" />
          <link rel="preconnect" href="https://storage.googleapis.com/" crossOrigin="true" />
          {/* note if you change the icons, update manifest too */}
          {/* Use https://favicon.io/favicon-converter/ */}

          <link rel="manifest" href="/static/manifest.json"></link>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"></link>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={'user-scalable=0, initial-scale=1, ' + 'minimum-scale=1, width=device-width, height=device-height'}
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />
          <link href="/static/prism.css" rel="stylesheet" media="screen" type="text/css" />
          <style>
            {`
          .videoWrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
    margin: 0 -16px;
}
.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

}
`}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
Document.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        {sheets.getStyleElement()}
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default Document;
