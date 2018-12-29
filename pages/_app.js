import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { PageTransition } from 'next-page-transitions';
import getPageContext from '../src/theming/context';
import GlobalStyles from '../src/theming/GlobalStyles';
import { Provider as ReduxProvider } from 'react-redux';
import withReduxStore from '../src/redux/withReduxStore';

import Loader from '../src/components/layout/Loader';
const TIMEOUT = 500;

class MyApp extends App {
  pageContext = null;

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <GlobalStyles />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}

            <ReduxProvider store={reduxStore}>
              <PageTransition
                timeout={TIMEOUT}
                classNames='page-transition'
                loadingComponent={<Loader />}
                loadingDelay={500}
                loadingTimeout={{
                  enter: TIMEOUT,
                  exit: 0
                }}
                loadingClassNames='loading-indicator'
              >
                <Component pageContext={this.pageContext} {...pageProps} />
              </PageTransition>
            </ReduxProvider>
          </MuiThemeProvider>
        </JssProvider>


        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          .page-transition-enter-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity ${TIMEOUT}ms;
          }
          .loading-indicator-appear,
          .loading-indicator-enter {
            opacity: .90;
          }
          .loading-indicator-appear-active,
          .loading-indicator-enter-active {
            opacity: 1;
            transition: opacity ${TIMEOUT}ms;
          }
        `}</style>

      </Container>
    );
  }
}

export default withReduxStore(MyApp);
