import fetchData from './fetchData';

describe('post', () => {
  const MOCK_URL = 'www.mockdomain.com/v1/mockedendpoint';
  const MOCK_BODY = { name: 'John Doe', age: 30 };

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Success' }),
        status: 200,
      })
    );
  });

  it('should make a POST request with the correct parameters', async () => {
    await fetchData.post(MOCK_URL, MOCK_BODY);

    expect(fetch).toHaveBeenCalledWith(MOCK_URL, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(MOCK_BODY),
    });
  });

  it('should return the response data if the request is successful', async () => {
    const result = await fetchData.post(MOCK_URL, MOCK_BODY);

    expect(result).toEqual({ message: 'Success' });
  });

  it('should throw an error if the request fails', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.reject(new Error('Error')),
        status: 400,
      })
    );

    await expect(fetchData.post(MOCK_URL, MOCK_BODY)).rejects.toThrow('Error');
  });

  it('should make a GET request with the correct parameters', async () => {
    await fetchData.get(MOCK_URL);

    expect(fetch).toHaveBeenCalledWith(MOCK_URL, {
      method: 'GET',
    });
  });
});
