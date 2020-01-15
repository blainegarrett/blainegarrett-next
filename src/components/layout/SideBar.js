import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  section: {
    'margin-bottom': '30px',
  },
  headline: {
    'margin-bottom': '15px',
    display: 'block',
    margin: '10px 0 25px 0',
    'border-bottom': '1px dotted #e4e9f0',
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    '& h2': {
      'border-bottom': '2px solid #72c02c',
      'font-size': '21px',
      color: '#585f69',
      margin: '0 0 -2px 0',
      'padding-bottom': '5px',
      display: 'inline-block',
      'font-weight': 'normal !important',
      'line-height': '1.1',
    },
  },
  socialIcons: {
    margin: '0',
    padding: '0',
    '& li': {
      'margin-right': '8px',
      'margin-bottom': '8px',
      float: 'left',
      display: 'inline',
      'list-style': 'none',
      'text-indent': '-9999px',
      color: '#555',
      'line-height': '1.6',
      '& a': {
        opacity: '0.7',
        'background-position': '0 -38px !important',
        width: '28px',
        height: '28px',
        display: 'block',
        'background-repeat': 'no-repeat',
        transition: 'all 0.3s ease-in-out',
        '-o-transition': 'all 0.3s ease-in-out',
        '-ms-transition': 'all 0.3s ease-in-out',
        '-moz-transition': 'all 0.3s ease-in-out',
        '-webkit-transition': 'all 0.3s ease-in-out',
        '&:hover': { opacity: 1 },
        '&.social_facebook': {
          background: 'url("https://storage.googleapis.com/blaine-garrett/theme/v2/social/facebook.png") no-repeat',
        },
        '&.social_twitter': {
          background: 'url("https://storage.googleapis.com/blaine-garrett/theme/v2/social/twitter.png") no-repeat',
        },
        '&.social_linkedin': {
          background: 'url("https://storage.googleapis.com/blaine-garrett/theme/v2/social/linkedin.png") no-repeat',
        },
        '&.social_github': {
          background: 'url("https://storage.googleapis.com/blaine-garrett/theme/v2/social/github.png") no-repeat',
        },
        '&.social_instagram': {
          background: 'url("https://storage.googleapis.com/blaine-garrett/theme/v2/social/instagram.png") no-repeat',
        },
        '&.social_googleplus': {
          background: 'url("https://storage.googleapis.com/blaine-garrett/theme/v2/social/googleplus.png") no-repeat',
        },
        '&.social_youtube': {
          background: 'url("https://storage.googleapis.com/blaine-garrett/theme/v2/social/youtube.png") no-repeat',
        },
        '&.social_pintrest': {
          background: 'url("https://storage.googleapis.com/blaine-garrett/theme/v2/social/pintrest.png") no-repeat',
        },
      },
    },
  },
});

const SideBar = ({ classes }) => {
  return (
    <div className="sidebar">
      <div className={classes.section}>
        {/*
        <div className={classes.headline}><h2>Elsewhere</h2></div>

        <ul className={classes.socialIcons}>
          <li><a target="_new" className="social_facebook" data-original-title="Facebook" href="https://www.facebook.com/blainegarrett"></a></li>
          <li><a target="_new" className="social_twitter" data-original-title="Twitter" href="https://twitter.com/blainegarrett"></a></li>
          <li><a target="_new" className="social_googleplus" data-original-title="Goole Plus" href="https://plus.google.com/u/0/109438460339487239529"></a></li>
          <li><a target="_new" className="social_linkedin" data-original-title="Linkedin" href="http://www.linkedin.com/in/blainegarrett"></a></li>
          <li><a target="_new" className="social_youtube" data-original-title="You Tube" href="https://youtube.com/blainegarrett"></a></li>
          <li><a target="_new" className="social_pintrest" data-original-title="Pintrest" href="https://www.pinterest.com/blainegarrett/"></a></li>
          <li><a target="_new" className="social_github" data-original-title="Github" href="https://github.com/blainegarrett"></a></li>
        </ul>
        <div className="clearfix"></div>
        */}
      </div>
    </div>
  );
};

SideBar.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SideBar);
