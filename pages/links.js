// Links Page
import React from 'react';
import Head from 'next/head';
import Page from '../src/components/Page';
import { withStyles } from '@material-ui/core/styles';
import {Row, Col} from './../src/components/layout/grid';

const styles = {};
class LinksPage extends React.Component {
  render () {
    let meta = {
      title: 'Links',
      description: 'Some links to my other projects and things I think you should check out'
    };
    return (
      <Page title="Links" activePage="links" meta={meta}>
        <Row>
          <Col xs={12}>
            <p>Having a links page is so 2001, but so am I. Here are links to my other projects and assorted other things of interest.</p>
          </Col>
        </Row>
      </Page>
    );
  }
}
LinksPage.propTypes = {};

export default withStyles(styles)(LinksPage);
