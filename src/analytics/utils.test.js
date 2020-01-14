// Analytics Utility Tests
import { getDataAttributes, getCustomDimensions } from './utils';
/* eslint-env jest */

describe('getDataAttributes', () => {
  test('returns only data attributes', () => {
    const e = jest.mock();
    e.attributes = [
      { name: 'data-resource-id', value: 'asdf' },
      { name: 'data-title', value: 'Resource Name' },
      { name: 'href', value: '#' },
    ];

    const result = getDataAttributes(e);

    // href isn't a data- attribute
    expect(result).toEqual({ title: 'Resource Name', resourceId: 'asdf' });
  });

  test('returns empty when no attributes', () => {
    const e = jest.mock();
    e.attributes = [];

    const result = getDataAttributes(e);
    expect(result).toEqual({});
  });
});

describe('getCustomDimensions', () => {
  test('non object returns empty object', () => {
    expect(getCustomDimensions(null)).toEqual({});
    expect(getCustomDimensions(1)).toEqual({});
    expect(getCustomDimensions([])).toEqual({});
    expect(getCustomDimensions(undefined)).toEqual({});
  });

  test('object without matches returns empty object', () => {
    expect(getCustomDimensions({ test: 'test' })).toEqual({});
  });

  test('object with matches returns expected value', () => {
    expect(getCustomDimensions({ gaCdTest: 'test' })).toEqual({ test: 'test' });
    expect(getCustomDimensions({ gaCdTestMultipleWords: 'test' })).toEqual({
      testMultipleWords: 'test',
    });
  });
});
