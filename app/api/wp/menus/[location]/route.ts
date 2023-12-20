import { NextRequest, NextResponse } from 'next/server';
import { MenuLocationEnum } from '@app/graphql/__generated__/graphql';
import getPostByUri from './service';

type RequestParams = {
  params: {
    location: MenuLocationEnum;
  };
};

export async function GET(_req: NextRequest, { params }: RequestParams) {
  const { location } = params;
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
    console.error('[api/wp/menus/location] error ', error);

    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Server Error',
    });
  }
}
