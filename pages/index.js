import React from 'react';
import Page from '../src/components/Page';
import { Row, Col } from './../src/components/layout/grid';
import ContentWrapper from './../src/components/layout/ContentWrapper';

export default class IndexPage extends React.Component {
  render() {
    const meta = {
      title: 'Welcome',
      url: 'https://www.blainegarrett.com',
      description: 'Portfolio and Blog of Minneapolis Artist, Software Engineer and Tinkerer Blaine Garrett.',
    };

    return (
      <Page isFluid activePage="home" meta={meta}>
        <ContentWrapper title={'Welcome'} loading="lazy" image="/static/drips1.jpg" headerLarge>
          <Row>
            <Col xs={12}>
              <div style={{ padding: 16 }}>
                Returning soon. I am rebuilding the site from the ground up to be be more 2020 friendly:
                <ul>
                  <li>Material Design</li>
                  <li>React/Redux</li>
                  <li>NextJS</li>
                  <li>REST</li>
                  <li>NodeJS on Google App Engine Standard.</li>
                </ul>
                Stay tuned.
              </div>
            </Col>
          </Row>
        </ContentWrapper>
      </Page>
    );
  }
}
IndexPage.propTypes = {};
