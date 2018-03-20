import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Head from 'next/head';
import Page from '../components/Page';
import Link from 'next/link';

export default class Index extends React.Component {
  static async getInitialProps () {
    // Async load 10 known images from Mia's collection
    const res = await fetch('https://www.mplsart.com/api/posts?limit=25');
    const json = await res.json();
    return { artworks: json.results };
  }

  render () {
    const { artworks } = this.props;

    return (
      <Page>
        <Head>
          <title>xxNext.js demo</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>

        <h2>?ASFLSDOPP</h2>

        <div className='list'>
          {
            artworks.map((resource) => {
              let id = resource.resource_id;
              return (
                <div key={id} className='photo'>
                  <a
                    className='photoLink'
                    href={`/2018/06/25/${resource.slug}`}
                  >

                  </a>
                </div>
              );
            })
          }
        </div>

        <h2>Direct Links</h2>
        {
          artworks.map((resource) => {
            let id = resource.resource_id;
            return (
              <li key={id}><Link href={`/2018/06/25/${resource.slug}`}><a className="permalink">{ resource.title}</a></Link></li>
            );
          })
        }

        <style jsx>{`
          .list {
            padding: 50px;
            text-align: center;
          }

          .photo .permalink {
            display: inline-block;
          }
          .photo {
            display: inline-block;
            text-align:center
          }

          .photoLink {
            color: #333;
            verticalAlign: middle;
            cursor: pointer;
            background: #eee;
            display: inline-block;
            width: 250px;
            height: 250px;
            line-height: 250px;
            margin: 10px;
            border: 2px solid transparent;
            background-position: 50% 50%;
            background-size: cover;
          }

          .photoLink:hover {
            borderColor: blue;
          }
        `}</style>
      </Page>
    );
  }
}


Index.propTypes = {
  artworks: PropTypes.array
};
