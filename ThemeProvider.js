import React from 'react';
import { JssProvider } from 'react-jss';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, pink, red } from './colors';
import { getContext } from './context';
//See: https://material-ui-next.com/customization/themes/#configuration-variables for additional features

export default function ThemeProvider({children}) {
  const muiTheme = createMuiTheme({
    typography: {
      //fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      button: {
        fontWeight: 400,
        textTransform: 'none',
        //fontSize: '1.25rem',
      },
    },
    palette: {
      contrastThreshold: 3,
      tonalOffset: 0.2,
      primary: green,
      accent: pink,
      error: {
        main: red[500],
      },
    },
    appBarHeight: {'default': 60, 'sm': 50}, // TODO: Do we need/want different heights?
  });

  //https://github.com/mui-org/material-ui/issues/7627
  //console.log(process.browser);

  if (process.browser) {
    return (
      <MuiThemeProvider theme={muiTheme}>{ children }</MuiThemeProvider>
    );
  } else {
    // Server Rendering in Next.js
    const context = getContext();
    //console.log('DA CONTEXt');
    //console.log(getContext);

    return (
        <MuiThemeProvider theme={muiTheme} sheetsManager={context.sheetsManager} >
          { children }
        </MuiThemeProvider>
    );
  }
}

ThemeProvider.propTypes = {
    children: PropTypes.node
}