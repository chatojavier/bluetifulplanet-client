/* eslint-disable no-console */
import { QUERY_POST_BY_URI } from '@app/graphql/posts';
import fetchGraphql from '@app/utils/fetchGraphql';
import { mapPostData } from '../utils';

const queryPostByUri = async (uri: string) => {
  let postData;

  try {
    postData = await fetchGraphql(QUERY_POST_BY_URI, {
      uri,
    });
  } catch (e) {
    console.log(
      `[posts][queryPostByUri] Failed to query post data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = postData;

  const post = data.post ? mapPostData(data.post) : null;

  return { data: { post }, errors };
};

export default queryPostByUri;
