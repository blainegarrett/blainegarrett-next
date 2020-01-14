/* eslint-env jest */

import { logClickEvent, logEvent, initTracker } from './core';

// Set up the import mock for ReactGA
jest.mock('react-ga', () => ({
  event: jest.fn(),
  initialize: jest.fn(),
  ga: jest.fn(),
}));

// Set up the import mock for Next.js Config
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: { GA_PRIMARY_TRACKER_ID: 'test-tracker-id' },
}));

// Require ReactGA which will be the mock setup above
const ReactGA = require('react-ga');

describe('calling initTracker', () => {
  beforeEach(() => {
    // Reset the import between tests
    jest.resetModules();
  });

  test('calls init with tracker id', () => {
    // Run Code to Test
    const result = initTracker();

    // Check Results
    expect(result).toEqual(true);
    expect(ReactGA.initialize).toHaveBeenCalledTimes(1);
    expect(ReactGA.initialize).toBeCalledWith('test-tracker-id');
  });
});

describe('calling logClickEvent', () => {
  beforeEach(() => {
    // Reset the import between tests
    jest.resetModules();
  });

  test('calls event with expected data', () => {
    // Set Up Test
    const e = jest.mock();
    e.text = 'Link Text';
    e.attributes = [
      { name: 'data-ga-category', value: 'links' },
      { name: 'data-ga-action', value: 'dblclick' },
      { name: 'data-ga-cd-ad-client', value: 'Wet Paint' },
      { name: 'data-ga-cd-ad-campaign', value: 'Summer 2019' },
      { name: 'data-ga-not-custom-dimension', value: 'True' },
      { name: 'href', value: '#' },
    ];

    // Run Code to Test
    const result = logClickEvent(e);

    // Check Results
    expect(result).toEqual(true);
    expect(ReactGA.ga).toHaveBeenCalledTimes(1);
    expect(ReactGA.ga).toBeCalledWith('send', 'event', {
      eventAction: 'dblclick',
      eventCategory: 'links',
      eventLabel: 'Link Text',
      eventValue: 1,
      dimension1: 'Wet Paint',
      dimension2: 'Summer 2019',
    });
  });

  test('calls event with default values', () => {
    // Set Up Test
    const e = jest.mock();
    e.attributes = [];
    e.text = undefined; // mock is being wierd.

    // Run Code to Test
    const result = logClickEvent(e);

    // Check Results
    expect(result).toEqual(true);
    expect(ReactGA.ga).toHaveBeenCalledTimes(1);
    expect(ReactGA.ga).toBeCalledWith('send', 'event', {
      eventAction: 'click',
      eventCategory: 'link',
      eventLabel: undefined,
      eventValue: 1,
    });
  });
});

describe('calling logEvent', () => {
  // Emulate direct calls
  test('calls event with default values', () => {
    // Set Up Test

    // Run Code to Test
    const result = logEvent({
      eventAction: 'impression',
      eventCategory: 'blog-posts',
      eventLabel: undefined,
      eventValue: 1,
      adClient: 'wetpaint',
    });

    expect(result).toEqual(true);
    expect(ReactGA.ga).toHaveBeenCalledTimes(1);
    expect(ReactGA.ga).toBeCalledWith('send', 'event', {
      eventAction: 'impression',
      eventCategory: 'blog-posts',
      eventLabel: undefined,
      eventValue: 1,
      dimension1: 'wetpaint',
    });
  });

  test('does not call event id category is missing', () => {
    // Run Code to Test
    const result = logEvent({
      eventAction: 'impression',
      eventLabel: undefined,
      eventValue: 1,
      adClient: 'wetpaint',
    });

    // Check Results
    expect(result).toEqual(false);
    expect(ReactGA.ga).toHaveBeenCalledTimes(0);
  });
});
