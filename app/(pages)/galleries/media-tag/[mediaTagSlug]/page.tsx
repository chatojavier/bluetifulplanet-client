import GalleryGrid from '@app/components/GalleryGrid/GalleryGrid';
import MediaItemsService from '@app/services/MediaItemsService';
import TaxonomiesService from '@app/services/TaxonomiesService';

export type MediaTagProps = {
  params: {
    mediaTagSlug: string;
  };
};

const getMediaTagData = async (params: MediaTagProps['params']) =>
  params.mediaTagSlug && !Array.isArray(params.mediaTagSlug)
    ? TaxonomiesService.getMediaTagBySlug(params.mediaTagSlug)
    : null;

const getFallbackGalleryData = async (photosId: string[]) => {
  return MediaItemsService.getMediaItemsById(photosId);
};

const Gallery = async ({ params }: MediaTagProps) => {
  const { mediaTag } = (await getMediaTagData(params)) || {};
  const { name: title, id, photosId } = mediaTag || {};

  const photosPerPage = 15;
  const idsPageOne = photosId ? photosId.slice(0, photosPerPage) : [];

  const fallback = (await getFallbackGalleryData(idsPageOne)) || {
    mediaItems: [],
  };

  return (
    <div id={id} className="gallery | py-4">
      <h1 className="hidden">{title}</h1>
      {photosId && <GalleryGrid photosId={photosId} fallback={fallback} />}
    </div>
  );
};

export default Gallery;

export const generateStaticParams = async () => {
  const { mediaTags } = (await TaxonomiesService.getAllMediaTags()) || {
    mediaTags: [],
  };

  return mediaTags.map(mediaTag => ({
    mediaTagSlug: mediaTag.slug as string,
  }));
};
