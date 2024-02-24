import { MenuLocationEnum } from '@app/graphql/__generated__/graphql';
import { QUERY_MENU_BY_LOCATION } from '@app/graphql/menus';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import queryMenuByLocation from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('queryMenuByLocation', () => {
  const MOCK_LOCATION = MenuLocationEnum.MainMenu;
  const MOCK_MENU = {
    id: 1,
    name: 'MOCK_MENU',
    slug: 'MOCK_MENU',
    menuItems: [],
  };
  const MOCK_MENUS = [MOCK_MENU];
  const MOCK_MENUS_RESPONSE = {
    data: {
      menus: {
        nodes: MOCK_MENUS,
      },
    },
  };
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { menus: null },
    errors: [MOCK_ERROR] as unknown as GraphQLError[],
  };

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getApolloClient', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_MENUS_RESPONSE);

    await queryMenuByLocation(MOCK_LOCATION);

    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_MENUS_RESPONSE);

    await queryMenuByLocation(MOCK_LOCATION);

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_MENU_BY_LOCATION, {
      location: MOCK_LOCATION,
    });
  });

  it('should return the menu if the query is successful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_MENUS_RESPONSE);

    const result = await queryMenuByLocation(MOCK_LOCATION);

    expect(result).toEqual({
      data: {
        menu: MOCK_MENU,
      },
      errors: undefined,
    });
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryMenuByLocation(MOCK_LOCATION);

    expect(result).toEqual({
      data: {
        menu: null,
      },
      errors: [MOCK_ERROR],
    });
  });
});
