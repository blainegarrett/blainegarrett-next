// Main Document Component
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import {setContext, getContext} from '../context';

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    // Reset the context for handling a new request.
    setContext();
    const page = ctx.renderPage();
    // Get the context with the collected side effects.
    const context = getContext();
    return {
      ...page,
      styles: <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }} />
    };
  }

  render () {
    return (
      <html lang="en">
        <Head>
          <title> Welcome | Digital Home of Blaine Garrett </title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Blaine Garrett's Blog and Portfolio" />
          <meta name="author" content="Blaine Garrett" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

          { this.props.styles }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}