import React from 'react';
import NextApp from 'next/app';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from '../src/theming/GlobalStyles';
import theme from '../src/theming/theme';
import AppContextProvider from '../src/contexts/AppContext';
import analytics from '../src/analytics';

class App extends NextApp {
  componentDidMount() {
    // Initialize Google Analytics
    analytics.init();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        {/* Wrap every page in Styles and Theme providers */}
        <StylesProvider injectFirst={true}>
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <GlobalStyles />
            <AppContextProvider>
              <Component {...pageProps} />
            </AppContextProvider>
          </ThemeProvider>
        </StylesProvider>
      </React.Fragment>
    );
  }
}

export default App;

//export default withReduxStore(App);
