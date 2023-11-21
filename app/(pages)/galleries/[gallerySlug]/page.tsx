import GalleryGrid from '@app/components/GalleryGrid/GalleryGrid';
import GalleriesService from '@app/services/GalleriesService';
import MediaItemsService from '@app/services/MediaItemsService';
import { notFound } from 'next/navigation';

export type GalleryProps = {
  params: {
    gallerySlug: string;
  };
};

const getGalleryData = async (params: GalleryProps['params']) => {
  const result =
    params.gallerySlug && !Array.isArray(params.gallerySlug)
      ? await GalleriesService.getGalleryBySlug(params.gallerySlug)
      : null;

  if (!result || result.gallery.status !== 'publish') {
    notFound();
  }

  return result;
};

const getFallbackGalleryData = async (photosId: string[]) => {
  return MediaItemsService.getMediaItemsById(photosId);
};

const Gallery = async ({ params }: GalleryProps) => {
  const {
    gallery: { title, id, photosId },
  } = await getGalleryData(params);

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
  const { galleries } = (await GalleriesService.getAllGalleriesBasic()) || {
    galleries: [],
  };

  return galleries
    ?.filter(gallery => gallery.status === 'publish')
    .map(gallery => ({
      gallerySlug: gallery.slug as string,
    }));
};
