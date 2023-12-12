import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faBehance,
  faFacebookF,
  faFlickr,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import Header from './Header';
import InfoItem from './InfoItem';
import Tags, { MediaTag } from './Tags';
import { convertShutter } from './GalleryModal.utils';

interface InfoSectionProps {
  title: string;
  subcopy: string;
  metadata?: {
    aperture?: number | null;
    focalLength?: number | null | undefined;
    iso?: number | null;
    shutterSpeed?: number | null;
  } | null;
  tags: MediaTag[];
}

const InfoSection: FunctionComponent<InfoSectionProps> = ({
  title,
  subcopy,
  metadata,
  tags,
}) => {
  const { aperture, focalLength, iso, shutterSpeed } = metadata || {};
  const exposure = convertShutter(shutterSpeed || 0);
  const mediaIcons: Record<string, IconDefinition> = {
    socialMediaFacebook: faFacebookF,
    socialMediaInstagram: faInstagram,
    socialMediaFlickr: faFlickr,
    socialMediaBehance: faBehance,
  };
  return (
    <div className="info-section | w-full h-full space-y-7 flex-col overflow-y-auto p-8 justify-between | landscape:space-x-0 landscape:flex | lg:overflow-y-hidden">
      <Header title={title || ''} subcopy={subcopy || ''} />
      <div className="details | grid grid-cols-2 text-xs leading-loose text-center | landscape:grid-cols-4">
        <InfoItem label="Aperture" value={aperture?.toString() || ''} />
        <InfoItem label="F. Length" value={`${focalLength?.toString()}mm`} />
        <InfoItem label="ISO" value={iso?.toString() || ''} />
        <InfoItem label="Exposure" value={exposure} />
      </div>
      <Tags tagArray={tags} />
      <div className="share-media | text-xs space-y-2">
        <div className="lable | text-gray-400">Share:</div>
        <div className="item | flex gap-6">
          {Object.keys(mediaIcons).map(key => (
            <a href="#kd" key={key}>
              <FontAwesomeIcon
                icon={mediaIcons[key]}
                className="h-5 text-gray-500"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
