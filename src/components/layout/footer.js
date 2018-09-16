import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

const styles = (theme) => {
  return {
  root: {
    border: '10px solid red'
  },
  footerContainer: {
    color: '#dadada',
    marginTop: '40px',
    padding: '20px 0 30px',
    background: '#585f69',
  },

  copyrightContainer: {
    padding: '11px 0 7px',
    background: '#3e4753',
    borderTop: 'solid 1px #777',
  },

  copyrightSpace: {
    fontSize: '14px',
    color: '#dadada',
    lineHeight: 1.6,
    marginTop: 16,
    marginBottom:16,
    display:'block'
  },
  copyrightLink: {
    margin: '0 5px',
  },

  container: {
    maxWidth: '1170px',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px',
    width: '1170px'
    }
  }
};

class Footer extends React.Component {
  render() {
    let {classes} = this.props;

    return (
      <div className={classes.root}>
      <div className={classes.footerContainer}>
        <div className={classes.container}>

          <Grid container>
            <div className="col-md-4 md-margin-bottom-40">
              <div className="posts">
                <div className="headline"><h2>About</h2></div>
                  <dl className="dl-horizontal">
                      <dt><a href="#"><img src="http://blainegarrett.com/static/themes/corporatus/img/footer-about-photo.jpg" alt="" /></a></dt>
                      <dd>
                          <p><a href="/about/">Being a jack-of-all trades, my pursuits vary from fine arts to software engineering. Find me designing next-generation web sites and applications, drawing comics or feverishly painting away. Every day is an opportunity for creative  experimentation and discovering new things in the Twin Cities that I call home.</a></p>
                      </dd>
                  </dl>
              </div>
          </div>

          <div className="col-md-4 md-margin-bottom-40">
            <div className="posts">
              <div className="headline">
                <h2>Recent Blog Entries</h2></div><dl className="dl-horizontal">            <dt><a href="/2017/06/26/how-to-get-appengine-godaddy-android-to-actually-work/"><img src="http://commondatastorage.googleapis.com/blaine-garrett/juniper/gae_logo.png" alt="How to Get Appengine + GoDaddy + Android SSL Certs to Actually Work" /></a></dt>            <dd>                <p><a href="/2017/06/26/how-to-get-appengine-godaddy-android-to-actually-work/" title="How to Get Appengine + GoDaddy + Android SSL Certs to Actually Work">How to Get Appengine + GoDaddy + Android SSL Certs to Actually Work</a></p>             </dd>        </dl><dl className="dl-horizontal">            <dt><a href="/2016/01/05/antistar-halftone-artwork/"><img src="http://commondatastorage.googleapis.com/blaine-garrett/juniper/antistar_spaceskull_100dpi.jpg" alt="Hand Drawn Halftone Pattern" /></a></dt>            <dd>                <p><a href="/2016/01/05/antistar-halftone-artwork/" title="Hand Drawn Halftone Pattern">Hand Drawn Halftone Pattern</a></p>             </dd>        </dl></div>
          </div>

          <div className="col-md-4">
            <div className="headline"><h2>Lets Keep In Touch</h2></div>
                <ul className="social-icons">
                  <li><a href="https://www.facebook.com/blainegarrett" data-original-title="Facebook" className="social_facebook"></a></li>
                  <li><a href="https://twitter.com/blainegarrett" data-original-title="Twitter" className="social_twitter"></a></li>
                  <li><a href="http://www.linkedin.com/in/blainegarrett" data-original-title="Linkedin" className="social_linkedin"></a></li>
                  <li><a href="https://github.com/blainegarrett" data-original-title="Github" className="social_github"></a></li>
                </ul>
            </div>
          </Grid>
        </div>
      </div>



<div className={classes.copyrightContainer}>
  <div className={classes.container}>
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="caption">
          <span className={classes.copyrightSpace}>
            &copy; Blaine Garrett unless otherwise noted
            <a className={classes.copyrightLink} href="/contact/">Contact</a>
          </span>
        </Typography>
      </Grid>
      <Grid item xs={6}>
      </Grid>
    </Grid>
  </div>
</div>


      </div>
    );
  }
}


export default withStyles(styles)(Footer);