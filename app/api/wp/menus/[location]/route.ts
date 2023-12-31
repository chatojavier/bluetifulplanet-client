import { NextRequest, NextResponse } from 'next/server';
import { MenuLocationEnum } from '@app/graphql/__generated__/graphql';
import getPostByUri from './service';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const location = searchParams.get('location') as MenuLocationEnum;
  try {
    const { data, errors } = await getPostByUri(location);

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (!data) {
      throw new Error('Failed to load data');
    }

    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[api/wp/menus/[location]] error ', error);

    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Server Error',
    });
  }
}
