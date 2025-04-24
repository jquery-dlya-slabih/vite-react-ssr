import { queryOptions, skipToken } from '@tanstack/react-query';
import * as v from 'valibot';

const PostScheme = v.object({
  title: v.string(),
  body: v.string()
});

type Post = v.InferOutput<typeof PostScheme>;

const getPost = async (id: string): Promise<Post> => {
  const res: Post = await fetch(`https://dummyjson.com/posts/${id}`).then((res) => res.json());

  try {
    return v.parse(PostScheme, res);
  } catch (error) {
    console.error(error);

    return res;
  }
};

export const postQuery = (id?: string) =>
  queryOptions({
    queryKey: ['post', id],
    queryFn: id ? () => getPost(id) : skipToken
  });
