/* eslint-disable no-console */
import { QUERY_POST_BY_URI } from '@app/graphql/posts';
import { getApolloClient } from '@app/utils/apollo-client';
import { mapPostData } from '../utils';

const queryPostByUri = async (uri: string) => {
  const apolloClient = getApolloClient();

  let postData;

  try {
    postData = await apolloClient.query({
      query: QUERY_POST_BY_URI,
      variables: {
        uri,
      },
      fetchPolicy: 'no-cache',
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
