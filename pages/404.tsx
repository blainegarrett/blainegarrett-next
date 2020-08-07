// 404 Page - optimized for Next.js
import React from 'react';
import { NextPage } from 'next';

import Page from '~/components/Page';
import { Row, Col } from '~/components/layout/grid';

const ErrorPage: NextPage<{}> = () => {
  return (
    <Page activePage="" title={'Not Found'} meta={{ title: 'Page Not Found' }}>
      <Row>
        <Col xs={12}>
          <p>We could not find the page you were looking for.</p>
        </Col>
      </Row>
    </Page>
  );
};

export default ErrorPage;
