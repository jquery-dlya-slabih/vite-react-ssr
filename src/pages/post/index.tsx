import { NavLink, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/api.ts';

function Post() {
  const { id } = useParams();
  const { data } = useQuery({ queryKey: ['post', id], queryFn: () => getPost(id || '') });

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="p-20">
        <title>{data.title}</title>
        <h1 className="text-[22px] uppercase">{data.title}</h1>
        <div className="mt-24">{data.body}</div>
        <NavLink className="my-24 block w-204 border border-black p-12 text-center uppercase" to="/">
          Back
        </NavLink>
      </div>
    </>
  );
}

export default Post;
