// Helper Methods

import { getCustomDimensions } from './utils';
import { mapToCustomDimensions } from './core';
const ReactGA = require('react-ga');

/**
 * Record a "pageView" hit based on metaData
 * @param  {[type]} metaData [description]
 * @return {[type]}          [description]
 */
export function recordPageViewFromMeta(pageUrl, metaData) {
  let gaPayload = { page: pageUrl };

  // Title
  if (metaData.title) {
    gaPayload.title = metaData.title;
  }

  // Filter list down into known custom dimensions
  let customDimensions = mapToCustomDimensions(getCustomDimensions(metaData));
  ReactGA.ga('send', 'pageView', { ...gaPayload, ...customDimensions });

  return true;
}
