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
query commentsByPostId($contentId: ID, $offsetPagination: OffsetPagination = {
  offset: 0,
  size: 10
}) {
  comments(where: {contentId: $contentId, offsetPagination: $offsetPagination}) {
    pageInfo {
      offsetPagination {
        total
      }
    }
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
