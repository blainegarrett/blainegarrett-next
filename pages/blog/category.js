import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Page from '../../src/components/Page';
import ContentWrapper from './../../src/components/layout/ContentWrapper';

import { Row, Col } from './../../src/components/layout/grid';
import ArticleCard from './../../src/components/blog/ArticleCard';
import { bindActionCreators } from 'redux';
import { commands as articleCommands } from '../../src/modules/articles/redux';
import { selectors as articleSelectors } from '../../src/modules/articles/redux';
import { constants as articleConstants } from '../../src/modules/articles/redux';

let LIMIT = 100;

const makeMapState = () => {
  const selectPagedResources = articleSelectors.makeSelectPagedResources();
  function mapState(state, ownProps) {
    return selectPagedResources(
      state,
      articleConstants.REDUCER_NAMESPACE,
      ownProps.category_slug
    ); // resources, more, nextCursor
  }
  return mapState;
};

function mapDispatch(dispatch) {
  return {
    loadMoreArticles: bindActionCreators(
      nextCursor =>
        articleCommands.loadArticles(
          { limit: LIMIT, verbose: false, category_slug: category_slug },
          nextCursor,
          category_slug
        ),
      dispatch
    )
  };
}

class BlogIndexPage extends React.Component {
  static async getInitialProps({ reduxStore, query, ...rest }) {
    let category_slug = query.slug;

    await reduxStore.dispatch(
      articleCommands.loadArticles(
        { limit: LIMIT, verbose: false, category_slug: category_slug },
        null,
        category_slug
      )
    );
    return { reduxStore, category_slug };
  }

  render() {
    const {
      resources,
      more,
      nextCursor,
      category_slug,
      loadMoreArticles
    } = this.props;

    let activePage =
      category_slug == 'programming' || category_slug == 'art'
        ? category_slug
        : 'blog';
    let capSlug =
      category_slug.charAt(0).toUpperCase() + category_slug.slice(1);

    // Image
    let contentWrapperProps = {};
    if (category_slug == 'art') {
      contentWrapperProps.image =
        'https://commondatastorage.googleapis.com/blaine-garrett/juniper/spraypaint.jpg';
    } else if (category_slug == 'programming') {
      contentWrapperProps.image =
        'https://commondatastorage.googleapis.com/blaine-garrett/juniper/blackhole.png';
    }

    let meta = {
      title: capSlug,
      description: 'Articles pertaining to ' + capSlug
    };

    return (
      <Page isFluid title={capSlug} activePage={activePage} meta={meta}>
        <ContentWrapper title={capSlug} {...contentWrapperProps}>
          <Row>
            <Col xs={12}>
              <Row>
                <Col>
                  {resources.map(resource => {
                    return (
                      <div key={resource.resource_id}>
                        <ArticleCard resource={resource} />
                      </div>
                    );
                  })}
                </Col>
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
        </ContentWrapper>
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
