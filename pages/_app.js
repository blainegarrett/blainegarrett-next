import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from '../src/theming/GlobalStyles';
import getPageContext from '../src/theming/context';

import { Provider as ReduxProvider } from 'react-redux';
import withReduxStore from '../src/redux/withReduxStore';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>Blaine Garrett | Minneapolis Artist & Software Engineer</title>
        </Head>
        {/* Wrap every page in Styles and Theme providers */}
        <StylesProvider
          generateClassName={this.pageContext.generateClassName}
          sheetsRegistry={this.pageContext.sheetsRegistry}
          sheetsManager={this.pageContext.sheetsManager}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <ThemeProvider theme={this.pageContext.theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <GlobalStyles />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}

            <ReduxProvider store={reduxStore}>
              <Component pageContext={this.pageContext} {...pageProps} />
            </ReduxProvider>
          </ThemeProvider>
        </StylesProvider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
