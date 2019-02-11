import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Page from '../../src/components/Page';

import {Row, Col} from './../../src/components/layout/grid';
import ArticleCard from './../../src/components/blog/ArticleCard';
import { bindActionCreators } from 'redux';
import { commands as articleCommands } from '../../src/modules/articles/redux';
import { selectors as articleSelectors } from '../../src/modules/articles/redux';
import { constants as articleConstants } from '../../src/modules/articles/redux';


let LIMIT = 12;

const makeMapState = () => {
  const selectPagedResources = articleSelectors.makeSelectPagedResources();
  function mapState(state, ownProps) {
    return selectPagedResources(state, articleConstants.REDUCER_NAMESPACE, ownProps.category_slug); // resources, more, nextCursor
  };
  return mapState;
};

function mapDispatch(dispatch) {
  return {
    loadMoreArticles: bindActionCreators((nextCursor) => articleCommands.loadArticles({limit: LIMIT, verbose:false, category_slug: category_slug}, nextCursor, category_slug), dispatch),
  };
};


const styles = {};
class BlogIndexPage extends React.Component {
  static async getInitialProps ({reduxStore, query, ...rest}) {
    let category_slug = query.slug;

    await reduxStore.dispatch(articleCommands.loadArticles({limit: LIMIT, verbose:false, category_slug: category_slug}, null, category_slug));
    return {reduxStore, category_slug};
  }

  render () {
    const { resources, more, nextCursor, category_slug, loadMoreArticles } = this.props;

    let activePage = category_slug == 'programming' || category_slug == 'art' ? category_slug : 'blog';
    let capSlug = category_slug.charAt(0).toUpperCase() + category_slug.slice(1);

    let meta = {
      title: capSlug,
      description: 'Articles pertaining to ' + capSlug
    };

    return (
      <Page title={capSlug} activePage={activePage} meta={meta}>

        <Row>
          <Col xs={12}>
            <p>Returning soon after a revamp and you can read all my rambling about {category_slug}. </p>

            <Row>
              {
                resources.map((resource) => {
                  return (<Col key={resource.resource_id}  xs={12} sm={6} md={4}><ArticleCard resource={resource} /></Col>);
                })
              }
            </Row>

            {/*
            <Row>
              <Col xs={12}>
                {more && <Button style={{width:'100%'}} variant="contained" onClick={()=>loadMoreArticles(nextCursor)}>more articles</Button>}
              </Col>
            </Row>
            */}
            {/* [({more.toString()}, {nextCursor})] */}
          </Col>
        </Row>
      </Page>
    );
  }
}

export default withStyles(styles)(connect(makeMapState, mapDispatch)(BlogIndexPage));

BlogIndexPage.propTypes = {
  resources: PropTypes.array,
  more: PropTypes.bool,
  nextCursor: PropTypes.string,
  loadMoreArticles: PropTypes.func
};
