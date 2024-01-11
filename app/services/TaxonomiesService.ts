import { ApiRoutes } from '@app/api/api.types';
import queryMediaTagBySlug from '@app/api/wp/taxonomies/media-tags/[slug]/service';
import { MediaTag } from '@app/api/wp/taxonomies/media-tags/service';
import { MediaTag as MediaTagFull } from '@app/api/wp/taxonomies/utils';
import fetchData from '@app/utils/fetchData';
import { isBrowser } from '@app/utils/general';

const getAllMediaTags = async () => {
  if (!isBrowser()) {
    const queryAllMediaTags = (
      await import('@app/api/wp/taxonomies/media-tags/service')
    ).default;
    const { data, errors } = await queryAllMediaTags();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }
  return fetchData.get<{ mediaTags: MediaTag[] }>('/api/wp/taxonomies');
};

const getMediaTagBySlug = async (mediaTagSlug: string) => {
  if (!isBrowser()) {
    const { data, errors } = await queryMediaTagBySlug(mediaTagSlug);
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ mediaTag: MediaTagFull | null }>(
    `${ApiRoutes.MEDIA_TAGS}/${mediaTagSlug}`
  );
};

const TaxonomiesService = {
  getAllMediaTags,
  getMediaTagBySlug,
};

export default TaxonomiesService;
