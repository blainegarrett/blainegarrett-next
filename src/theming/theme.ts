// Defines theme to use with jss and material-ui components
import { createMuiTheme } from '@material-ui/core/styles';
import { green, pink, red } from './colors';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appBarHeight: { default: number; sm: number };
    gutterSpacing: number;
  }

  interface ThemeOptions {
    appBarHeight: { default: number; sm: number };
    gutterSpacing: number;
  }
}

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
    secondary: pink,
    error: {
      main: red[500],
    },
  },
  appBarHeight: { default: 60, sm: 50 }, // TODO: Do we need/want different heights?
  gutterSpacing: 4,

  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: '14px',
        },
        body: {
          fontSize: '1rem',
          lineHeight: 1.6,
          fontWeight: 400,
          color: '#555',
          textRendering: 'optimizelegibility',
          fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
        },
        a: {
          color: green[500],
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        p: {
          color: '#555',
          lineHeight: '1.6',
        },
        'li, p': {
          color: '#555',
          lineHeight: '1.6',
        },

        // Blog article styles...
        '.img-responsive': {
          width: '100%',
        },
        '.list-unstyled': {
          //'padding-left': 0,
          //'list-style': 'none'
        },

        // Video Wrapper
        '.videoWrapper': {
          position: 'relative',
          paddingBottom: '56.25%' /* 16:9 */,
          paddingTop: '25px',
          height: 0,
          margin: '0 -16px',
        },
        '.videoWrapper iframe': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },

        'ul, ol': {
          marginTop: 0,
          marginBottom: '10px',
        },
      }, // end globals
    },
  },
});

export default muiTheme;
