// Defines theme to use with jss and material-ui components
import { createMuiTheme } from '@material-ui/core/styles';
import { green, pink, red } from './colors';

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

export default muiTheme;