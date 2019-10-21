// Links Page
import React from 'react';
import Page from '../src/components/Page';
import { Row, Col } from './../src/components/layout/grid';
import ContentWrapper from './../src/components/layout/ContentWrapper';

export default class LinksPage extends React.Component {
  render() {
    let meta = {
      title: 'Links',
      description:
        'Some links to my other projects and things I think you should check out'
    };
    return (
      <Page isFluid title="Links" activePage="links" meta={meta}>
        <ContentWrapper title={meta.title}>
          <Row>
            <Col xs={12}>
              <div style={{ padding: 16 }}>
                <p>
                  Having a links page is so 2001, but so am I. Here are links to
                  my other projects and assorted other things of interest.
                </p>
              </div>
            </Col>
          </Row>
        </ContentWrapper>
      </Page>
    );
  }
}
LinksPage.propTypes = {};
