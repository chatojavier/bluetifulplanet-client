import fetchData from '@app/utils/fetchData';
import { ApiRoutes } from '@app/api/api.types';
import { Gallery, GalleryBasic } from '@api/wp/galleries/utils';
import { isBrowser } from '@app/utils/general';
import queryAllGalleriesBasic from '@app/api/wp/galleries/basic/service';

const getAllGalleriesBasic = async () => {
  if (!isBrowser()) {
    const { data, errors } = await queryAllGalleriesBasic();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ galleries: GalleryBasic[] }>(
    ApiRoutes.GALLERIES_BASIC
  );
};

const getGalleryBySlug = async (gallerySlug: string) => {
  if (!isBrowser()) {
    const { data, errors } = await import(
      '@app/api/wp/galleries/[slug]/service'
    ).then(module => module.default(gallerySlug));
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ gallery: Gallery | null }>(
    `${ApiRoutes.GALLERIES}/${gallerySlug}`
  );
};

const GalleriesService = {
  getAllGalleriesBasic,
  getGalleryBySlug,
};

export default GalleriesService;
