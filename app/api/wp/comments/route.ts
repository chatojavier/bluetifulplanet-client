import { NextRequest, NextResponse } from 'next/server';
import mutatePostComment, { MutatePostCommentParams } from './service';

export async function POST(req: NextRequest) {
  const body: MutatePostCommentParams = await req.json();

  try {
    const { data, errors } = await mutatePostComment(body);

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (!data) {
      throw new Error('Failed to load data');
    }

    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[api/wp/posts/resume] error ', error);

    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Server Error',
    });
  }
}
