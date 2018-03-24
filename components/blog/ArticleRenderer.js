import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Head from 'next/head';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

const styles = (theme) => ({
  root: {
    color: 'black',
    '&img': {
      border:'10px solid red'
    }
  },
  btn: {
    color: 'black'
  },
  subheader: {
    color: '#555',
    'font-size': '21px',
    'line-height': '32px',
    'margin-bottom': '10px',
    'margin-top': '5px',
    'text-shadow': 'none',
    'font-weight': 'normal !important',
    'font-family': '"Open Sans", sans-serif'
  },
  breadcrumbsroot: {
    'padding': '5px 0 8px',
    'margin-bottom': '10px',
    'border-top': 'solid 1px #eee',
    'border-bottom': 'solid 1px #eee',
  },
  breadcrumbslist: {
    'color': '#eee',
    'margin-bottom': '3px',
    'padding-left': 0,
    'list-style': 'none',
    'margin-top': 0,
  },
  breadcrumbslistitem: {
    'font-size': '12px',
    display: 'inline-block',
    'padding-left': '5px',
    'padding-right': '5px',
    'color': '#555',
    'line-height': '1.6',
  },
  icon: {
    color: '#777',
    width: '1.25em',
    'font-size': '12px'
  }
});

const ArticleRenderer = ({classes, article}) => {
  return (
    <div className="blog">

      <div className={classes.breadcrumbsroot}>
        <ul className={classes.breadcrumbslist}>
          <li className={classes.breadcrumbslistitem}><Icon className={classes.icon}>event</Icon> January 05, 2016</li>
          <li className={classes.breadcrumbslistitem}><Icon className={classes.icon}>person</Icon> Blaine Garrett</li>
          <li className={classes.breadcrumbslistitem}><Icon className={classes.icon}>local_offer</Icon> Posted in <a href="/dim-media/">DIM Media</a>, <a href="/art/">Art</a></li>
      </ul>
    </div>

    <div dangerouslySetInnerHTML={{__html: article.summary}} />
    <div dangerouslySetInnerHTML={{__html: article.content}} />




    </div>
  );
};

ArticleRenderer.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object
};

export default withStyles(styles)(ArticleRenderer);