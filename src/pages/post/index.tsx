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
      <title>{data.title}</title>
      <div className="p-20">
        <h1 className="text-[22px] uppercase">{data.title}</h1>
        <div className="mt-24">{data.body}</div>
        <NavLink
          className="mt-24 block w-full border border-black p-12 text-center uppercase transition-opacity hover:opacity-80 active:opacity-70 lg:w-204"
          to="/"
        >
          Back
        </NavLink>
      </div>
    </>
  );
}

export default Post;
