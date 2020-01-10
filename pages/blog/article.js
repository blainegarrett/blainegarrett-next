import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Page from '../../src/components/Page';
import ArticleRenderer from '../../src/components/blog/ArticleRenderer';
import ContentWrapper from './../../src/components/layout/ContentWrapper';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import { commands as articleCommands } from '../../src/modules/articles/redux';
import { selectors as articleSelectors } from '../../src/modules/articles/redux';
import Toolbar from '@material-ui/core/Toolbar';

const makeMapState = () => {
  const selectArticleResourceBySlug = articleSelectors.makeSelectArticleResourceBySlug();
  function mapState(state, ownProps) {
    return { article: selectArticleResourceBySlug(state, ownProps.slug) };
    return {};
  }
  return mapState;
};

class ArticlePage extends React.Component {
  static async getInitialProps({ res, reduxStore, query }) {
    // Async load the article if it is not in store. On server throw 404. Redirect if slug not exact.
    let slug = query.slug;

    // Step 1: Scope Selector
    const selectArticleResourceBySlug = articleSelectors.makeSelectArticleResourceBySlug();

    // Step 2: Select Article (only really applies on client)
    let article = selectArticleResourceBySlug(reduxStore.getState(), slug);

    // Step 3: If article not in store, async load it
    if (!article) {
      // If article not in state, attempt to async load it into state
      await reduxStore.dispatch(articleCommands.loadArticleBySlug(slug));

      // Step 3.5: Select Article - note async is done by now since await
      article = selectArticleResourceBySlug(reduxStore.getState(), slug);
    }

    // Step 4: If still no article, then throw 404 on server
    if (!article) {
      if (res) {
        // Only on the server...
        res.statusCode = 404;
      }
      return { slug: query.slug, article: article };
    }

    // Step 5: Ensure query url is in the desired published date format
    if (res) {
      // Note: We're not passing query.year, month, date, so they're undefined on client
      let expectedPrefix = `20${query.year}-${query.month}-${query.day}`;
      if (!article.published_date.startsWith(expectedPrefix)) {
        // Redirect to the actual url
        let bits = article.published_date.split('T')[0].split('-');

        if (res) {
          // Server
          res.writeHead(302, {
            Location: `/${bits[0]}/${bits[1]}/${bits[2]}/${article.slug}`
          });
          res.end();
        } else {
          // Client
          console.log('client 302... but not redirecting yet');
          console.log([expectedPrefix, article.published_date]);
          //Router.push(`/${bits[0]}/${bits[1]}/${bits[2]}/${article.slug}`);
        }
        return {};
      }
    }

    // Step
    return { slug: query.slug, article: article };
  }

  render() {
    const { article } = this.props;

    if (!article) {
      return (
        <Page title="Article Not Found">
          <h2>Article Not Found</h2>
        </Page>
      );
    }

    let sideBarContent = null;
    //<div>{moment(article.published_date).format('MMMM Do, YYYY')}</div>

    let subheadingContent = (
      <div>
        {moment(article.published_date).format('MMMM Do, YYYY')}
        &nbsp; by Blaine Garrett
      </div>
    );

    let titleContent = article.summary;

    // Determine meta
    let image_url =
      'https://storage.googleapis.com/blaine-garrett/theme/v2/about_wedding.jpg';
    if (article.legacy_image_resource) {
      image_url =
        'https://commondatastorage.googleapis.com/blaine-garrett/' +
        article.legacy_image_resource.gcs_filename;
    }

    let meta = {
      title: article.title,
      description: article.summary,
      image: image_url,
      imageHeight: 472,
      imageWidth: 900,
      type: 'article',
      author: 'Blaine Garrett'
    };

    return (
      <Page isFluid meta={meta}>
        <ContentWrapper
          title={meta.title}
          image={image_url}
          headerBlur
          headerLarge
          sideBarContent={sideBarContent}
          subheadingContent={subheadingContent}
          titleContent={titleContent}
        >
          <ArticleRenderer article={article} />
        </ContentWrapper>
      </Page>
    );
  }
}

export default connect()(ArticlePage);

ArticlePage.propTypes = {
  article: PropTypes.object
};
