import React from 'react';
import Page from '../src/components/Page';
import { Row, Col } from '../src/components/layout/grid';
import SideBar from '../src/components/layout/SideBar';

export default class AboutPage extends React.Component {
  render() {
    let meta = {
      title: 'About Me',
      description: 'Learn About Me'
    };

    return (
      <Page title="About Me" activePage="about" meta={meta}>
        <Row>
          <Col xs={12} lg={9}>
            <Row>
              <Col xs={12} md={6}>
                <p>
                  Hi, I'm Blaine: a Minneapolis based artist, software engineer,
                  and tinkerer.
                </p>

                <p>
                  I'm married to a wonderful human being named Katie (
                  <a href="http://www.usuallypolite.com">@UsuallyPolite</a>) who
                  happens to be brilliant. We make art together.
                  <br />
                  <br />
                  Things I'm involved with
                </p>
                <ul>
                  <li>
                    <a href="http://pollywog.xyz">Project Pollywog</a> -- A cool
                    startup I'm honored to be a part of
                  </li>
                  <li>
                    <a href="https://www.mplsart.com">MPLSART.COM</a> -- Twin
                    Cities visual arts calendar I co-run with my wife Katie.
                  </li>
                  <li>
                    <a href="http://www.dimmedia.com">Dim Media</a> - Twin
                    Cities Artist Collaborative
                  </li>
                  <li>
                    <a href="https://www.localm.org">Local Music Online</a> --
                    Archive of the NW Wisconsin Music Scene 1998-2003 (returning
                    soon)
                  </li>
                </ul>
              </Col>
              <Col xs={12} md={6}>
                <img
                  style={{ width: '100%' }}
                  className="img-responsive"
                  src="https://storage.googleapis.com/blaine-garrett/theme/v2/about_wedding.jpg"
                  alt="#party"
                />
              </Col>
            </Row>
          </Col>

          <Col xs={3}>
            <SideBar />
          </Col>
        </Row>
      </Page>
    );
  }
}
AboutPage.propTypes = {};
