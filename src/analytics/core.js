/*
Analytics Package
This package wraps react-ga to setup and record Google Analytics
 */

import ReactGA from 'react-ga';
import getConfig from 'next/config';
import { getDataAttributes, getCustomDimensions } from './utils';

const { publicRuntimeConfig } = getConfig();

/**
 * Initialize Google Analytics Tracker
 * @return {boolean} if tracker could be initialized
 */
export const initTracker = () => {
  let primaryTrackerId = publicRuntimeConfig.GA_PRIMARY_TRACKER_ID;

  if (!primaryTrackerId) {
    console.debug(
      'Primary Tracker Id could not be established. Check value of GA_PRIMARY_TRACKER_ID of next.config'
    );
  }

  // Initialize ReactGA with tracker
  ReactGA.initialize(primaryTrackerId); // TODO: Support multiple trackers
  return true;
};

/**
 * Record an event given a raw payload
 * @param  {object} data Data payload
 * @return {boolean} if event was recorded
 */
export const logEvent = data => {
  let { eventCategory, eventAction, eventLabel, eventValue, ...rest } = data;

  // Bail if we do not have an eventCategory and eventAction
  if (!(eventCategory && eventAction)) {
    console.debug('eventCategory and eventAction are required', {
      eventCategory,
      eventAction
    });
    return false;
  }

  let gaPayload = { eventCategory, eventAction, eventLabel, eventValue };

  // Map human readable dimension names to dimensionX values for payload
  let filteredDimensions = mapToCustomDimensions(rest);

  // Send Payload
  ReactGA.ga('send', 'event', { ...gaPayload, ...filteredDimensions });
  return true;
};

/**
 * Event Wrapper to log click events
 * @param  {DomElement} element The dom element clicked (usually the event.currentTarget)
 * @return {boolean} If event was recorded
 */
export function logClickEvent(element) {
  var data = getDataAttributes(element);

  // Peel of data-* attributes and convert to camelcase
  let gaPayload = {};

  // Apply some sane defaults
  let { gaCategory, gaLabel, gaAction, gaValue, ...rest } = data;

  if (!gaCategory) {
    gaCategory = 'link';
  }
  if (!gaLabel) {
    gaLabel = element.text;
  }
  if (!gaAction) {
    gaAction = 'click';
  }
  if (!gaValue) {
    gaValue = 1;
  }

  // Set base requirements for analytic event
  gaPayload.eventCategory = gaCategory;
  gaPayload.eventAction = gaAction;
  gaPayload.eventLabel = gaLabel;
  gaPayload.eventValue = gaValue;

  // Filter list down into known custom dimensions
  let customDimensions = getCustomDimensions(rest);
  return logEvent({ ...gaPayload, ...customDimensions });
}

// Internal helper to map human readable dimension data to data appropriate for sending to GA
export function mapToCustomDimensions(data) {
  let dimensionKey;
  let niceDataKey;
  let returnData = {};

  for (niceDataKey in data) {
    dimensionKey = DIMENSIONS[niceDataKey];
    if (dimensionKey) {
      returnData[dimensionKey] = data[niceDataKey]; // data[dimensionKey] is now the value
    }
  }
  return returnData;
}

// An index of custom dimension keys - Be sure these align with what is in Analytics and Data Studio
export const DIMENSIONS = {
  // Advertisements
  adClient: 'dimension1', // eg. Wetpaint
  adCampaign: 'dimension2', // eg. 6 month
  adInstance: 'dimension3', // Book Ad
  adSpot: 'dimension4', // id of adspot - page, column, etc

  // Content - these are used for PageViews as well
  resourceId: 'dimension5', // resource id of primary target
  resourceType: 'dimension6', // resource type of primary target eg. Event
  resourceDisplayName: 'dimension7', // Nice displayname of primary target eg. "Opening"
  isPremium: 'dimension8', // isPremium resource true/false
  category: 'dimension9', // generic category of primary Resource
  resourceIdParent: 'dimension10', // ResourceId of Parent Resource (eg. Gallery resource Id)
  resourceTypeParent: 'dimension11', // Eg. Venue,
  resourceDisplayNameParent: 'dimension12' // Display Name of parent resource eg. "Gamut Gallery"
};
