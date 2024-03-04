/* eslint-disable no-undef */
import { NextRequest, NextResponse } from 'next/server';
import postContactForm, { ContactFormData } from './service';

export async function POST(req: NextRequest) {
  const body: ContactFormData = await req.json();
  const host = req.headers.get('host');

  try {
    const data = await postContactForm(body, host);

    if (!data) {
      throw new Error('Failed to load data');
    }

    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[api/wp/contact] error ', error);

    return NextResponse.json(error, {
      status: 500,
    });
  }
}
