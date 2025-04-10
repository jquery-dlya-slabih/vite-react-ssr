import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { NavLink } from 'react-router';

import { getPosts } from '@/api.ts';

import ClockIcon from './images/clock.svg?react';
import girlImage from './images/girl.webp';
import lipsImage from './images/lips.webp';

const Blog = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    select: (data) => data.pages.map((page) => page.posts).flat(),
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
        {data.map(({ id, tags, title, body }, index) => (
          <Fragment key={id}>
            <NavLink to={`/posts/${id}`} className="mb-18 flex lg:mb-0">
              <img className="h-108 w-112" src={index % 2 ? girlImage : lipsImage} alt="girl" />
              <div className="ml-14">
                <div className="flex items-center text-[12px] text-black/30 dark:text-white/30 uppercase">
                  <div>{tags[0]}</div>
                  <div className="mx-10">|</div>
                  <ClockIcon className="size-12" />
                  <div className="ml-6">{index + 2} min</div>
                </div>
                <div className="mt-4 text-[14px] font-bold uppercase">{title.replace('.', '')}</div>
                <div className="mt-4 line-clamp-2 text-[12px]">{body.replace(title, '')}</div>
              </div>
            </NavLink>
            <div className="mb-18 h-1 w-full bg-black/30 last:hidden lg:hidden" />
          </Fragment>
        ))}
      </div>
      {hasNextPage ? (
        <button onClick={() => fetchNextPage()} className="custom-button w-full lg:mt-18">
          READ MORE
        </button>
      ) : null}
    </div>
  );
};

export default Blog;
