/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment CommentFields on Comment {\n    id\n    databaseId\n    content\n    date\n    parentId\n    status\n    author {\n      node {\n        name\n        avatar {\n          url\n          width\n          height\n        }\n      }\n    }\n  }\n": types.CommentFieldsFragmentDoc,
    "\nquery commentsByPostId($contentId: ID, $offsetPagination: OffsetPagination = {\n  offset: 0,\n  size: 10\n}) {\n  comments(where: {contentId: $contentId, offsetPagination: $offsetPagination}) {\n    pageInfo {\n      offsetPagination {\n        total\n      }\n    }\n    nodes {\n      ...CommentFields\n    }\n  }\n}\n": types.CommentsByPostIdDocument,
    "\n  mutation CreateComment($author: String, $authorEmail: String, $clientMutationId: String, $commentOn: Int, $content: String, $authorUrl: String = \"\", $parent: ID = \"\") {\n    createComment(\n      input: {author: $author, authorEmail: $authorEmail, clientMutationId: $clientMutationId, commentOn: $commentOn, content: $content, authorUrl: $authorUrl, parent: $parent}\n    ) {\n      success\n      comment {\n        ...CommentFields\n      }\n      clientMutationId\n    }\n  }\n": types.CreateCommentDocument,
    "\n  query queryGalleriesBasic {\n    galleries {\n      nodes {\n        id\n        slug\n        status\n      }\n    }\n  }\n": types.QueryGalleriesBasicDocument,
    "\n  query queryGalleryBySlug($slug: ID!) {\n    gallery(id: $slug, idType: SLUG) {\n      id\n      title\n      slug\n      status\n      gallerySettings {\n        galleryPhotos {\n          databaseId\n        }\n      }\n    }\n  }\n": types.QueryGalleryBySlugDocument,
    "\n  fragment MediaItemFields on MediaItem {\n    altText\n    id\n    sourceUrl\n    mediaDetails {\n      height\n      width\n    }\n  }\n": types.MediaItemFieldsFragmentDoc,
    "\n  query mediaItemsById($in: [ID]) {\n    mediaItems(where: {in: $in}, first: 100) {\n      nodes {\n        ...MediaItemFields\n        mediaDetails {\n          meta {\n            aperture\n            focalLength\n            iso\n            shutterSpeed\n          }\n        }\n        title\n        description\n        mediaTags {\n          nodes {\n\t\t\t\t\t...MediaTagFields\n          }\n        }\n      }\n    }\n  }\n": types.MediaItemsByIdDocument,
    "\n  fragment MenuFields on Menu {\n    id\n    menuItems {\n      nodes {\n        id\n        parentId\n        label\n        path\n      }\n    }\n    name\n    slug\n    locations\n  }\n": types.MenuFieldsFragmentDoc,
    "\n  query queryAllMenus {\n    menus {\n      nodes {\n        ...MenuFields\n      }\n    }\n  }\n": types.QueryAllMenusDocument,
    "\n  query queryMenuByLocation($location: MenuLocationEnum) {\n    menus(where: { location: $location }) {\n      nodes {\n        ...MenuFields\n      }\n    }\n  }\n": types.QueryMenuByLocationDocument,
    "\n  fragment PageFields on Page {\n    id\n    title\n    uri\n    template {\n      templateName\n    }\n    status\n    content\n    featuredImage {\n      node {\n        ...MediaItemFields\n      }\n    }\n  }\n": types.PageFieldsFragmentDoc,
    "\n  query queryHomePage {\n    page(id: \"/\", idType: URI) {\n      id\n      title\n      slider {\n        sliderDesktop {\n          ...MediaItemFields\n        }\n        sliderMobile {\n          ...MediaItemFields\n        }\n      }\n    }\n  }\n": types.QueryHomePageDocument,
    "query queryPages {\n  pages {\n    nodes {\n      ...PageFields\n    }\n  }\n}": types.QueryPagesDocument,
    "query queryPagesBasic {\n  pages {\n    nodes {\n      id\n      slug\n      template {\n        templateName\n      }\n      status\n    }\n  }\n}": types.QueryPagesBasicDocument,
    "query queryPageByUri($uri: ID!) {\n  page(id: $uri, idType: URI) {\n      ...PageFields\n    }\n}": types.QueryPageByUriDocument,
    "\n  fragment PrevNextPost on Post {\n    id\n    title\n    slug\n  }\n": types.PrevNextPostFragmentDoc,
    "\n  fragment PostBasic on Post {\n    id\n    databaseId\n    title\n    slug\n    date\n    status\n  }\n": types.PostBasicFragmentDoc,
    "\n  fragment PostFields on Post {\n    ...PostBasic\n    content\n    featuredImage {\n      node {\n        ...MediaItemFields\n      }\n    }\n    author {\n      node {\n        ...UserBasic\n      }\n    }\n    tags {\n      nodes {\n        uri\n        name\n      }\n    }\n    comments {\n      nodes {\n        ...CommentFields\n      }\n    }\n    commentCount\n    next {\n      ...PrevNextPost\n    }\n    previous {\n      ...PrevNextPost\n    }\n  }\n": types.PostFieldsFragmentDoc,
    "\n  query queryPosts {\n    posts {\n      nodes {\n        ...PostFields\n      }\n    }\n  }\n": types.QueryPostsDocument,
    "query queryPostsBasic {\n  posts(first: 100) {\n    nodes {\n      ...PostBasic\n    }\n  }\n}": types.QueryPostsBasicDocument,
    "\n  query queryPostsResumes($offsetPagination: OffsetPagination) {\n    posts(where: {offsetPagination: $offsetPagination}) {\n      nodes {\n        ...PostBasic\n        excerpt\n        featuredImage {\n          node {\n            ...MediaItemFields\n          }\n        }\n        author {\n          node {\n            ...UserBasic\n          }\n        }\n      }\n      pageInfo {\n        offsetPagination {\n          hasMore\n          hasPrevious\n          total\n        }\n      }\n    }\n  }\n": types.QueryPostsResumesDocument,
    "query queryPostByUri($uri: ID!) {\n  post(id: $uri, idType: URI) {\n    ...PostFields\n  }\n}": types.QueryPostByUriDocument,
    "\n  query querySiteOptions {\n    optionsPage {\n      socialMedia {\n        socialMediaFacebook {\n          show\n          url\n        }\n        socialMediaInstagram {\n          show\n          url\n        }\n        socialMediaFlickr {\n          show\n          url\n        }\n        socialMediaBehance {\n          show\n          url\n        }\n      }\n      websiteSettings {\n        disableContextMenu {\n          disabled\n          messageToAlert\n        }\n      }\n    }\n  }\n": types.QuerySiteOptionsDocument,
    "\n  query querySiteData {\n    generalSettings {\n      description\n      language\n      title\n    }\n    favicon {\n      mediaDetails {\n        sizes {\n          sourceUrl\n          width\n        }\n      }\n    }\n  }\n": types.QuerySiteDataDocument,
    "\n  fragment MediaTagFields on MediaTag {\n    id\n    name\n    slug\n  }\n": types.MediaTagFieldsFragmentDoc,
    "\n  query queryAllMediaTags {\n    mediaTags(first: 1000) {\n      nodes {\n        ...MediaTagFields\n      }\n    }\n  }\n": types.QueryAllMediaTagsDocument,
    "\n  query QueryMediaTagBySlug($slug: ID!) {\n    mediaTag(id: $slug, idType: SLUG) {\n      id\n      name\n      slug\n      mediaItems(first: 1000) {\n        nodes {\n          databaseId\n        }\n      }\n    }\n  }\n": types.QueryMediaTagBySlugDocument,
    "\n  fragment UserBasic on User {\n    name\n    url\n  }\n": types.UserBasicFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CommentFields on Comment {\n    id\n    databaseId\n    content\n    date\n    parentId\n    status\n    author {\n      node {\n        name\n        avatar {\n          url\n          width\n          height\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').CommentFieldsFragmentDoc;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery commentsByPostId($contentId: ID, $offsetPagination: OffsetPagination = {\n  offset: 0,\n  size: 10\n}) {\n  comments(where: {contentId: $contentId, offsetPagination: $offsetPagination}) {\n    pageInfo {\n      offsetPagination {\n        total\n      }\n    }\n    nodes {\n      ...CommentFields\n    }\n  }\n}\n"): typeof import('./graphql').CommentsByPostIdDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateComment($author: String, $authorEmail: String, $clientMutationId: String, $commentOn: Int, $content: String, $authorUrl: String = \"\", $parent: ID = \"\") {\n    createComment(\n      input: {author: $author, authorEmail: $authorEmail, clientMutationId: $clientMutationId, commentOn: $commentOn, content: $content, authorUrl: $authorUrl, parent: $parent}\n    ) {\n      success\n      comment {\n        ...CommentFields\n      }\n      clientMutationId\n    }\n  }\n"): typeof import('./graphql').CreateCommentDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query queryGalleriesBasic {\n    galleries {\n      nodes {\n        id\n        slug\n        status\n      }\n    }\n  }\n"): typeof import('./graphql').QueryGalleriesBasicDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query queryGalleryBySlug($slug: ID!) {\n    gallery(id: $slug, idType: SLUG) {\n      id\n      title\n      slug\n      status\n      gallerySettings {\n        galleryPhotos {\n          databaseId\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').QueryGalleryBySlugDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MediaItemFields on MediaItem {\n    altText\n    id\n    sourceUrl\n    mediaDetails {\n      height\n      width\n    }\n  }\n"): typeof import('./graphql').MediaItemFieldsFragmentDoc;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query mediaItemsById($in: [ID]) {\n    mediaItems(where: {in: $in}, first: 100) {\n      nodes {\n        ...MediaItemFields\n        mediaDetails {\n          meta {\n            aperture\n            focalLength\n            iso\n            shutterSpeed\n          }\n        }\n        title\n        description\n        mediaTags {\n          nodes {\n\t\t\t\t\t...MediaTagFields\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').MediaItemsByIdDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MenuFields on Menu {\n    id\n    menuItems {\n      nodes {\n        id\n        parentId\n        label\n        path\n      }\n    }\n    name\n    slug\n    locations\n  }\n"): typeof import('./graphql').MenuFieldsFragmentDoc;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query queryAllMenus {\n    menus {\n      nodes {\n        ...MenuFields\n      }\n    }\n  }\n"): typeof import('./graphql').QueryAllMenusDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query queryMenuByLocation($location: MenuLocationEnum) {\n    menus(where: { location: $location }) {\n      nodes {\n        ...MenuFields\n      }\n    }\n  }\n"): typeof import('./graphql').QueryMenuByLocationDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PageFields on Page {\n    id\n    title\n    uri\n    template {\n      templateName\n    }\n    status\n    content\n    featuredImage {\n      node {\n        ...MediaItemFields\n      }\n    }\n  }\n"): typeof import('./graphql').PageFieldsFragmentDoc;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query queryHomePage {\n    page(id: \"/\", idType: URI) {\n      id\n      title\n      slider {\n        sliderDesktop {\n          ...MediaItemFields\n        }\n        sliderMobile {\n          ...MediaItemFields\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').QueryHomePageDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryPages {\n  pages {\n    nodes {\n      ...PageFields\n    }\n  }\n}"): typeof import('./graphql').QueryPagesDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryPagesBasic {\n  pages {\n    nodes {\n      id\n      slug\n      template {\n        templateName\n      }\n      status\n    }\n  }\n}"): typeof import('./graphql').QueryPagesBasicDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryPageByUri($uri: ID!) {\n  page(id: $uri, idType: URI) {\n      ...PageFields\n    }\n}"): typeof import('./graphql').QueryPageByUriDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PrevNextPost on Post {\n    id\n    title\n    slug\n  }\n"): typeof import('./graphql').PrevNextPostFragmentDoc;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PostBasic on Post {\n    id\n    databaseId\n    title\n    slug\n    date\n    status\n  }\n"): typeof import('./graphql').PostBasicFragmentDoc;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PostFields on Post {\n    ...PostBasic\n    content\n    featuredImage {\n      node {\n        ...MediaItemFields\n      }\n    }\n    author {\n      node {\n        ...UserBasic\n      }\n    }\n    tags {\n      nodes {\n        uri\n        name\n      }\n    }\n    comments {\n      nodes {\n        ...CommentFields\n      }\n    }\n    commentCount\n    next {\n      ...PrevNextPost\n    }\n    previous {\n      ...PrevNextPost\n    }\n  }\n"): typeof import('./graphql').PostFieldsFragmentDoc;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query queryPosts {\n    posts {\n      nodes {\n        ...PostFields\n      }\n    }\n  }\n"): typeof import('./graphql').QueryPostsDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryPostsBasic {\n  posts(first: 100) {\n    nodes {\n      ...PostBasic\n    }\n  }\n}"): typeof import('./graphql').QueryPostsBasicDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query queryPostsResumes($offsetPagination: OffsetPagination) {\n    posts(where: {offsetPagination: $offsetPagination}) {\n      nodes {\n        ...PostBasic\n        excerpt\n        featuredImage {\n          node {\n            ...MediaItemFields\n          }\n        }\n        author {\n          node {\n            ...UserBasic\n          }\n        }\n      }\n      pageInfo {\n        offsetPagination {\n          hasMore\n          hasPrevious\n          total\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').QueryPostsResumesDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryPostByUri($uri: ID!) {\n  post(id: $uri, idType: URI) {\n    ...PostFields\n  }\n}"): typeof import('./graphql').QueryPostByUriDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query querySiteOptions {\n    optionsPage {\n      socialMedia {\n        socialMediaFacebook {\n          show\n          url\n        }\n        socialMediaInstagram {\n          show\n          url\n        }\n        socialMediaFlickr {\n          show\n          url\n        }\n        socialMediaBehance {\n          show\n          url\n        }\n      }\n      websiteSettings {\n        disableContextMenu {\n          disabled\n          messageToAlert\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').QuerySiteOptionsDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query querySiteData {\n    generalSettings {\n      description\n      language\n      title\n    }\n    favicon {\n      mediaDetails {\n        sizes {\n          sourceUrl\n          width\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').QuerySiteDataDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MediaTagFields on MediaTag {\n    id\n    name\n    slug\n  }\n"): typeof import('./graphql').MediaTagFieldsFragmentDoc;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query queryAllMediaTags {\n    mediaTags(first: 1000) {\n      nodes {\n        ...MediaTagFields\n      }\n    }\n  }\n"): typeof import('./graphql').QueryAllMediaTagsDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryMediaTagBySlug($slug: ID!) {\n    mediaTag(id: $slug, idType: SLUG) {\n      id\n      name\n      slug\n      mediaItems(first: 1000) {\n        nodes {\n          databaseId\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').QueryMediaTagBySlugDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserBasic on User {\n    name\n    url\n  }\n"): typeof import('./graphql').UserBasicFragmentDoc;


export function gql(source: string) {
  return (documents as any)[source] ?? {};
}
