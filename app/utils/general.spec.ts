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
  isObject,
  isFunction,
  isBrowser,
  isString,
  isBoolean,
  isNumber,
  isUndef,
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
describe('isBrowser', () => {
  it('should return true if running in a browser environment', () => {
    expect(isBrowser()).toBe(true);
  });

  it('should return false if not running in a browser environment', () => {
    const getWindowMock = jest
      .spyOn(global, 'window', 'get')
      .mockImplementation(() => undefined as unknown as Window & typeof global);

    expect(isBrowser()).toBe(false);
    getWindowMock.mockRestore();
  });
});
describe('isObject', () => {
  it('should return true if the value is an object', () => {
    const value = { name: 'John', age: 30 };
    const result = isObject(value);
    expect(result).toBe(true);
  });

  it('should return false if the value is null', () => {
    const value = null;
    const result = isObject(value);
    expect(result).toBe(false);
  });

  it('should return false if the value is not an object', () => {
    const value = 'Hello';
    const result = isObject(value);
    expect(result).toBe(false);
  });
});
describe('isFunction', () => {
  it('should return true if the value is a function', () => {
    const value = () => 'Hello';
    const result = isFunction(value);
    expect(result).toBe(true);
  });

  it('should return false if the value is not a function', () => {
    const value = 'Hello';
    const result = isFunction(value);
    expect(result).toBe(false);
  });
});
describe('isString', () => {
  it('should return true if the value is a string', () => {
    const value = 'Hello';
    const result = isString(value);
    expect(result).toBe(true);
  });

  it('should return false if the value is not a string', () => {
    const value = 123;
    const result = isString(value);
    expect(result).toBe(false);
  });
});
describe('isBoolean', () => {
  it('should return true if the value is a boolean', () => {
    const value = true;
    const result = isBoolean(value);
    expect(result).toBe(true);
  });

  it('should return false if the value is not a boolean', () => {
    const value = 'Hello';
    const result = isBoolean(value);
    expect(result).toBe(false);
  });
});
describe('isNumber', () => {
  it('should return true if the value is a number', () => {
    const value = 123;
    const result = isNumber(value);
    expect(result).toBe(true);
  });

  it('should return false if the value is not a number', () => {
    const value = 'Hello';
    const result = isNumber(value);
    expect(result).toBe(false);
  });
});
describe('isUndef', () => {
  it('should return true if the value is undefined', () => {
    const value = undefined;
    const result = isUndef(value);
    expect(result).toBe(true);
  });

  it('should return false if the value is not undefined', () => {
    const value = null;
    const result = isUndef(value);
    expect(result).toBe(false);
  });
});
