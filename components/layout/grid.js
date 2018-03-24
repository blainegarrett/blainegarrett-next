import React from 'react';
import PropTypes from 'prop-types';
import MuiGrid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const styles = (theme) => {
  // console.log(theme.spacing.unit);
  // theme.spacing.unit * 2

  return {
    fluidContainer: {
      width:'100%',
      flexGrow: 1,
    },
    legacyContainer: {
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '100%', // xs,sm
      flexGrow: 1,
      paddingRight: '8px',
      paddingLeft: '8px',
      padding: '8px',

      [theme.breakpoints.only('xs')]: {
        width: theme.breakpoints.width('xs')
        //width: '100%'
      },
      [theme.breakpoints.only('sm')]: {
        //width: theme.breakpoints.width('sm')
        width: '100%'
      },
      [theme.breakpoints.only('md')]: {
        width: theme.breakpoints.width('md')
      },
      [theme.breakpoints.only('lg')]: {
        width: '1170px'
      },
      [theme.breakpoints.only('xl')]: { // force width of lg
        width: '1170px' //theme.breakpoints.width('lg')
      },
    },

    typeContainer: {
      /* width:'100%', */
      //border: '1px solid green'
    },
    typeItem : {
      //border: '1px solid red',
      //paddingRight: theme.spacing.unit * 2,
      //paddingLeft: theme.spacing.unit * 2,

      [theme.breakpoints.up('md')]: {
        //paddingRight: theme.spacing.unit * 5,
        //paddingLeft: theme.spacing.unit * 5,
      },
    }
  }
}

function _Grid({classes, theme, className, children, fluid, ...rest}) {
  let containerClass = classes.legacyContainer
  if (fluid) {
    containerClass = classes.fluidContainer;
  }

  return (<div className={classNames(containerClass, className)} {...rest}>{ children }</div>)
}
// prop definitions
_Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.object,
  fluid: PropTypes.bool,
};


function _Row({classes, theme, className, children, ...rest}) {
  return (<MuiGrid spacing={Number(theme.spacing.unit * 2)} container={true} className={classNames(classes.typeContainer, className)} {...rest}>{ children }</MuiGrid>);
}
// prop definitions
_Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.object
};


function _Col(props) {
  let {classes, className, children, theme, ...rest} = props;
  return (<MuiGrid item={true} {...rest} className={classNames(classes.typeItem, className)}>{ children }</MuiGrid>);
}
// prop definitions
_Col.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.object
};

const Row = withStyles(styles, { withTheme: true })(_Row);
const Col = withStyles(styles, { withTheme: true })(_Col);
const Grid = withStyles(styles, { withTheme: true })(_Grid);

export {Grid, Row, Col};