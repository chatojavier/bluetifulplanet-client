import CommentsService, { CommentFields } from '@app/apollo/commentsService';
import { CreateCommentMapped } from '@app/utils/comments';
import { NextRequest, NextResponse } from 'next/server';

type RequestBody = {
  postId: number | string;
  commentFields: CommentFields;
  parent?: string;
};

export async function POST(req: NextRequest) {
  const { postId, commentFields, parent }: RequestBody = await req.json();

  try {
    const { createComment } = await CommentsService.mutatePostComment(
      postId,
      commentFields,
      parent
    );

    if (createComment)
      return NextResponse.json<CreateCommentMapped>(createComment);

    throw new Error('Failed to load data');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Route Api error ', error);
    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Failed to load data',
    });
  }
}
