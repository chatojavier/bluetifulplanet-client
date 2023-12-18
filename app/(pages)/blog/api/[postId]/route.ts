import CommentsService from '@app/apollo/commentsService';
import { NextRequest, NextResponse } from 'next/server';

type RequestParams = {
  params: {
    postId: number | string;
  };
};

const errorMessage = 'Failed to load data';

export async function GET(req: NextRequest, { params }: RequestParams) {
  const { postId } = params;
  try {
    const { comments } =
      (await CommentsService.queryCommentsByPostId(postId)) || {};

    if (comments) return NextResponse.json(comments);

    throw new Error(errorMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Route Api error ', error);
    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: errorMessage,
    });
  }
}
