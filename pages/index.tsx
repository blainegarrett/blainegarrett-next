// HomePage
import React from 'react';
import { NextPage } from 'next';

import Page from '~/components/Page';
import { Row, Col } from '~/components/layout/grid';
import ContentWrapper from '~/components/layout/ContentWrapper';

const IndexPage: NextPage<{}> = () => {
  const meta = {
    title: 'Welcome',
    url: 'https://www.blainegarrett.com',
    description: 'Portfolio and Blog of Minneapolis Artist, Software Engineer and Tinkerer Blaine Garrett.',
  };

  return (
    <Page isFluid activePage="home" meta={meta}>
      <ContentWrapper
        title={'Welcome'}
        image="/static/drips1.jpg"
        headerLarge
        subheadingContent={
          <p>
            Portfolio returning soon. Check out my{' '}
            <a href="https://www.linkedin.com/in/blainegarrett/">Linked In profile</a> or{' '}
            <a href="/blog">read articles</a> I have written. ~Blaine
          </p>
        }
      >
        <Row>
          <Col xs={12}>
            <div style={{ padding: 16 }}></div>
          </Col>
        </Row>
      </ContentWrapper>
    </Page>
  );
};

export default IndexPage;
