import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Page from '../../src/components/Page';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import {Row, Col} from './../../src/components/layout/grid';

const styles = {};

class BlogCategoryPage extends React.Component {
  static async getInitialProps (ctx) {
    // Async load 10 known images from Mia's collection

    //console.log(ctx.query.slug);
    //const res = await fetch('https://www.mplsart.com/api/posts?category_slug=' + ctx.query.slug + '&limit=10');
    //const json = await res.json();
    //return { resources: json.results, slug:ctx.query.slug};
    return {slug: ctx.query.slug};
  }

  render () {
    const { slug } = this.props;

    let activePage = slug == 'programming' || slug == 'art' ? slug : 'blog';
    let capSlug = slug.charAt(0).toUpperCase() + slug.slice(1);

    let meta = {
      title: capSlug,
      description: 'Articles pertaining to ' + capSlug
    };

    return (
      <Page title={capSlug} activePage={activePage} meta={meta}>

        <Row>
          <Col xs={12}>
            <p>Returning soon after a revamp and you can read all my rambling about {slug}. </p>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default withStyles(styles)(BlogCategoryPage);

BlogCategoryPage.propTypes = {
  resources: PropTypes.array,
  slug: PropTypes.string
};
