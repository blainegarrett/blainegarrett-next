import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Row, Col} from '../../components/layout/grid';

const styles = {
  root: {
    padding: '10px 0 6px',
    boxShadow: 'inset 0 0 4px #eee',
    background: 'url(https://storage.googleapis.com/cdn.mplsart.com/blainestuff/breadcrumbs.png) repeat',
    marginBottom: '40px'
  },
  title: {
    color: '#686868',
    fontSize: '26px',
    marginTop: '12px',
    'text-shadow': 'none',
    'font-weight': 'normal !important',
    'font-family': '"Open Sans", sans-serif',
    'margin-bottom': '10px',
    'line-height': '1.1'
  }
};

function Breadcrumbs(props) {
  const { classes, children } = props;
  return (
    <div className={classes.root}>
      <Grid>
        <Row>
          <Col xs={12}><h2 className={classes.title}>{children}</h2></Col>
        </Row>
      </Grid>
    </div>
  );
}

Breadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default withStyles(styles)(Breadcrumbs);