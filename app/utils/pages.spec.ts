import { mapPageData, Page } from './pages';

describe('mapPageData', () => {
  it('should map page data correctly', () => {
    const page = {
      __typename: 'Page',
      id: '123',
      title: 'Test Page',
      featuredImage: { node: { id: '456' } },
      template: { templateName: 'test-template' },
    } as Page;

    const expected = {
      id: '123',
      title: 'Test Page',
      featuredImage: { id: '456' },
      template: 'test-template',
    };

    expect(mapPageData(page)).toEqual(expected);
  });

  it('should remove __typename property from page data correctly', () => {
    const page = { __typename: 'Page' } as Page;

    expect(mapPageData(page)).toEqual({
      featuredImage: null,
      template: null,
    });
  });

  it('should return empty object when no featuredImage is provided', () => {
    const page = {} as Page;

    expect(mapPageData(page)).toEqual({
      featuredImage: null,
      template: null,
    });
  });
});
