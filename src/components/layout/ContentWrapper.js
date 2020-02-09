// Content Wrapper
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Hidden from '@material-ui/core/Hidden';
import { Grid, Row, Col } from './grid';

const useStyles = makeStyles(theme => {
  return {
    outerWrap: {
      width: '100%',
      flex: '1 1 auto',
      display: 'flex',
      position: 'absolute',
      flexDirection: 'row',
      backgroundColor: '#fafafa',
      minHeight: 'calc(100% - 64px)',
    },

    // Header image bounding box
    headerImageWrap: {
      height: '25vh', //250,
      width: '100%',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,

      [theme.breakpoints.down('sm')]: {
        height: '30vh',
      },

      '&.large': {
        height: '60vh', //750,
        [theme.breakpoints.only('xs')]: {
          height: '100vh',
        },
      },
    },

    // Header Background
    headerBackground: {
      top: 0,
      left: 0,
      right: 0,
      height: '100%',
      width: '100%',
      position: 'relative',
      background: 'linear-gradient(to top, #2D323E 0%, #3C4252 100%)',
      pointerEvents: 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'block',
      backgroundAttachment: 'fixed',

      // Blur Variant
      //'&.blur': {
      //filter: 'blur(.5rem) brightness(75%)',
      //overflow: 'hidden',
      //transform: 'scale(1.1)',
      //},
    },

    // Header image dark gradiant overlay
    headerOverlay: {
      bottom: 0,
      left: 0,
      right: 0,
      height: '100%',
      position: 'absolute',
      background: 'linear-gradient(to top, rgb(0,0,0,.75) 0%, transparent 75%)',
      zIndex: 299,

      '&.blur': {
        backdropFilter: 'blur(.5rem)',
      },
    },

    experimentContent: {
      width: '100%',
      margin: '0 auto',
      maxWidth: '1120px',
      //maxWidth: '1280px',
      display: 'flex',
      zIndex: 300,
    },

    experimentContentThing: {
      flex: '1 1 100%',
      display: 'flex',
      'min-height': '0',
      'border-radius': '8px 8px 0 0',
      'flex-direction': 'column',
      'background-color': '#fff',
      minHeight: '100vh',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      [theme.breakpoints.down('sm')]: {
        'border-radius': 0,
      },
    },
    headerTextContent: {
      verticalAlign: 'bottom',
      minHeight: 'calc(25vh - 64px)', //185,
      [theme.breakpoints.down('sm')]: {
        minHeight: 'calc(30vh - 64px)',
        margin: 16,
      },
      position: 'relative',
      '&.large': {
        minHeight: 'calc(60vh - 64px)', //685
        [theme.breakpoints.only('xs')]: {
          minHeight: 'calc(70vh - 64px)',
        },
      },
    },
    headerTextContentInner: {
      position: 'absolute',
      bottom: 0,
      [theme.breakpoints.up('lg')]: {
        width: 672,
      },
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.6)',
      fontWeight: 100,
    },
    subheadingWrapper: {
      height: '64px',
      display: 'flex',
      'min-height': '64px',
      'align-items': 'center',
      'border-bottom': '1px solid rgba(0, 0, 0, 0.12)',
      padding: 16,
    },

    title: {
      color: '#ffffff',
      'font-size': 32,
      margin: '12px 0',
      'font-family': '"Open Sans", sans-serif',
      'font-weight': 'normal !important',
      'line-height': '1.1',
      'text-shadow': 'none',
    },
    summary: {
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: 1.6,
      display: 'block',
      marginBlockStart: '1em',
      marginBlockEnd: '1em',
      marginInlineStart: '0px',
      marginInlineEnd: '0px',
    },
    sideBarContainer: {
      position: 'relative',
      top: 'calc(25vh)',
      color: '#fff',
      [theme.breakpoints.down('sm')]: {
        top: 0,
      },
      '&.large': {
        top: 710,
        [theme.breakpoints.only('md')]: {
          top: 350,
        },
        [theme.breakpoints.down('sm')]: {
          top: 0,
        },
      },
    },
  };
});

export default function ContentWrapper({
  title,
  image,
  headerBlur,
  headerLarge,
  sideBarContent,
  subheadingContent,
  titleContent,
  children,
}) {
  const classes = useStyles();
  let extraStyles = {};

  // Image Node
  if (image) {
    extraStyles = { backgroundImage: `url(${image})` };
  }

  // Title Node
  let titleContentNode;
  if (titleContent) {
    titleContentNode = <div className={classes.summary}>{titleContent}</div>;
  }

  // Side Bar
  const sideBarWrapper = (
    <Col xs={12} md={2}>
      <div
        className={classnames({
          [classes.sideBarContainer]: true,
          large: headerLarge,
        })}
      >
        {sideBarContent}
      </div>
    </Col>
  );

  return (
    <div className={classes.outerWrap}>
      <div
        className={classnames({
          [classes.headerImageWrap]: true,
          large: headerLarge,
        })}
      >
        <div className={classes.headerBackground} style={extraStyles} />
        <div
          className={classnames({
            [classes.headerOverlay]: true,
            blur: headerBlur,
          })}
        />
      </div>

      <Grid className={classes.experimentContent} fluid={true}>
        <Row>
          {/* TODO: This is causing a repaint...*/}
          <Hidden smDown>{sideBarWrapper}</Hidden>
          <Col xs={12} md={10}>
            <div
              className={classnames({
                [classes.headerTextContent]: true,
                large: headerLarge,
              })}
            >
              <div className={classes.headerTextContentInner}>
                {title && <h1 className={classes.title}>{title}</h1>}
                {titleContentNode}
              </div>
            </div>
            <div className={classes.experimentContentThing}>
              <div className={classes.subheadingWrapper}>
                {subheadingContent || 'I will find something good to put here...'}{' '}
              </div>
              <Col>{children}</Col>
            </div>
          </Col>
          <Hidden mdUp>{sideBarWrapper}</Hidden>
        </Row>
      </Grid>
    </div>
  );
}

ContentWrapper.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  headerBlur: PropTypes.bool,
  headerLarge: PropTypes.bool,
  sideBarContent: PropTypes.node,
  subheadingContent: PropTypes.node,
  titleContent: PropTypes.string,
  children: PropTypes.node,
};
