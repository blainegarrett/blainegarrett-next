import React, { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import PageLayoutContainer from './layout/PageLayoutContainer';
import Meta from './Meta';
import analytics from '../analytics';
import Prism from 'prismjs';
/**
 * Wrapper Component for Page that is Assumed to be only loaded once per "pageLoad"
 * This allows useEffect to only be called once regardless of state changes within that page.
 */
export default function PageContainer({ children, meta, ...props }) {
  // Record Google Analytic Page View
  useEffect(() => {
    // Only run on the client...
    console.log('RECORD PAGELOAD...?');
    //analytics.recordPageViewFromMeta(window.location.pathname, meta);
  });
  useLayoutEffect(() => {
    Prism.highlightAll();
  });

  return (
    <React.Fragment>
      <Meta meta={meta} />
      <PageLayoutContainer {...props}>{children}</PageLayoutContainer>
    </React.Fragment>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired
};

PageContainer.defaultProps = {
  meta: {}
};
