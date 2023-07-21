import {
  mockMenuQuery,
  mockMenuResult,
  mockOptionsPageQuery,
  mockOptionsPageResult,
} from '@app/__mocks__/queries.mock';
import {
  removeLastTrailingSlash,
  removeDeepProperty,
  removeAllTrailingSlash,
} from './general';

describe('removeLastTrailingSlash', () => {
  it('should remove last trailing slash from an url', () => {
    const mockUrl = 'http://admin.bluetifulplanet.local/about-me/';
    const urlUpdated = removeLastTrailingSlash(mockUrl);
    expect(urlUpdated).toBe('http://admin.bluetifulplanet.local/about-me');
  });
  it("should return same value if it's not a string", () => {
    const mockUrl = ['http://admin.bluetifulplanet.local/about-me/'];
    const urlUpdated = removeLastTrailingSlash(mockUrl as unknown as string);
    expect(urlUpdated).toBe(mockUrl);
  });
});

describe('removeLastTrailingSlash', () => {
  it('should remove all trailing slash from an url or path', () => {
    const mockUrl = '/about-me/';
    const urlUpdated = removeAllTrailingSlash(mockUrl);
    expect(urlUpdated).toBe('about-me');
  });
  it("should return same value if it's not a string", () => {
    const mockUrl = ['/about-me/'];
    const urlUpdated = removeAllTrailingSlash(mockUrl as unknown as string);
    expect(urlUpdated).toBe(mockUrl);
  });
});

describe('removeDeepProperty', () => {
  const property = '__typename';
  it('should return a query without properties __typename', () => {
    const result = removeDeepProperty(mockOptionsPageQuery, property);
    const result2 = removeDeepProperty(mockMenuQuery, property);

    expect(result).toEqual(mockOptionsPageResult);
    expect(result2).toEqual(mockMenuResult);
  });
});
