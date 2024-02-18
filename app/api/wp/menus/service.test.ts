import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_ALL_MENUS } from '@app/graphql/menus';
import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client';
import queryAllMenus from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
}));

describe('queryAllMenus', () => {
  const MOCK_MENUS_DATA = {
    menus: {
      nodes: [
        {
          id: 1,
          name: 'Menu 1',
          menuItems: {
            nodes: [
              {
                id: 'menu_1_1',
                label: 'Menu 1 Item 1',
                path: '/menu-1-item-1',
              },
              {
                id: 'menu_1_2',
                label: 'Menu 1 Item 2',
                path: '/menu-1-item-2',
              },
              {
                id: 'menu_1_3',
                label: 'Menu 1 Item 3',
                path: '/menu-1-item-3',
                parentId: 'menu_1_2',
              },
            ],
          },
        },
        {
          id: 2,
          name: 'Menu 2',
          menuItems: {
            nodes: [
              {
                id: 'menu_2_1',
                label: 'Menu 2 Item 1',
                path: '/menu-2-item-1',
              },
            ],
          },
        },
      ],
    },
  };
  const MOCK_MENUS_RESULT = {
    data: MOCK_MENUS_DATA,
    errors: null,
  } as unknown as ApolloQueryResult<typeof MOCK_MENUS_DATA>;

  const menuResult = {
    data: {
      menus: [
        {
          id: 1,
          name: 'Menu 1',
          menuItems: [
            {
              id: 'menu_1_1',
              label: 'Menu 1 Item 1',
              path: '/menu-1-item-1',
              subMenu: null,
            },
            {
              id: 'menu_1_2',
              label: 'Menu 1 Item 2',
              path: '/menu-1-item-2',
              subMenu: [
                {
                  id: 'menu_1_3',
                  label: 'Menu 1 Item 3',
                  path: '/menu-1-item-3',
                  subMenu: null,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Menu 2',
          menuItems: [
            {
              id: 'menu_2_1',
              label: 'Menu 2 Item 1',
              path: '/menu-2-item-1',
              subMenu: null,
            },
          ],
        },
      ],
    },
    errors: null,
  };

  const mockApolloClient = getApolloClient as jest.MockedFunction<
    typeof getApolloClient
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    const mockQuery = jest.fn().mockResolvedValue(MOCK_MENUS_RESULT);
    mockApolloClient.mockReturnValue({
      query: mockQuery,
    } as unknown as ApolloClient<NormalizedCacheObject>);

    await queryAllMenus();

    expect(mockApolloClient).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith({ query: QUERY_ALL_MENUS });
  });

  it('should return the menus from the response', async () => {
    const mockQuery = jest.fn().mockResolvedValue(MOCK_MENUS_RESULT);
    mockApolloClient.mockReturnValue({
      query: mockQuery,
    } as unknown as ApolloClient<NormalizedCacheObject>);

    const result = await queryAllMenus();

    expect(result).toEqual(menuResult);
  });

  it('should return an empty array if the response does not contain menus', async () => {
    const mockQuery = jest
      .fn()
      .mockResolvedValue({ data: { menus: null }, errors: null });
    mockApolloClient.mockReturnValue({
      query: mockQuery,
    } as unknown as ApolloClient<NormalizedCacheObject>);

    const result = await queryAllMenus();

    expect(result).toEqual({ data: { menus: [] }, errors: null });
  });

  it('should return the errors from the response', async () => {
    const mockErrors = [{ message: 'Error 1' }, { message: 'Error 2' }];
    const mockQuery = jest
      .fn()
      .mockResolvedValue({ data: { menus: null }, errors: mockErrors });
    mockApolloClient.mockReturnValue({
      query: mockQuery,
    } as unknown as ApolloClient<NormalizedCacheObject>);

    const result = await queryAllMenus();

    expect(result).toEqual({ data: { menus: [] }, errors: mockErrors });
  });

  it('should throw an error if apolloClient.query fails', async () => {
    const errorMessage = 'Failed to query menus';
    const mockQuery = jest.fn().mockRejectedValue(new Error(errorMessage));
    mockApolloClient.mockReturnValue({
      query: mockQuery,
    } as unknown as ApolloClient<NormalizedCacheObject>);

    await expect(queryAllMenus()).rejects.toThrow(errorMessage);
  });
});
