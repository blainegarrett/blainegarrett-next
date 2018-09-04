import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Head from 'next/head';
import Page from '../../components/Page';
import Link from 'next/link';

import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../theming/withRoot';
import {Grid, Row, Col} from '../../components/layout/grid';
import ArticleRenderer from '../../components/blog/ArticleRenderer';
import SideBar from '../../components/layout/SideBar';
import moment from 'moment';
import getConfig from 'next/config';

//let host = 'https://blainegarrett-api-dot-blaine-garrett.appspot.com'
//let host = 'http://localhost:9090';
let host = getConfig().publicRuntimeConfig.API_HOST;

class Index extends React.Component {
  static async getInitialProps (ctx) {

    // TODO: Pull from a redux store layer to save queries on back buttons, etc
    const res = await fetch(host + '/api/rest/v1.0/posts?get_by_slug=' + ctx.query.slug);
    const json = await res.json();
    return { article: json.results };
  }

  render () {
    const { article } = this.props;

    return (
      <Page title={article.title}>
        <Grid>
          <Row>
            <Col xs={9}>
              <ArticleRenderer article={article} />
            </Col>
            <Col xs={3}><SideBar /></Col>
          </Row>
        </Grid>
      </Page>
    );
  }
}

export default withRoot(Index);


Index.propTypes = {
  article: PropTypes.object
};
