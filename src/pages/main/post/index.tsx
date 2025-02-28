import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';

import { getMainPost } from '@/api.ts';

import ClockImage from './images/clock.svg?react';
import lipsImage from './images/lips.webp';

const Post = () => {
  const { data } = useQuery({ queryKey: ['main_post'], queryFn: getMainPost });

  if (!data) {
    return null;
  }

  const { title, body, tags, id } = data;

  return (
    <>
      <NavLink className="relative mx-20 mt-30 block lg:mx-0" to={`/posts/${id}`}>
        <img src={lipsImage} alt="lips" className="h-270 w-full object-cover lg:h-312 lg:w-672" />
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
            <ClockImage className="mr-8 size-12" />
            <span>4 min</span>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default Post;
