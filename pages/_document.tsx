// Root Document
import React from 'react';
import url from 'url';
import { ServerStyleSheets } from '@material-ui/styles';
import NextDocument, { Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import flush from 'styled-jsx/server';
import theme from '~/theming/theme';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';

class Document extends NextDocument {
  render(): JSX.Element {
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
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />
          <link href="/static/prism.css" rel="stylesheet" media="screen" type="text/css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
Document.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
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

  // "middleware" to enforce we're on our cannoical host
  let targetHost = url.parse(process.env.CANONICAL_HOST as string).host;

  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.SKIP_CANONICAL_DOMAIN_REDIRECT !== 'true' &&
    targetHost !== ctx.req?.headers.host &&
    !ctx.asPath?.startsWith('/_ah/')
  ) {
    console.info(`Redirecting from ${ctx.req?.headers.host}${ctx.asPath}`);
    ctx.res?.writeHead(308, {
      Location: `${process.env.CANONICAL_HOST}${ctx.asPath}?redirected`,
    });
    ctx.res?.end();
    return { html: '' };
  }

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
    originalRenderPage({
      enhanceApp: (App) => (props: any) => sheets.collect(<App {...props} />),
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
