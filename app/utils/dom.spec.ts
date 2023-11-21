import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from './dom';

describe('getScrollTop', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should return the scroll top value of the given element', () => {
    // Mock the necessary properties and methods
    const mockElement = {
      scrollTop: 100,
    } as Element;

    // Call the function with the mock element
    const result = getScrollTop(mockElement);

    // Assert that the result is equal to the mock element's scrollTop value
    expect(result).toBe(100);
  });

  it('should return the scroll top value of the document if the element is the document', () => {
    // Mock the necessary properties and methods
    jest
      .spyOn(document.documentElement, 'scrollTop', 'get')
      .mockImplementation(() => 200);

    jest.spyOn(document.body, 'scrollTop', 'get').mockImplementation(() => 300);

    // Call the function with the mock document
    const result = getScrollTop(document);

    // Assert that the result is equal to the maximum scroll top value of the document
    expect(result).toBe(300);
  });

  it('should return the scroll top value of the window if the element is the window', () => {
    // Mock the necessary properties and methods
    jest
      .spyOn(document.documentElement, 'scrollTop', 'get')
      .mockImplementation(() => 200);
    jest.spyOn(document.body, 'scrollTop', 'get').mockImplementation(() => 300);
    window.pageYOffset = 400;

    // Call the function with the mock window
    const result = getScrollTop(document);

    // Assert that the result is equal to the window's pageYOffset value
    expect(result).toBe(400);
  });
});
describe('getScrollHeight', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should return the scroll height value of the given element', () => {
    // Mock the necessary properties and methods
    const mockElement = {
      scrollHeight: 500,
    } as Element;

    // Call the function with the mock element
    const result = getScrollHeight(mockElement);

    // Assert that the result is equal to the mock element's scrollHeight value
    expect(result).toBe(500);
  });

  it('should return the maximum scroll height value of the document if the element is the document', () => {
    // Mock the necessary properties and methods
    jest
      .spyOn(document.documentElement, 'scrollHeight', 'get')
      .mockImplementation(() => 600);

    jest
      .spyOn(document.body, 'scrollHeight', 'get')
      .mockImplementation(() => 700);

    // Call the function with the mock document
    const result = getScrollHeight(document);

    // Assert that the result is equal to the maximum scroll height value of the document
    expect(result).toBe(700);
  });
});
describe('getClientHeight', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should return the client height of the given element', () => {
    // Mock the necessary properties and methods
    const mockElement = {
      clientHeight: 200,
    } as Element;

    // Call the function with the mock element
    const result = getClientHeight(mockElement);

    // Assert that the result is equal to the mock element's clientHeight value
    expect(result).toBe(200);
  });

  it('should return the client height of the document if the element is the document', () => {
    // Mock the necessary properties and methods
    jest
      .spyOn(document.documentElement, 'clientHeight', 'get')
      .mockImplementation(() => 300);

    jest
      .spyOn(document.body, 'clientHeight', 'get')
      .mockImplementation(() => 400);

    // Call the function with the mock document
    const result = getClientHeight(document);

    // Assert that the result is equal to the maximum client height value of the document
    expect(result).toBe(400);
  });
});

describe('getTargetElement', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should return undefined if not in a browser environment', () => {
    // Mock the isBrowser variable to false
    const getWindowMock = jest
      .spyOn(global, 'window', 'get')
      .mockImplementation(() => undefined as unknown as Window & typeof global);

    // Call the function with a target and defaultElement
    const result = getTargetElement(null, 'default' as unknown as Window);

    // Assert that the result is undefined
    expect(result).toBeUndefined();
    getWindowMock.mockRestore();
  });

  it('should return the defaultElement if target is not provided', () => {
    // Call the function without a target and with a defaultElement
    const result = getTargetElement(null, 'default' as unknown as Window);

    // Assert that the result is equal to the defaultElement
    expect(result).toBe('default');
  });

  it('should return the result of the target function if target is a function', () => {
    // Mock the target function
    const target = jest.fn().mockReturnValue('targetResult');

    // Call the function with the target function and a defaultElement
    const result = getTargetElement(target, 'default');

    // Assert that the result is equal to the result of the target function
    expect(result).toBe('targetResult');
    // Assert that the target function was called
    expect(target).toHaveBeenCalled();
  });

  it('should return the target.current if target is an object with a current property', () => {
    // Mock the target object with a current property
    const target = { current: 'targetCurrent' } as unknown as Element;

    // Call the function with the target object and a defaultElement
    const result = getTargetElement(target, 'default' as unknown as Element);

    // Assert that the result is equal to the target.current value
    expect(result).toBe('targetCurrent');
  });

  it('should return the defaultElement if target.current is falsy', () => {
    // Mock the target object with a falsy current property
    const target = { current: null };

    // Call the function with the target object and a defaultElement
    const result = getTargetElement(target, 'default' as unknown as Window);

    // Assert that the result is equal to the defaultElement
    expect(result).toBe('default');
  });

  it('should return the target if target is not a function or an object with a current property', () => {
    // Mock the target value
    const target = { targetValue: 'targetValue' } as unknown as Element;

    // Call the function with the target value and a defaultElement
    const result = getTargetElement(target, 'default' as unknown as Element);

    // Assert that the result is equal to the target value
    expect(result).toBe(target);
  });
});
