// Blog Page Index...
import React from 'react';
import { useDispatch } from 'react-redux';

import { commands as articleCommands } from '../../src/modules/articles/redux';

import Page from '../../src/components/Page';
import ContentWrapper from './../../src/components/layout/ContentWrapper';
import IndexPageComponent from './IndexPageComponent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelIcon from '@material-ui/icons/Label';

const loadMoreFunc = dispatch => async nextCursor => {
  await dispatch(articleCommands.loadArticles({ limit: 10, verbose: false }, nextCursor, 'all'));
};

const BlogIndexPage = () => {
  const dispatch = useDispatch();
  const loadMoreArticles = loadMoreFunc(dispatch);

  const meta = {
    title: 'Musings',
    description: 'My Blog',
    url: 'https://www.blainegarrett.com/blog',
  };

  const sideBarContent = (
    <div style={{ color: '#000000' }}>
      <List component="nav" aria-label="otherlinks" dense>
        {/* TODO: Convert these to Next Links */}
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
        <IndexPageComponent loadMoreArticles={loadMoreArticles} paginationKey="all" />
      </ContentWrapper>
    </Page>
  );
};

BlogIndexPage.getInitialProps = async ({ reduxStore }) => {
  // Tick the time once, so we'll have a
  // valid time before first render
  const { dispatch } = reduxStore;
  const loadMoreArticles = loadMoreFunc(dispatch);

  // Kick off The Initial Load...
  await loadMoreArticles(null);

  // Return the
  return { loadMoreArticles };
};

export default BlogIndexPage;
