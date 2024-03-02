/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';
import mutatePostComment, { MutatePostCommentParams } from './service';

export async function POST(req: NextRequest) {
  try {
    const body: MutatePostCommentParams = await req.json();

    const { data, errors } = await mutatePostComment(body);

    if (errors) {
      console.error(
        '[comments][POST] Get errors from mutation: %s',
        errors[0].message
      );
      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    if (!data) {
      console.error('[comments][POST] Failed to get data from mutation');
      return NextResponse.json(
        { message: 'Failed to post comment' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error(
      `[comments][POST] Failed to post comment: ${(e as Error).message}`
    );
    return NextResponse.json(
      { message: (e as Error).message ?? 'Failed to post comment' },
      { status: 500 }
    );
  }
}
