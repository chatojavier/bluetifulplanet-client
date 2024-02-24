import { QUERY_ALL_MENUS } from '@app/graphql/menus';
import { ApiWpReturn } from '@app/api/api.types';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import queryAllMenus from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
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
  } as unknown as ApiWpReturn<typeof MOCK_MENUS_DATA>;

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

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_MENUS_RESULT);

    await queryAllMenus();

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_ALL_MENUS);
  });

  it('should return the menus from the response', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_MENUS_RESULT);

    const result = await queryAllMenus();

    expect(result).toEqual(menuResult);
  });

  it('should return an empty array if the response does not contain menus', async () => {
    mockFetchGraphql.mockResolvedValue({
      data: { menus: null },
      errors: [null] as unknown as GraphQLError[],
    });

    const result = await queryAllMenus();

    expect(result).toEqual({ data: { menus: [] }, errors: [null] });
  });

  it('should return the errors from the response', async () => {
    const mockErrors = [
      { message: 'Error 1' },
      { message: 'Error 2' },
    ] as unknown as GraphQLError[];
    mockFetchGraphql.mockResolvedValue({
      data: { menus: null },
      errors: mockErrors,
    });

    const result = await queryAllMenus();

    expect(result).toEqual({ data: { menus: [] }, errors: mockErrors });
  });

  it('should throw an error if apolloClient.query fails', async () => {
    const errorMessage = 'Failed to query menus';
    mockFetchGraphql.mockRejectedValue(new Error(errorMessage));

    await expect(queryAllMenus()).rejects.toThrow(errorMessage);
  });
});
