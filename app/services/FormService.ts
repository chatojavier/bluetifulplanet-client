import { CreateCommentMapped } from '@app/utils/comments';
import { CommentFields } from './commentsService';

export type ContactFormData = {
  fullname: string;
  email: string;
  message: string;
  source: string;
  system: string;
};

const fetchPostData = async (url: string, body: unknown) => {
  const res = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.status >= 400) throw new Error(data.message);

  return data;
};

const postContactForm = async (formData: ContactFormData) => {
  const url = '/contact-me/api';
  return fetchPostData(url, formData);
};

const postCommentForm = async (
  postId: string | number,
  commentFields: CommentFields,
  parent?: string | null
): Promise<CreateCommentMapped> => {
  const url = '/blog/api';
  return fetchPostData(url, { postId, commentFields, parent });
};

const FormService = {
  postContactForm,
  postCommentForm,
};

export default FormService;
