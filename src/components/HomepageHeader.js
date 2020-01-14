import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Row, Col } from './layout/grid';

const useStyles = makeStyles(theme => ({
  root: {},
  btn: {
    color: 'black',
  },
  subheader: {
    color: '#555',
    'font-size': '21px',
    'line-height': '32px',
    'margin-bottom': '10px',
    'margin-top': '5px',
    'text-shadow': 'none',
    'font-weight': 'normal !important',
    'font-family': '"Open Sans", sans-serif',
  },
  breadcrumbsroot: {
    padding: '5px 0 8px',
    'margin-bottom': '10px',
    /*'border-top': 'solid 1px #eee',
    'border-bottom': 'solid 1px #eee',
    */
  },
  breadcrumbslist: {
    color: '#fff',
    'margin-bottom': '3px',
    'padding-left': 0,
    'list-style': 'none',
    'margin-top': 0,
  },
  breadcrumbslistitem: {
    'font-size': '12px',
    display: 'inline-block',
    'padding-right': '16px',
    color: 'rgba(255, 255, 255, 0.6) !important',
    'line-height': '1.6',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.6) !important',
    width: '1.25em',
    'font-size': '12px',
    marginBottom: -2,
  },
  summary: {
    fontWeight: 'bolder',
    fontSize: '16px',
  },

  headerImageRoot: {
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '40px',
  },

  headerImage: {
    width: '100%',
    transition: '0.6s ease',
    height: 0,
    display: 'block',
    padding: '20% 0 0 0',
    position: 'relative',
    overflow: 'hidden',
    //backgroundSize: 'cover',
    backgroundPosition: 'top left',
    filter: 'blur(0px) brightness(100%)',
    //filter: 'brightness(75%)',
    transform: 'scale(1.1)',

    [theme.breakpoints.down('sm')]: {
      padding: '50% 0 0 0',
      filter: 'blur(0) brightness(100%)', // width is narrower so don't blur so much
      backgroundSize: 'cover',
    },
  },
  headerImageContentWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  headerImageContent: {
    position: 'absolute',
    bottom: 0,
    color: '#fff',

    //background: 'linear-gradient(transparent, black)',
    width: '100%',
    padding: '16px',

    [theme.breakpoints.up('lg')]: {
      padding: theme.gutterSpacing,
    },

    '& h1': {
      color: '#fff',
      fontSize: '32px',
      marginTop: '12px',
      'text-shadow': 'none',
      'font-weight': 'normal !important',
      'font-family': '"Open Sans", sans-serif',
      'line-height': '1.1',

      [theme.breakpoints.up('lg')]: {
        'margin-bottom': theme.gutterSpacing,
      },
    },
    '& p': {
      color: 'rgba(255, 255, 255, 0.6) !important',
      fontWeight: 100,

      [theme.breakpoints.up('lg')]: {
        'margin-bottom': theme.gutterSpacing / 2,
        fontSize: '1.25rem',
      },
    },
  },
  headerImageContentInner: {
    [theme.breakpoints.up('lg')]: {
      width: '672px',
    },
  },

  legacyContainer: {
    '& img': {
      width: '100% !important',
    },
  },
}));

export default function ArticleRenderer({}) {
  const classes = useStyles();

  const image_url = 'https://legacy-dot-blaine-garrett.appspot.com/static/drips1.jpg';

  const image = (
    <Row>
      <Col xs={12}>
        <div className={classes.headerImageRoot}>
          <div className={classes.headerImage} style={{ backgroundImage: 'url("' + image_url + '")' }} />

          <div className={classes.headerImageContentWrapper}>
            <div className={classes.headerImageContent}>
              <Grid>
                <Row>
                  <Col xs={12}>
                    {/*
                    <div className={classes.headerImageContentInner}>
                      <h1>party</h1>
                      <p>I will think of something good to put here</p>

                      <div className={classes.breadcrumbsroot}>sfgfdgdd</div>
                    </div>
                    */}
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );

  return (
    <div className="blog">
      {image}

      <Grid>
        <Row>
          <Col xs={12} lg={8}>
            <div className={classes.legacyContainer} />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

ArticleRenderer.propTypes = {
  classes: PropTypes.object,
};
