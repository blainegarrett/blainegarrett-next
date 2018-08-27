import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Head from 'next/head';
import Page from '../components/Page';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../theming/withRoot';
import {Grid, Row, Col} from '../components/layout/grid';
import SideBar from '../components/layout/SideBar';


const styles = {
  root: { color: 'red'}
};

class AboutPage extends React.Component {
  render () {
    const { artworks } = this.props;

    return (
      <Page title="About" activePage="about">
        <Grid>
          <Row>
            <Col xs={9}>
              <Row>
                <Col xs={6}>
            <p>
        I'm a Minneapolis based artist, software engineer, and tinkerer. By day, I am a staff engineer for <a href="http://www.workiva.com">Workiva</a> and by night I am an artist for the <a href="http://www.dimmedia.com">Dim Media Artist Collaborative</a> and co-owner of <a href="https://www.mplsart.com">MPLSART.COM</a>.
      </p>
      <p>
        I'm married to a wonderful human being named Katie (<a href="http://www.usuallypolite.com">@UsuallyPolite</a>) who happens to be brilliant. We make art together.
      </p>

        <b>Some Former Accomplishments</b>
          <ul className="list-unstyled">
                <li><i className="icon-ok color-green"></i> Founder &amp; Director of Art Attack (later Adamantine Arts)</li>
                <li><i className="icon-ok color-green"></i> Webmaster of NW Wisconsin's Local Music Online community</li>
                <li><i className="icon-ok color-green"></i> Creator of the Surplus Bio-Freaks Comic</li>
                <li><i className="icon-ok color-green"></i> Dissonance In the Void Drummer</li>
                <li><i className="icon-ok color-green"></i> Board Member of Articulture</li>
                <li><i className="icon-ok color-green"></i> Podcaster</li>
            </ul>


                </Col>
                <Col xs={6}>

                  <img style={{width: '100%'}} className="img-responsive" src="https://storage.googleapis.com/blaine-garrett/theme/v2/about_wedding.jpg" alt="" />

                </Col>
              </Row>
            </Col>
            <Col xs={3}><SideBar /></Col>
          </Row>
        </Grid>
      </Page>
    );
  }
}
export default withRoot(withStyles(styles)(AboutPage));

AboutPage.propTypes = {
  artworks: PropTypes.array
};
