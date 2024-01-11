import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_ALL_MEDIA_TAGS } from '@app/graphql/taxonomies';
import { getApolloClient } from '@app/utils/apollo-client';
import { removeDeepProperty } from '@app/utils/general';

export type MediaTag = {
  id: string;
  name?: string | null;
  slug?: string | null;
};

const queryAllMediaTags = async (): Promise<
  ApiWpReturn<{ mediaTags: MediaTag[] }>
> => {
  const apolloClient = getApolloClient();
  let mediaTagsData;

  try {
    mediaTagsData = await apolloClient.query({
      query: QUERY_ALL_MEDIA_TAGS,
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `[media-tags][queryAllMediaTags] Failed to query media tag data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = mediaTagsData;
  const mediaTags = data?.mediaTags?.nodes
    ? data.mediaTags.nodes.map(node => removeDeepProperty(node, '__typename'))
    : [];
  return {
    data: {
      mediaTags,
    },
    errors,
  };
};

export default queryAllMediaTags;
