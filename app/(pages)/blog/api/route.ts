import CommentsService, { CommentFields } from '@app/services/commentsService';
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
    const { createComment } = await CommentsService.createPostComment(
      postId,
      commentFields,
      parent
    );

    console.log('createComment', createComment);

    if (createComment)
      return NextResponse.json<CreateCommentMapped>(createComment);

    throw new Error('Failed to load data');
  } catch (error) {
    console.log('Route Api error ', error);
    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Failed to load data',
    });
  }
}
