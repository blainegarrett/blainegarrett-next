import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {Grid, Row, Col} from '../../components/layout/grid';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#000', // TODO: Make theme variable?
  },

  flex: {
    flex: 1,
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuLink: {
    color: '#687074',
    lineHeight: 1.6,
    fontSize: '15px',
    fontWeight: '400',
    padding: '9px 20px',
    textTransform: 'uppercase',
    borderBottom: 'solid 2px transparent',
    '&:hover': {
      borderBottom: 'solid 2px #72c02c',
      color: '#72c02c',
    }
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
          <Grid>
            <Toolbar>
              <Row>
                <Col xs={5}>
                  <div className={classes.flex}>
                    <img src="http://www.blainegarrett.com/static/themes/v2/assets/logo.png" />
                  </div>
                </Col>
                <Col xs={7} style={{marginTop:'12px'}}>
                  <Button component='a' className={classes.menuLink} color="inherit">Home</Button>
                  <Button component='a' className={classes.menuLink} color="inherit">About</Button>
                  <Button component='a' className={classes.menuLink} color="inherit">Blog</Button>
                  <Button component='a' className={classes.menuLink} color="inherit">Art</Button>
                  <Button component='a' className={classes.menuLink} color="inherit">Programming</Button>
                  <Button component='a' className={classes.menuLink} color="inherit">Links</Button>
                </Col>
              </Row>
            </Toolbar>
          </Grid>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);