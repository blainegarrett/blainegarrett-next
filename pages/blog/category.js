import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Head from 'next/head';
import Page from '../../components/Page';
import Link from 'next/link';
import { withStyles } from 'material-ui/styles';
import withRoot from '../../theming/withRoot';

const styles = {
  root: { color: 'red'}
};

class Index extends React.Component {
  static async getInitialProps (ctx) {
    // Async load 10 known images from Mia's collection

    console.log(ctx.query.slug);
    const res = await fetch('https://www.mplsart.com/api/posts?category_slug=' + ctx.query.slug + '&limit=10');
    const json = await res.json();
    return { artworks: json.results, slug:ctx.query.slug};
  }

  render () {
    const { artworks, slug } = this.props;

    let activePage = slug == 'programming' || slug == 'art' ? slug : 'blog';

    return (
      <Page title={slug} activePage={activePage}>
        <Head>
          <title>Blaine Garrett | Minneapolis Artist, Software Engineer & Tinkerer</title>
        </Head>

        <h2>Blog Category ({slug})</h2>
        <ul>
          {
            artworks.map((resource) => {
              let id = resource.resource_id;
              return (
                <li key={id}><Link href={`/blog/article?slug=${resource.slug}`} as={`/2018/06/25/${resource.slug}`}><a title={resource.slug} className="permalink">{ resource.title }</a></Link></li>
              );
            })
          }
        </ul>
      </Page>
    );
  }
}
export default withRoot(withStyles(styles)(Index));

Index.propTypes = {
  artworks: PropTypes.array
};
