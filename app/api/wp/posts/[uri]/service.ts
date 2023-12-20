/* eslint-disable no-console */
import { QUERY_POST_BY_URI } from '@app/graphql/posts';
import { mapPostData } from '@app/utils/posts';
import { getApolloClient } from '@app/apollo/apollo-client';

const getPostByUri = async (uri: string) => {
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
      `[posts][getPostByUri] Failed to query post data: ${(e as Error).message}`
    );
    throw e;
  }

  const { data, errors } = postData;

  const post = data.post ? mapPostData(data.post) : null;

  return { data: { post }, errors };
};

export default getPostByUri;
