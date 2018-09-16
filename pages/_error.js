// Error Page
import React from 'react';
import Head from 'next/head';

import Page from '../src/components/Page';
import { withStyles } from '@material-ui/core/styles';
import {Row, Col} from './../src/components/layout/grid';

const styles = {};
class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Page activePage="" title={'Oops: ' + this.props.statusCode.toString()}>
        <Head>
          <title>Opps {this.props.statusCode}</title>
        </Head>

        <Row>
          <Col xs={12}>
            <p>
              {
                this.props.statusCode
                  ? `An ${this.props.statusCode} error occurred. You might have a broken link.`
                  : 'An error occurred on client'
              }
            </p>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default withStyles(styles)(ErrorPage);

ErrorPage.propTypes = {};
