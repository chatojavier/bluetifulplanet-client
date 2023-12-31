import { ApiRoutes } from '@app/api/api.types';
import fetchData from '@app/utils/fetchData';
import { ContactFormReturn } from './utils';
import postContactForm, { ContactFormData } from './service';

jest.mock('@app/utils/fetchData', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe('postContactForm', () => {
  const MOCK_FORM_DATA: ContactFormData = {
    fullname: 'John Doe',
    email: 'john.doe@email.com',
    message: 'Hello world',
    source: 'test',
    system: 'test',
  };

  const MOCK_RESPONSE: ContactFormReturn = {
    contact_form_id: 1,
    status: 'mail_sent',
    message: 'Message sent successfully.',
    posted_data_hash: '1234567890',
    invalid_fields: [],
  };

  const mockFetchDataPost = jest.spyOn(fetchData, 'post');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetchData.post with the correct parameters', async () => {
    mockFetchDataPost.mockResolvedValue(MOCK_RESPONSE);

    await postContactForm(MOCK_FORM_DATA);

    expect(mockFetchDataPost).toHaveBeenCalledWith(
      `${process.env.WORDPRESS_HOST}${ApiRoutes.CONTACT_FORM}/${process.env.CONTACT_FORMID}/feedback`,
      MOCK_FORM_DATA
    );
  });

  it('should return the response from fetchData.post', async () => {
    mockFetchDataPost.mockResolvedValue(MOCK_RESPONSE);

    const result = await postContactForm(MOCK_FORM_DATA);

    expect(result).toEqual(MOCK_RESPONSE);
  });

  it('should throw an error if fetchData.post fails', async () => {
    const errorMessage = 'Failed to post contact form';
    mockFetchDataPost.mockRejectedValue(new Error(errorMessage));

    await expect(postContactForm(MOCK_FORM_DATA)).rejects.toThrow(errorMessage);
  });
});
