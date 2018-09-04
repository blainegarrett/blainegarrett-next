import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Head from 'next/head';
import Page from '../../components/Page';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../theming/withRoot';
import moment from 'moment';
import getConfig from 'next/config';
import {Row, Col} from './../../components/layout/grid';

//let host = getConfig().publicRuntimeConfig.API_HOST;

const styles = {};
class BlogIndexPage extends React.Component {
  static async getInitialProps () {
    //const res = await fetch(host + '/api/rest/v1.0/posts?limit=100&verbose=false');
    //const json = await res.json();
    //return { resources: json.results };
    return { resources: []};
  }

  render () {
    const { resources } = this.props;

    return (
      <Page title="Blog" activePage='blog'>
        <Head>
          <title>Blog | Blaine Garrett</title>
        </Head>

        <Row>
          <Col xs={12}>
            <p>Returning soon after a revamp.</p>
            <ol>
              {
                resources.map((resource) => {
                  let id = resource.resource_id;
                  let slug_prefix = moment(resource.published_date).format('YYYY/MM/DD');

                  return (
                    <li key={id}><Link href={`/blog/article?slug=${resource.slug}`} as={`${slug_prefix}/${resource.slug}`}><a title={resource.slug} className="permalink">{ resource.title }</a></Link></li>
                  );
                })
              }
            </ol>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default withRoot(withStyles(styles)(BlogIndexPage));

BlogIndexPage.propTypes = {
  resources: PropTypes.array
};
