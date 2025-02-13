import { Fragment } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '@/api.ts';

import lipsImage from './images/lips.webp';
import girlImage from './images/girl.webp';
import clockImage from './images/clock.svg';
import { NavLink } from 'react-router';

const Blog = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.total <= lastPage.skip + 4) {
        return undefined;
      }

      return lastPageParam + 4;
    }
  });

  if (!data) {
    return null;
  }

  return (
    <div className="mx-20">
      <h2 className="mt-64 px-20 text-center text-[32px] leading-[34px] font-bold">
        get to know yourself with&nbsp;touché
      </h2>
      <div className="mt-34 lg:grid lg:grid-cols-2 lg:gap-12">
        {data.pages
          .map((page) => page.posts)
          .flat()
          .map((post, index) => (
            <Fragment key={post.id}>
              <NavLink to={`/posts/${post.id}`} className="mb-18 flex lg:mb-0">
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
              </NavLink>
              <div className="mb-18 h-1 w-full bg-black/30 last:hidden lg:hidden" />
            </Fragment>
          ))}
      </div>
      {hasNextPage ? (
        <button
          onClick={() => fetchNextPage()}
          className="w-full cursor-pointer border border-black py-10 text-[16px] font-medium transition-opacity hover:opacity-80 active:opacity-70 lg:mt-18"
        >
          READ MORE
        </button>
      ) : null}
    </div>
  );
};

export default Blog;
