// Error Page
import React from 'react';
import { NextPage } from 'next';

import Page from '~/components/Page';
import { Row, Col } from '~/components/layout/grid';

const ErrorPage: NextPage<{ statusCode: any }> = ({ statusCode }) => {
  // export default class ErrorPage extends React.Component {
  //   render() {
  let msg;
  if (statusCode) {
    msg = statusCode.toString();
  }

  return (
    <Page activePage="" title={'Oops: ' + msg} meta={{ title: `Error ${statusCode}` }}>
      <Row>
        <Col xs={12}>
          <p>
            {statusCode
              ? `A ${statusCode} error occurred. You might have a broken link.`
              : 'An error occurred on client'}
          </p>
        </Col>
      </Row>
    </Page>
  );
};

ErrorPage.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default ErrorPage;
