// Content Wrapper
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Row, Col } from './grid';
import classnames from 'clsx';

const useStyles = makeStyles(theme => {
  return {
    outerWrap: {
      width: '100%',
      flex: '1 1 auto',
      height: '100%',
      display: 'flex',
      position: 'relative',
      minHeight: '100%',
      flexDirection: 'row',
      backgroundColor: '#fafafa'
    },

    // Header image bounding box
    headerImageWrap: {
      height: 250,
      width: '100%',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      //transition: 'height 0.6s ease', //This doesn't currently work due to new Component tree

      '&.large': {
        height: 750
      }
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
      //background: 'linear-gradient(to top, #072500 0%, #1c8200 100%)',
      pointerEvents: 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'block',
      //transition: '0.6s ease', // This doesn't currently work due to new Component tree

      // Blur Variant
      '&.blur': {
        filter: 'blur(.5rem) brightness(75%)',
        overflow: 'hidden',
        transform: 'scale(1.1)'
      }
    },

    // Header image dark gradiant overlay
    headerOverlay: {
      bottom: 0,
      left: 0,
      right: 0,
      height: '100%',
      position: 'absolute',
      background: 'linear-gradient(to top, rgb(0,0,0,.75) 0%, transparent 75%)',
      zIndex: 299
    },

    experimentContent: {
      width: '100%',
      margin: '0 auto',
      maxWidth: '1120px',
      //maxWidth: '1280px',
      display: 'flex',
      zIndex: 300
    },

    experimentContentThing: {
      flex: '1 1 100%',
      display: 'flex',
      //'box-shadow':
      //  '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
      'min-height': '0',
      'border-radius': '8px 8px 0 0',
      'flex-direction': 'column',
      'background-color': '#fff',
      minHeight: '100vh',
      border: '1px solid rgba(0, 0, 0, 0.12)'
    },
    gooberPadding: {
      verticalAlign: 'bottom',
      minHeight: 185,
      position: 'relative',
      '&.large': {
        height: 685
      }
    },
    gooberPaddingInner: {
      position: 'absolute',
      bottom: 0,
      marginBottom: 16,
      width: 672,
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.6)',
      fontWeight: 100
    },
    derp: {
      height: '64px',
      display: 'flex',
      'min-height': '64px',
      'align-items': 'center',
      'border-bottom': '1px solid rgba(0, 0, 0, 0.12)',
      padding: 16
    },

    title: {
      //fontFamily: 'Muli,Roboto,Helvetica Neue,Arial,sans-serif',
      //

      color: '#ffffff',
      'font-size': 32,
      margin: '12px 0',
      'font-family': '"Open Sans", sans-serif',
      'font-weight': 'normal !important',
      'line-height': '1.1',
      'text-shadow': 'none'
    },
    sideBarContainer: {
      position: 'relative',
      top: 185,
      //border: '1px solid red',
      color: '#fff',
      '&.large': {
        top: 710
      }
    }
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
  children
}) {
  let classes = useStyles();

  let extraStyles = {};
  if (image) {
    extraStyles = { backgroundImage: `url(${image})` };
  }

  return (
    <div className={classes.outerWrap}>
      <div
        className={classnames({
          [classes.headerImageWrap]: true,
          large: headerLarge
        })}
      >
        <div
          className={classnames({
            [classes.headerBackground]: true,
            blur: headerBlur
          })}
          style={extraStyles}
        />
        <div className={classes.headerOverlay} />
      </div>

      <Grid className={classes.experimentContent} fluid={true}>
        <Row>
          <Col xs={12} md={2}>
            <div
              className={classnames({
                [classes.sideBarContainer]: true,
                large: headerLarge
              })}
            >
              {sideBarContent}
            </div>
          </Col>
          <Col xs={12} md={10}>
            <div
              className={classnames({
                [classes.gooberPadding]: true,
                large: headerLarge
              })}
            >
              <div className={classes.gooberPaddingInner}>
                {title && <h1 className={classes.title}>{title}</h1>}
                {titleContent}
              </div>
            </div>
            <div className={classes.experimentContentThing}>
              <div className={classes.derp}>
                {subheadingContent || 'I\'ll find something good to put here...'}{' '}
              </div>

              <Col>{children}</Col>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
