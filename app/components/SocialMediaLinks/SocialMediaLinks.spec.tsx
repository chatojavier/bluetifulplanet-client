import { SocialMedia } from '@app/types/site';
import { mockOptionsPageResult } from '@app/__mocks__/queries.mock';
import { render, screen } from '@testing-library/react';
import SocialMediaLinks from './SocialMediaLinks';

describe('SocialMediaLinks', () => {
  it('should render correctly facebook and instagram icons', () => {
    const SocialMediaData = mockOptionsPageResult.optionsPage.socialMedia;
    render(<SocialMediaLinks socialMediaData={SocialMediaData} />);

    expect(screen.queryByTestId('socialMediaFacebook')).toBeInTheDocument();
    expect(screen.queryByTestId('socialMediaInstagram')).toBeInTheDocument();
    expect(screen.queryByTestId('socialMediaFlickr')).toBeNull();
    expect(screen.queryByTestId('socialMediaBehance')).toBeNull();
  });
  it('should render correctly flickr and behance icons', () => {
    const SocialMediaData: SocialMedia =
      mockOptionsPageResult.optionsPage.socialMedia;
    SocialMediaData.socialMediaFacebook = { show: null, url: null };
    SocialMediaData.socialMediaInstagram = { show: null, url: null };
    SocialMediaData.socialMediaFlickr = {
      show: true,
      url: 'https://flickr.com/username',
    };
    SocialMediaData.socialMediaBehance = {
      show: true,
      url: 'https://behance.com/username',
    };

    render(<SocialMediaLinks socialMediaData={SocialMediaData} />);

    expect(screen.queryByTestId('socialMediaFacebook')).toBeNull();
    expect(screen.queryByTestId('socialMediaInstagram')).toBeNull();
    expect(screen.queryByTestId('socialMediaFlickr')).toBeInTheDocument();
    expect(screen.queryByTestId('socialMediaBehance')).toBeInTheDocument();
  });
});
