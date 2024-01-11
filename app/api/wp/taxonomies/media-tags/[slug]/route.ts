import { NextRequest, NextResponse } from 'next/server';
import queryMediaTagBySlug from './service';

type RequestParams = {
  params: {
    slug: string;
  };
};

export async function GET(_req: NextRequest, { params }: RequestParams) {
  const { slug } = params;
  try {
    const { data, errors } = await queryMediaTagBySlug(slug);

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (!data) {
      throw new Error('Failed to load data');
    }

    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[api/wp/taxonomies/media-tags/[slug]] error ', error);

    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Server Error',
    });
  }
}
