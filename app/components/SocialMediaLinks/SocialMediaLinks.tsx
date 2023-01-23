import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBehance,
  faFacebookF,
  faFlickr,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { SocialMedia } from '@app/types/site';

interface SocialMediaLinksProps {
  socialMediaData?: SocialMedia;
}

const SocialMediaLinks: FunctionComponent<SocialMediaLinksProps> = ({
  socialMediaData,
}) => {
  return (
    <div
      className={`flex space-x-4 h-full items-center ${
        !socialMediaData && 'hidden'
      }`}
    >
      {socialMediaData && (
        <>
          {socialMediaData.socialMediaFacebook?.show &&
            socialMediaData.socialMediaFacebook?.url && (
              <a
                href={socialMediaData.socialMediaFacebook.url}
                data-testid="facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} className="h-4" />
              </a>
            )}
          {socialMediaData.socialMediaInstagram?.show &&
            socialMediaData.socialMediaInstagram?.url && (
              <a
                href={socialMediaData.socialMediaInstagram.url}
                data-testid="instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-4" />
              </a>
            )}
          {socialMediaData.socialMediaFlickr?.show &&
            socialMediaData.socialMediaFlickr?.url && (
              <a
                href={socialMediaData.socialMediaFlickr?.url}
                data-testid="flickr"
              >
                <FontAwesomeIcon icon={faFlickr} className="h-4" />
              </a>
            )}
          {socialMediaData.socialMediaBehance?.show &&
            socialMediaData.socialMediaBehance?.url && (
              <a
                href={socialMediaData.socialMediaBehance?.url}
                data-testid="behance"
              >
                <FontAwesomeIcon icon={faBehance} className="h-4" />
              </a>
            )}
        </>
      )}
    </div>
  );
};

export default SocialMediaLinks;
