// Helper Methods

import { getCustomDimensions } from './utils';
import { mapToCustomDimensions } from './core';
import ReactGA from 'react-ga';

/**
 * Record a "pageView" hit based on metaData
 * @param  {[type]} metaData [description]
 * @return {[type]}          [description]
 */
export function recordPageViewFromMeta(pageUrl, metaData) {
  const gaPayload = { page: pageUrl };

  // Title
  if (metaData.title) {
    gaPayload.title = metaData.title;
  }

  // Filter list down into known custom dimensions
  const customDimensions = mapToCustomDimensions(getCustomDimensions(metaData));
  ReactGA.ga('send', 'pageView', { ...gaPayload, ...customDimensions });

  return true;
}
