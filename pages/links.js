import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Head from 'next/head';
import Page from '../components/Page';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../theming/withRoot';

const styles = {
  root: { color: 'red'}
};

class Index extends React.Component {
  /*
  static async getInitialProps () {
    // Async load 10 known images from Mia's collection
    const res = await fetch('https://www.mplsart.com/api/posts?limit=25');
    const json = await res.json();
    return { artworks: json.results };
  }
  */

  render () {
    const { artworks } = this.props;

    return (
      <Page title="Links" activePage="links">
        <Head>
          <title>Blaine Garrett | Minneapolis Artist, Software Engineer & Tinkerer</title>
        </Head>

        <h3>Returning Soon</h3>

        {/*
        <h2>Links</h2>
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
      */}
      </Page>
    );
  }
}
export default withRoot(withStyles(styles)(Index));

Index.propTypes = {
  artworks: PropTypes.array
};
