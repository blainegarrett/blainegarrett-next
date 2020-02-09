// Helper Tests

/* eslint-env jest */

import { recordPageViewFromMeta } from './helpers';

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

describe('calling recordPageViewFromMeta', () => {
  beforeEach(() => {
    // Reset the import between tests
    jest.resetModules();
  });

  test('calls event with expected arguments', () => {
    // Run Code to Test
    const url = 'https://www.example.com';
    const rawPayload = { gaCdAdClient: 'wetpaint', title: 'Blog Post' };

    // Run Code to Test
    const result = recordPageViewFromMeta(url, rawPayload);

    // Check Results
    expect(result).toEqual(true);
    expect(ReactGA.ga).toHaveBeenCalledTimes(1);
    expect(ReactGA.ga).toBeCalledWith('send', 'pageView', {
      page: 'https://www.example.com',
      location: 'https://www.example.com',
      title: 'Blog Post',
      dimension1: 'wetpaint',
    });
  });
});
