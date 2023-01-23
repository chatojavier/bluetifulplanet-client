import { SiteData } from '@app/types/site';
import { FC } from 'react';

interface FaviconProps {
  favItems: SiteData['favicon'];
}

const Favicon: FC<FaviconProps> = ({ favItems }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {favItems &&
      favItems?.length > 0 &&
      favItems.map(({ width, sourceUrl }) => {
        if (width === '180') {
          return (
            <link
              key={`fav-apple-${width}x${width}`}
              rel="apple-touch-icon"
              href={sourceUrl as string}
              sizes={`${width}x${width}`}
            />
          );
        }
        return (
          <link
            key={`fav-${width}x${width}`}
            rel="icon"
            type="image/png"
            sizes={`${width}x${width}`}
            href={sourceUrl as string}
          />
        );
      })}
  </>
);

export default Favicon;
