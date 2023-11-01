// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fetchPostForm } = require('./services');

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
