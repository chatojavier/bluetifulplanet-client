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
  objectToFormData,
  fetchPostForm,
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

describe('objectToFormData', () => {
  it('should convert an onject in formData format', () => {
    const object = {
      fullName: 'mockedFullname',
      email: 'mocked@email.com',
      message: 'Mocked Message',
    };
    const formData = objectToFormData(object);
    const newFormData = new FormData();
    expect(JSON.stringify(formData)).toStrictEqual(JSON.stringify(newFormData));
  });
});

describe('fetchPostForm', () => {
  const MOCK_RETURN = { message: 'Form was submited' };

  global.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(MOCK_RETURN) })
    );

  const mockFormPayload = {
    fullname: 'mockedName',
    email: 'mocked@email.com',
    Message: 'mocked Message',
  };

  const url = 'www.mockdomain.com/v1/mockedendpoint';
  it('should call fetch method with correct params', async () => {
    const data = await fetchPostForm(mockFormPayload, url);
    expect(fetch).toHaveBeenCalled();
    expect(data).toBe(MOCK_RETURN);
  });
});
