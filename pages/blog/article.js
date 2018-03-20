import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Head from 'next/head';
import Page from '../../components/Page';
import {Grid, Row, Col} from '../../components/layout/grid';
import Breadcrumbs from '../../components/layout/breadcrumbs';
import Link from 'next/link';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    marginBottom: '40px'
  },
  title: {
    color: '#686868',
    fontSize: '26px',
    marginTop: '12px',
    'text-shadow': 'none',
    'font-weight': 'normal !important',
    'font-family': '"Open Sans", sans-serif',
    'margin-bottom': '10px',
    'line-height': '1.1'
  }
};

class ArticlePage extends React.Component {
  static async getInitialProps(ctx) {
    let {year, month, day, slug} = ctx.req.params;


    // Async load 10 known images from Mia's collection
    const res = await fetch(`https://www.mplsart.com/api/posts?get_by_slug=${slug}`);
    const json = await res.json();
    return { resource: json.results };
  }

  render () {
    const { resource, classes } = this.props;

    return (
      <Page>
        <Head>
          <title>BLOG</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>

        <Breadcrumbs>Hand Drawn Halftone Pattern</Breadcrumbs>

        <Grid>
          <Row>
            <Col md={9}>
              <div className={classes.root}>

                <Button variant="raised" color="primary">Hello World</Button>

                <div className='list'>
                {resource.title}
                <hr />
                <div dangerouslySetInnerHTML={{__html: resource.content}} />;

                <pre style={{textAlign: 'left'}}>
                { JSON.stringify(resource, null, 2) }
                </pre>
              </div>



              </div>
            </Col>
            <Col md={2}>sdfssdds</Col>
          </Row>
        </Grid>
      </Page>
    );
  }
}


ArticlePage.propTypes = {
  artworks: PropTypes.array
};

export default withStyles(styles)(ArticlePage);