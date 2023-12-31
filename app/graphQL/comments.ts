import { gql } from './__generated__';

export const COMMENT_FIELDS = gql(`
  fragment CommentFields on Comment {
    id
    databaseId
    content
    date
    parentId
    status
    author {
      node {
        name
        avatar {
          url
          width
          height
        }
      }
    }
  }
`);

export const COMMENTS_BY_POST_ID = gql(`
query commentsByPostId($contentId: ID, $first: Int = 10, $after: String = "") {
  comments(where: {contentId: $contentId}, first: $first, after: $after) {
    nodes {
      ...CommentFields
    }
  }
}
`);

export const CREATE_COMMENT = gql(`
  mutation CreateComment($author: String, $authorEmail: String, $clientMutationId: String, $commentOn: Int, $content: String, $authorUrl: String = "", $parent: ID = "") {
    createComment(
      input: {author: $author, authorEmail: $authorEmail, clientMutationId: $clientMutationId, commentOn: $commentOn, content: $content, authorUrl: $authorUrl, parent: $parent}
    ) {
      success
      comment {
        ...CommentFields
      }
      clientMutationId
    }
  }
`);

export const GET_COMMENTS_BY_EMAIL = gql(`
  query GetCommentsByEmail {
    comments(where: {authorEmail: "chato.javier@gmail.com"}) {
      nodes {
        ...CommentFields
      }
    }
  }
`);
