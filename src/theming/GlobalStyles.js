import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const globalStyles = (theme) => {
  return {
    '@global': {
      'html': {
        'font-size': '14px',
      },
      'body': {
        'font-size': '1rem',
        'line-height': 1.6,
        'font-weight': 400,
        'color': '#555',
        'text-rendering': 'optimizelegibility',
        'font-family': '"Open Sans", Helvetica, Arial, sans-serif',
      },
      'a': {
        color: theme.palette.primary[500],
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        },
      },
      'p': {
        'color': '#555',
        'line-height': '1.6'
      },
      'li, p': {
        'color': '#555',
        'line-height': '1.6'
      },

      // Blog article styles...
      '.img-responsive': {
        width: '100%'
      },
      '.list-unstyled': {
        //'padding-left': 0,
        //'list-style': 'none'
      },

      'ul, ol': {
    'margin-top': 0,
    'margin-bottom': '10px',
}
    }
  };
};

class GlobalStyles extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() { return null; }
}

export default withStyles(globalStyles)(GlobalStyles);
