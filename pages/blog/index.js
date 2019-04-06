import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Page from '../../src/components/Page';

import { Row, Col } from './../../src/components/layout/grid';
import ArticleCard from './../../src/components/blog/ArticleCard';
import { bindActionCreators } from 'redux';
import { commands as articleCommands } from '../../src/modules/articles/redux';
import { selectors as articleSelectors } from '../../src/modules/articles/redux';
import { constants as articleConstants } from '../../src/modules/articles/redux';

let paginationKey = 'all';
let LIMIT = 12;

const makeMapState = () => {
  const selectPagedResources = articleSelectors.makeSelectPagedResources();
  function mapState(state, ownProps) {
    return selectPagedResources(
      state,
      articleConstants.REDUCER_NAMESPACE,
      paginationKey
    ); // resources, more, nextCursor
  }
  return mapState;
};

function mapDispatch(dispatch) {
  return {
    loadMoreArticles: bindActionCreators(
      nextCursor =>
        articleCommands.loadArticles(
          { limit: LIMIT, verbose: false },
          nextCursor,
          paginationKey
        ),
      dispatch
    )
  };
}

class BlogIndexPage extends React.Component {
  static async getInitialProps({ reduxStore, ...rest }) {
    await reduxStore.dispatch(
      articleCommands.loadArticles(
        { limit: LIMIT, verbose: false },
        null,
        paginationKey
      )
    );
    return { reduxStore };
  }

  render() {
    const { resources, more, nextCursor, loadMoreArticles } = this.props;

    let meta = {
      title: 'Blog',
      description: 'My Blog'
    };

    return (
      <Page title="Blog" activePage="blog" meta={meta}>
        <Row>
          <Col xs={12}>
            <p>Returning soon after a revamp.</p>

            <Row>
              {resources.map(resource => {
                return (
                  <Col key={resource.resource_id} xs={12} sm={6} md={4}>
                    <ArticleCard resource={resource} />
                  </Col>
                );
              })}
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

export default connect(
  makeMapState,
  mapDispatch
)(BlogIndexPage);

BlogIndexPage.propTypes = {
  resources: PropTypes.array,
  more: PropTypes.bool,
  nextCursor: PropTypes.string,
  loadMoreArticles: PropTypes.func
};
