import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_MEDIA_TAG_BY_SLUG } from '@app/graphql/taxonomies';
import fetchGraphql from '@app/utils/fetchGraphql';
import { MediaTag, mapMediaTag } from '../../utils';

/**
 * Queries a gallery by its slug.
 * @param mediaTagSlug - The slug of the media tag.
 * @returns A promise that resolves to an object containing the gallery data and any errors.
 */

const queryMediaTagBySlug = async (
  mediaTagSlug: string
): Promise<ApiWpReturn<{ mediaTag: MediaTag | null }>> => {
  let mediaTagData;

  try {
    mediaTagData = await fetchGraphql(QUERY_MEDIA_TAG_BY_SLUG, {
      slug: mediaTagSlug,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `[taxonomies][media-tags][slug][queryMediaTagBySlug] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = mediaTagData;

  const mediaTag = data.mediaTag ? mapMediaTag(data.mediaTag) : null;

  return { data: { mediaTag }, errors };
};

export default queryMediaTagBySlug;
