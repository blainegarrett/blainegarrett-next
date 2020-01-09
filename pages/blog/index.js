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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LabelIcon from '@material-ui/icons/Label';
import Button from '@material-ui/core/Button';

let paginationKey = 'all';
let LIMIT = 10;

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

    let sideBarContent = (
      <div style={{ color: '#000000' }}>
        <List
          component="nav"
          aria-label="otherstuff"
          dense
          //style={{ backgroundColor: '#eeeeee' }}
        >
          <ListItem button component="a" href="/art">
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary="Art" />
          </ListItem>

          <ListItem button component="a" href="/programming">
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary="Programming" />
          </ListItem>

          <ListItem button component="a" href="/dim-media">
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary="Dim Media" />
          </ListItem>

          <ListItem button component="a" href="/interesting-bit-of-the-day">
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary="Interesting" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <Page isFluid title="Blog" activePage="blog" meta={meta}>
        <ContentWrapper
          title="Blog"
          image="https://commondatastorage.googleapis.com/blaine-garrett/juniper/old_gods.jpg"
          sideBarContent={sideBarContent}
        >
          <Row>
            <Col xs={12}>
              <Row>
                <Col xs={12}>
                  {resources.map(resource => {
                    return (
                      <div key={resource.resource_id}>
                        <ArticleCard resource={resource} />
                      </div>
                    );
                  })}
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <div style={{ padding: 16 }}>
                    {more && (
                      <Button
                        style={{ width: '100%' }}
                        variant="contained"
                        onClick={() => loadMoreArticles(nextCursor)}
                      >
                        more articles
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
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
