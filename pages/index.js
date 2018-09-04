import React from 'react';
import Head from 'next/head';
import Page from '../components/Page';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../theming/withRoot';
import {Row, Col} from './../components/layout/grid';

const styles = {};

class IndexPage extends React.Component {
  render () {
    return (
      <Page title="Welcome" activePage="home">
        <Head>
          <title>Blaine Garrett | Minneapolis Artist, Software Engineer & Tinkerer</title>
        </Head>

        <Row>
          <Col xs={12}>
            <div>Returning soon. I'm rebuilding my site from the ground up to be be more 2018 friendly:

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
      </Page>
    );
  }
}
export default withRoot(withStyles(styles)(IndexPage));

IndexPage.propTypes = {};
