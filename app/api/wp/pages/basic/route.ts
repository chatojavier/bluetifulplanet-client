import { NextResponse } from 'next/server';
import queryAllPostsBasic from './service';

export async function GET() {
  try {
    const { data, errors } = await queryAllPostsBasic();

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (!data) {
      throw new Error('Failed to load data');
    }

    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[api/wp/pages/basic] error ', error);

    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Server Error',
    });
  }
}
