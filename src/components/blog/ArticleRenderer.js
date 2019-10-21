import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import { Grid, Row, Col } from './../layout/grid';

const useStyles = makeStyles(theme => ({
  root: {},
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
    padding: '5px 0 8px',
    'margin-bottom': '10px'
    /*'border-top': 'solid 1px #eee',
    'border-bottom': 'solid 1px #eee',
    */
  },
  breadcrumbslist: {
    color: '#fff',
    'margin-bottom': '3px',
    'padding-left': 0,
    'list-style': 'none',
    'margin-top': 0
  },
  breadcrumbslistitem: {
    'font-size': '12px',
    display: 'inline-block',
    'padding-right': '16px',
    color: 'rgba(255, 255, 255, 0.6) !important',
    'line-height': '1.6'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.6) !important',
    width: '1.25em',
    'font-size': '12px',
    marginBottom: -2
  },
  summary: {
    fontWeight: 'bolder',
    fontSize: '16px'
  },

  headerImageRoot: {
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '40px'
  },

  headerImage: {
    width: '100%',
    transition: '0.6s ease',
    height: 0,
    display: 'block',
    padding: '30% 0 0 0',
    position: 'relative',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(.5rem) brightness(75%)',
    transform: 'scale(1.10)',

    [theme.breakpoints.down('sm')]: {
      padding: '100% 0 0 0',
      filter: 'blur(.25rem) brightness(75%)' // width is narrower so don't blur so much
    }
  },
  headerImageContentWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  headerImageContent: {
    position: 'absolute',
    bottom: 0,
    color: '#fff',

    background: 'linear-gradient(transparent, black)',
    width: '100%',
    padding: '16px',

    [theme.breakpoints.up('lg')]: {
      padding: theme.gutterSpacing
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
        'margin-bottom': theme.gutterSpacing
      }
    },
    '& p': {
      color: 'rgba(255, 255, 255, 0.6) !important',
      fontWeight: 100,

      [theme.breakpoints.up('lg')]: {
        'margin-bottom': theme.gutterSpacing / 2,
        fontSize: '1.25rem'
      }
    }
  },
  headerImageContentInner: {
    [theme.breakpoints.up('lg')]: {
      width: '672px'
    }
  },

  legacyContainer: {
    padding: '0 16px',
    '& img': {
      width: '100% !important'
    }
  }
}));

export default function ArticleRenderer({ article }) {
  const classes = useStyles();
  let image_url =
    'https://storage.googleapis.com/blaine-garrett/theme/v2/about_wedding.jpg';
  if (article.legacy_image_resource) {
    image_url =
      'https://commondatastorage.googleapis.com/blaine-garrett/' +
      article.legacy_image_resource.gcs_filename;
  }

  let content = article.content;
  let youtubeTemplate =
    '<div class="videoWrapper"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/$2" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>';

  content = content.replace(/<pre>/gi, '<pre class="language-javascript">');
  content = content.replace(
    /(\[youtube:https?:\/\/www\.youtube\.com\/watch\?v=)(.+)(])/i,
    youtubeTemplate
  );

  //https://www.youtube.com/watch?v=fuXVbRMJODw
  //https://www.youtube.com/embed/fuXVbRMJODw

  let image = (
    <Row>
      <Col xs={12}>
        <div className={classes.headerImageRoot}>
          <div
            className={classes.headerImage}
            style={{ backgroundImage: 'url("' + image_url + '")' }}
          />

          <div className={classes.headerImageContentWrapper}>
            <div className={classes.headerImageContent}>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <div className={classes.headerImageContentInner}>
                      <h1>{article.title}</h1>
                      <p>
                        {article.summary ||
                          'I will think of something good to put here'}
                      </p>

                      <div className={classes.breadcrumbsroot}>
                        <ul className={classes.breadcrumbslist}>
                          <li className={classes.breadcrumbslistitem}>
                            <Icon className={classes.icon}>event</Icon>{' '}
                            {moment(article.published_date).format(
                              'MMMM Do, YYYY'
                            )}
                          </li>
                          <li className={classes.breadcrumbslistitem}>
                            <Icon className={classes.icon}>person</Icon> Blaine
                            Garrett
                          </li>
                          {/* <li className={classes.breadcrumbslistitem}><Icon className={classes.icon}>local_offer</Icon> Posted in <a href="/dim-media/">DIM Media</a>, <a href="/art/">Art</a></li> */}
                        </ul>
                      </div>
                    </div>
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
      {/*image*/}

      <div className={classes.legacyContainer}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

ArticleRenderer.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object
};
