// Blog Category Page

import React from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import Page from '../../src/components/Page';
import ContentWrapper from './../../src/components/layout/ContentWrapper';
import IndexPageComponent from './IndexPageComponent';

import { commands as articleCommands } from '../../src/modules/articles/redux';


let loadMoreFunc = (dispatch, paginationKey) => async (nextCursor) => {
  // Note: paginationKey is the same as paginationKey AND categorySlug
  await dispatch(articleCommands.loadArticles(
    { limit: 10, verbose: false, category_slug: paginationKey},
    nextCursor,
    paginationKey
  ));
};


const BlogIndexPage = ({categorySlug}) => {

  let dispatch = useDispatch();
  let loadMoreArticles = loadMoreFunc(dispatch, categorySlug);

  let activePage =
  categorySlug == 'programming' || categorySlug == 'art'
    ? categorySlug
    : 'blog';
  
  // Prettify The Slug for Display Purposes
  let prettySlug = categorySlug.split('-').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');

  // Image
  let contentWrapperProps = {};
  if (categorySlug == 'art') {
    contentWrapperProps.image =
    'https://commondatastorage.googleapis.com/blaine-garrett/juniper/spraypaint.jpg';
  } else if (categorySlug == 'programming') {
    contentWrapperProps.image =
    'https://commondatastorage.googleapis.com/blaine-garrett/juniper/blackhole.png';
  }

  let meta = {
    title: prettySlug,
    description: 'Articles pertaining to ' + prettySlug
  };

  return (
    <Page isFluid title={prettySlug} activePage={activePage} meta={meta}>
      <ContentWrapper title={prettySlug} {...contentWrapperProps}>
        <IndexPageComponent loadMoreArticles={loadMoreArticles} paginationKey={categorySlug}/>
      </ContentWrapper>
    </Page>
  );
};

BlogIndexPage.getInitialProps = async ({ reduxStore, query }) => {
  // Tick the time once, so we'll have a
  // valid time before first render
  let categorySlug = query.slug;


  // TODO: Check if we already have the data
  const { dispatch } = reduxStore;
  const loadMoreArticles = loadMoreFunc(dispatch, categorySlug);
  
  // Kick off The Initial Load...
  await loadMoreArticles(null);

  // Return the
  return {loadMoreArticles, categorySlug};
};

export default BlogIndexPage;

BlogIndexPage.propTypes = {
  loadMoreArticles: PropTypes.func,
  categorySlug: PropTypes.string,
};
