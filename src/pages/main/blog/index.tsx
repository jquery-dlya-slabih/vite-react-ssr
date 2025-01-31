import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api.ts';

import lipsImage from './images/lips.webp';
import girlImage from './images/girl.webp';
import clockImage from './images/clock.svg';

const Blog = () => {
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts });

  if (!data) {
    return null;
  }

  return (
    <div>
      <h2 className="mt-64 px-20 text-center text-[32px] leading-[34px] font-bold">
        get to know yourself with&nbsp;touché
      </h2>
      <div className="mx-20 mt-34">
        {data
          .filter((_post, index) => index && index < 4)
          .map((post, index) => (
            <div key={post.id} className="mb-18 flex">
              <img className="h-108 w-112" src={index % 2 ? girlImage : lipsImage} alt="girl" />
              <div className="ml-14">
                <div className="flex items-center text-[12px] text-black/30 uppercase">
                  <div>{post.tags[0]}</div>
                  <div className="mx-10">|</div>
                  <img src={clockImage} className="size-12 opacity-60" alt="clock" />
                  <div className="ml-6">{index + 2} min</div>
                </div>
                <div className="mt-4 text-[14px] font-bold uppercase">{post.title.replace('.', '')}</div>
                <div className="mt-4 line-clamp-2 text-[12px]">{post.body.replace(post.title, '')}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blog;
