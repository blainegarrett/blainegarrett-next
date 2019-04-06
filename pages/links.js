// Links Page
import React from 'react';
import Page from '../src/components/Page';
import { Row, Col } from './../src/components/layout/grid';

export default class LinksPage extends React.Component {
  render() {
    let meta = {
      title: 'Links',
      description:
        'Some links to my other projects and things I think you should check out'
    };
    return (
      <Page title="Links" activePage="links" meta={meta}>
        <Row>
          <Col xs={12}>
            <p>
              Having a links page is so 2001, but so am I. Here are links to my
              other projects and assorted other things of interest.
            </p>
          </Col>
        </Row>
      </Page>
    );
  }
}
LinksPage.propTypes = {};
