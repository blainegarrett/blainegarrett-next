// Analytics Package

import { initTracker, logEvent, logClickEvent, mapToCustomDimensions, DIMENSIONS } from './core';

import { recordPageViewFromMeta } from './helpers';

export default {
  init: initTracker,
  logEvent,
  logClickEvent,
  mapToCustomDimensions,
  recordPageViewFromMeta,
  DIMENSIONS,
};
