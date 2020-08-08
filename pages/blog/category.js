// Blog Category Page

import React from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import Page from '~//components/Page';
import ContentWrapper from '~//components/layout/ContentWrapper';
//import ArticleListScreen from '~//screens/blog/ArticleListScreen';
import ArticleListScreen from './IndexPageComponent';
import { commands as articleCommands } from '~//modules/articles/redux';
import ProgrammingSidebar from '~//components/layout/ProgrammingSideBar';

const loadMoreFunc = (dispatch, paginationKey) => async (nextCursor) => {
  // Note: paginationKey is the same as paginationKey AND categorySlug
  await dispatch(
    articleCommands.loadArticles({ limit: 10, verbose: false, category_slug: paginationKey }, nextCursor, paginationKey)
  );
};

const BlogIndexPage = ({ categorySlug }) => {
  const dispatch = useDispatch();
  const loadMoreArticles = loadMoreFunc(dispatch, categorySlug);

  const activePage = categorySlug == 'programming' || categorySlug == 'art' ? categorySlug : 'blog';

  // Prettify The Slug for Display Purposes
  const prettySlug = categorySlug
    .split('-')
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');

  // Image
  const contentWrapperProps = {};
  if (categorySlug == 'art') {
    contentWrapperProps.image = 'https://commondatastorage.googleapis.com/blaine-garrett/juniper/spraypaint.jpg';
  } else if (categorySlug == 'programming') {
    contentWrapperProps.image = 'https://commondatastorage.googleapis.com/blaine-garrett/juniper/blackhole.png';
    contentWrapperProps.sideBarContent = <ProgrammingSidebar />;
  }

  const meta = {
    title: prettySlug,
    description: 'Articles pertaining to ' + prettySlug,
    url: 'https://www.blainegarrett.com/' + categorySlug,
  };

  return (
    <Page isFluid title={prettySlug} activePage={activePage} meta={meta}>
      <ContentWrapper title={prettySlug} {...contentWrapperProps}>
        <ArticleListScreen loadMoreArticles={loadMoreArticles} paginationKey={categorySlug} />
      </ContentWrapper>
    </Page>
  );
};

BlogIndexPage.getInitialProps = async ({ reduxStore, query }) => {
  // TODO: Select if we already have stuff loaded to prevent refetch...
  // valid time before first render
  const categorySlug = query.slug;

  // TODO: Check if we already have the data
  const { dispatch } = reduxStore;
  const loadMoreArticles = loadMoreFunc(dispatch, categorySlug);

  // Kick off The Initial Load...
  await loadMoreArticles(null);

  // Return the
  return { loadMoreArticles, categorySlug };
};

export default BlogIndexPage;

BlogIndexPage.propTypes = {
  loadMoreArticles: PropTypes.func,
  categorySlug: PropTypes.string,
};
