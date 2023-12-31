import { NextRequest, NextResponse } from 'next/server';
import mutatePostComment from './service';

type RequestParams = {
  params: {
    postId: string;
  };
};

export async function GET(_req: NextRequest, { params }: RequestParams) {
  const { postId } = params;
  try {
    const { data, errors } = await mutatePostComment(postId);

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (!data) {
      throw new Error('Failed to load data');
    }

    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[api/wp/comments/[postId]] error ', error);

    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Server Error',
    });
  }
}
