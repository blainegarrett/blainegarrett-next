import React from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from '../ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  return {
    '@global': {
      'a': {
        color: theme.palette.primary['500'],
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    }
  };
};

class _GlobalStyle extends React.Component {
    componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      console.log("DELETE>>>");
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    return (<div>{this.props.children}</div>);
  }
}

const GlobalStyle = withStyles(styles)(_GlobalStyle);

export default class Root extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <CssBaseline>
          <GlobalStyle>
          {this.props.children}
          </GlobalStyle>
        </CssBaseline>
      </ThemeProvider>
    )
  }
}
