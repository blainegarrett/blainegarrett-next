import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from '../../components/layout/grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 0 6px',
    boxShadow: 'inset 0 0 4px #eee',
    background:
      'url(https://storage.googleapis.com/cdn.mplsart.com/blainestuff/breadcrumbs.png) repeat',
    marginBottom: '40px',
    [theme.breakpoints.down('md')]: {
      marginBottom: 0
    }
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
}));

export default function Breadcrumbs(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid>
        <Row>
          <Col xs={12}>
            <h2 className={classes.title}>{children}</h2>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

Breadcrumbs.propTypes = {
  children: PropTypes.node
};
