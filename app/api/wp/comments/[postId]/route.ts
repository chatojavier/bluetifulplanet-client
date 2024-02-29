import { NextRequest, NextResponse } from 'next/server';
import queryCommentsByPostId from './service';

type RequestParams = {
  params: {
    postId: string;
  };
};

export async function GET(req: NextRequest, { params }: RequestParams) {
  const { postId } = params;
  const { searchParams } = req.nextUrl;
  const page = Number(searchParams.get('page')) || 1;
  const size = Number(searchParams.get('size')) || 10;
  try {
    const { data, errors } = await queryCommentsByPostId(postId, size, page);

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
