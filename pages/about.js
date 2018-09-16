import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Page from '../src/components/Page';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Row, Col} from '../src/components/layout/grid';
import SideBar from '../src/components/layout/SideBar';

const styles = {};

class AboutPage extends React.Component {
  render () {

    let meta = {
      title: 'About Me',
      description: 'Learn About Me',
    };

    return (
      <Page title="About Me" activePage="about" meta={meta}>
        <Row>
          <Col xs={12} lg={9}>

            <Row>
              <Col xs={12} md={6}>
                <p>
                  I'm a Minneapolis based artist, software engineer, and tinkerer. By day, I am a staff engineer and by night I am an artist for the <a href="http://www.dimmedia.com">Dim Media Artist Collaborative</a> and co-owner of <a href="https://www.mplsart.com">MPLSART.COM</a>.
                </p>
                <p>
                  I'm married to a wonderful human being named Katie (<a href="http://www.usuallypolite.com">@UsuallyPolite</a>) who happens to be brilliant. We make art together.
                </p>

                <b>I'll think of other things to put here later.</b>
              </Col>
              <Col xs={12} md={6}>
                <img style={{width: '100%'}} className="img-responsive" src="https://storage.googleapis.com/blaine-garrett/theme/v2/about_wedding.jpg" alt="#party" />
              </Col>
            </Row>
          </Col>

          <Col xs={3}><SideBar /></Col>
        </Row>
      </Page>
    );
  }
}
AboutPage.propTypes = {};

export default withStyles(styles)(AboutPage);
