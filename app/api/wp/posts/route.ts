import { NextResponse } from 'next/server';
import queryAllPosts from './service';

export async function GET() {
  try {
    const { data, errors } = await queryAllPosts();

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (!data) {
      throw new Error('Failed to load data');
    }

    return NextResponse.json(data.posts);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[api/wp/posts] error ', error);

    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Server Error',
    });
  }
}
