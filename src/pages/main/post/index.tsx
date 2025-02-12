import { useQuery } from '@tanstack/react-query';
import { getMainPost } from '@/api.ts';

import lipsImage from './images/lips.webp';
import clockImage from './images/clock.svg';
import { NavLink } from 'react-router';

const Post = () => {
  const { data } = useQuery({ queryKey: ['main_post'], queryFn: getMainPost });

  if (!data) {
    return null;
  }

  const { title, body, tags, id } = data;

  return (
    <>
      <h2 className="px-20 pt-25 text-center text-[32px] font-bold tracking-[8px]">touché choice</h2>
      <NavLink className="relative mx-20 mt-30 block" to={`/posts/${id}`}>
        <img src={lipsImage} alt="lips" />
        <div className="absolute top-18 left-18">
          <div className="w-240 text-[28px] leading-32 font-bold tracking-[1px] text-white">
            {title.replace('.', '')}
          </div>
          <div className="mt-16 line-clamp-3 w-240 text-white">{body.replace(title, '')}</div>
          <div className="mt-34 flex items-center text-[12px] text-white/60 uppercase">
            {tags.map((tag) => (
              <span className="mr-8" key={tag}>
                #{tag}
              </span>
            ))}
            <span className="mr-8">|</span>
            <img src={clockImage} alt="clock" className="mr-8 size-12" />
            <span>4 min</span>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default Post;
