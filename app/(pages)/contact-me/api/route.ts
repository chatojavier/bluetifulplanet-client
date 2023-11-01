/* eslint-disable no-undef */
import { Endpoints } from '@app/types/general';
import { fetchPostForm } from '@app/utils/services';

export async function POST(req: Request) {
  const host = process.env.WORDPRESS_HOST;
  const endpoint = Endpoints.FORM;
  const contactFormId = process.env.CONTACT_FORMID;
  const url = `${host}${endpoint}/${contactFormId}/feedback`;
  const body = await req.json();

  const res = await fetchPostForm(body, url);

  return new Response(JSON.stringify(res), {
    status: res.data?.status || 200,
  });
}
