// Main Next App Wrapper
import React from 'react';
import NextApp, { AppProps } from 'next/app';
import Head from 'next/head';

import { Store } from 'redux';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '~/theming/theme';
import AppContextProvider from '~/contexts/AppContext';
import analytics from '~/analytics';
import withReduxStore from '~/redux/withReduxStore';
import { Provider as ReduxProvider } from 'react-redux';

interface MyAppProps extends AppProps {
  reduxStore: Store;
}

class App extends NextApp<MyAppProps> {
  componentDidMount(): void {
    // Initialize Google Analytics
    analytics.init();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render(): JSX.Element {
    const { reduxStore, Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>

        {/* Wrap every page in Styles and Theme providers */}
        <StylesProvider injectFirst={true}>
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ReduxProvider store={reduxStore}>
              <AppContextProvider>
                <Component {...pageProps} />
              </AppContextProvider>
            </ReduxProvider>
          </ThemeProvider>
        </StylesProvider>
      </>
    );
  }
}

export default withReduxStore(App);
