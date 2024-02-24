import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_GALLERIES_BASIC } from '@app/graphql/galleries';
import { removeDeepProperty } from '@app/utils/general';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GalleryBasic } from '../utils';

const queryAllGalleriesBasic = async (): Promise<
  ApiWpReturn<{ galleries: GalleryBasic[] }>
> => {
  let galleriesData;

  try {
    galleriesData = await fetchGraphql(QUERY_GALLERIES_BASIC);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `[galleries][queryAllGalleriesBasic] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = galleriesData;

  const galleries = data.galleries?.nodes
    ? data.galleries?.nodes.map(gallery =>
        removeDeepProperty(gallery, '__typename')
      )
    : [];

  return { data: { galleries }, errors };
};

export default queryAllGalleriesBasic;
