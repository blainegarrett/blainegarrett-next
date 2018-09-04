// Links Page
import React from 'react';
import Head from 'next/head';
import Page from '../components/Page';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../theming/withRoot';
import {Row, Col} from './../components/layout/grid';

const styles = {};
class LinksPage extends React.Component {
  render () {
    return (
      <Page title="Links" activePage="links">
        <Head>
          <title>Links | Blaine Garrett | Minneapolis Artist, Software Engineer & Tinkerer</title>
        </Head>

        <Row>
          <Col xs={12}>
            <p>Returning Soon</p>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default withRoot(withStyles(styles)(LinksPage));

LinksPage.propTypes = {};
