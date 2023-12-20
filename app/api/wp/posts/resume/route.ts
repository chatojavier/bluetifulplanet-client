import { NextRequest, NextResponse } from 'next/server';
import queryAllPostsResume from './service';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const offset = Number(searchParams.get('offset'));
  const size = Number(searchParams.get('size'));

  try {
    const { data, errors } = await queryAllPostsResume(offset, size);

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
