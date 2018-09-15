import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import Link from 'next/link';
import Page from '../../components/Page';

import {Row, Col} from './../../components/layout/grid';
import { bindActionCreators } from 'redux';
import { commands as articleCommands } from '../../modules/articles/redux';
import { selectors as articleSelectors } from '../../modules/articles/redux';
import { constants as articleConstants } from '../../modules/articles/redux';

let paginationKey = 'all';
let LIMIT = 10;

const makeMapState = () => {
  const selectPagedResources = articleSelectors.makeSelectPagedResources();
  function mapState(state, ownProps) {
    return selectPagedResources(state, articleConstants.REDUCER_NAMESPACE, paginationKey); // resources, more, nextCursor
  };
  return mapState;
};

function mapDispatch(dispatch) {
  return {
    loadMoreArticles: bindActionCreators((nextCursor) => articleCommands.loadArticles({limit: LIMIT, verbose:false}, nextCursor, paginationKey), dispatch),
  };
};


const styles = {};
class BlogIndexPage extends React.Component {
  static async getInitialProps ({reduxStore, ...rest}) {
    await reduxStore.dispatch(articleCommands.loadArticles({limit: LIMIT, verbose:false}, null, paginationKey));
    return {reduxStore};
  }

  render () {
    const { resources, more, nextCursor, loadMoreArticles } = this.props;

    let meta = {
      title: 'Blog',
      description: 'My Blog',
    };

    return (
      <Page title="Blog" activePage="blog" meta={meta}>

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

            {/*
              <span onClick={()=>loadMoreArticles(nextCursor)}>more</span>
              [({more.toString()}, {nextCursor})]
            */}
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
