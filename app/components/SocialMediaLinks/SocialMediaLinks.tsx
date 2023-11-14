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

type SocialMediaKey = keyof NonNullable<SocialMedia>;

const SocialMediaLinks: FunctionComponent<SocialMediaLinksProps> = ({
  socialMediaData,
}) => {
  const mediaIcons = {
    socialMediaFacebook: faFacebookF,
    socialMediaInstagram: faInstagram,
    socialMediaFlickr: faFlickr,
    socialMediaBehance: faBehance,
  };
  return (
    <div
      className={`flex space-x-3 md:space-x-4 h-full items-center ${
        !socialMediaData && 'hidden'
      }`}
    >
      {socialMediaData &&
        (Object.keys(socialMediaData) as SocialMediaKey[]).map(key => {
          const media = socialMediaData[key];
          return (
            media?.show &&
            media.url && (
              <a href={media.url} data-testid={key} key={key}>
                <FontAwesomeIcon
                  icon={mediaIcons[key]}
                  className="h-[14px] md:h-4"
                />
              </a>
            )
          );
        })}
    </div>
  );
};

export default SocialMediaLinks;
