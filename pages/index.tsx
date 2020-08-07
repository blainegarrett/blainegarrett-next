// HomePage
import React from 'react';
import { NextPage } from 'next';

import Page from '~/components/Page';
import { Row, Col } from '~/components/layout/grid';
import ContentWrapper from '~/components/layout/ContentWrapper';
import { wrapper } from '~/store';
import { Provider, useSelector } from 'react-redux';
import { State } from '~/store';

const IndexPage: NextPage<State> = () => {
  const meta = {
    title: 'Welcome',
    url: 'https://www.blainegarrett.com',
    description: 'Portfolio and Blog of Minneapolis Artist, Software Engineer and Tinkerer Blaine Garrett.',
  };

  const state = useSelector<State, State>((state) => state);
  console.log(state);

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

export const getServerSideProps = wrapper.getServerSideProps(({ store, req, res, ...etc }) => {
  console.log('2. Page.getServerSideProps uses the store to dispatch things');
  store.dispatch({ type: 'TICK', payload: 'was set in other page' });
});

export default IndexPage;
// export default IndexPage;
