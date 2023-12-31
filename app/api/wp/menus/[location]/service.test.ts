import { getApolloClient } from '@app/utils/apollo-client';
import { MenuLocationEnum } from '@app/graphql/__generated__/graphql';
import { QUERY_MENU_BY_LOCATION } from '@app/graphql/menus';
import queryMenuByLocation from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
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
    errors: [MOCK_ERROR],
  };

  const mockGetApolloClient = getApolloClient as jest.Mock;

  const mockQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetApolloClient.mockReturnValue({
      query: mockQuery,
    });
  });

  it('should call getApolloClient', async () => {
    mockQuery.mockResolvedValue(MOCK_MENUS_RESPONSE);

    await queryMenuByLocation(MOCK_LOCATION);

    expect(mockGetApolloClient).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockQuery.mockResolvedValue(MOCK_MENUS_RESPONSE);

    await queryMenuByLocation(MOCK_LOCATION);

    expect(mockQuery).toHaveBeenCalledWith({
      query: QUERY_MENU_BY_LOCATION,
      variables: {
        location: MOCK_LOCATION,
      },
    });
  });

  it('should return the menu if the query is successful', async () => {
    mockQuery.mockResolvedValue(MOCK_MENUS_RESPONSE);

    const result = await queryMenuByLocation(MOCK_LOCATION);

    expect(result).toEqual({
      data: {
        menu: MOCK_MENU,
      },
      errors: undefined,
    });
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockQuery.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryMenuByLocation(MOCK_LOCATION);

    expect(result).toEqual({
      data: {
        menu: null,
      },
      errors: [MOCK_ERROR],
    });
  });
});
