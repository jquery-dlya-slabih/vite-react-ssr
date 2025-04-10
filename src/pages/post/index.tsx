import { useQuery, skipToken } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router';

import { getPost } from '@/api.ts';

function Post() {
  const { id } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: id ? () => getPost(id) : skipToken
  });

  if (isPending) {
    return <div className="animate-pulse p-50 font-bold text-pink-500">Loading...</div>;
  }

  if (isError) {
    return <div className="p-50 font-bold text-red-400">Something went wrong...</div>;
  }

  const { title, body } = data;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={body} />
      <div className="p-20">
        <h1 className="text-[22px] uppercase">{title}</h1>
        <div className="mt-24">{body}</div>
        <NavLink className="mt-24 block custom-button" to="/">
          Back
        </NavLink>
      </div>
    </>
  );
}

export default Post;
