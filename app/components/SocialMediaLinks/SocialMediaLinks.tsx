import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

const SocialMediaLinks: FunctionComponent = () => {
  return (
    <div className="flex space-x-4 h-full items-center">
      <FontAwesomeIcon icon={faFacebookF} className="h-4" />
      <FontAwesomeIcon icon={faInstagram} className="h-4" />
    </div>
  );
};

export default SocialMediaLinks;
