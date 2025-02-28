import { useInfiniteQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';

import { getProducts } from '@/api.ts';

import StarIcon from './images/star.svg?react';

const Products = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (data) => data.pages.map((page) => page.products).flat(),
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
      <h2 className="mt-64 px-20 text-center text-[32px] leading-[34px] font-bold">Products</h2>
      <div className="mt-34 grid grid-cols-2 gap-20 lg:grid-cols-4">
        {data.map(({ id, images, title, brand, rating, price }) => (
          <NavLink to={`/products/${id}`} key={id}>
            <div className="relative h-138 bg-pink-200 transition-shadow hover:shadow-md hover:outline hover:outline-black">
              <img className="h-full w-full object-contain p-15" src={images[0]} alt={title} />
              <div className="absolute -right-2 -bottom-8 flex w-[80%] items-center justify-between bg-white">
                <div className="py-3 pl-6 text-[14px] opacity-30">{brand || 'brand not found'}</div>
                <div className="flex">
                  {new Array(Math.floor(rating)).fill('star').map((_value, index) => (
                    <StarIcon className="mr-1 first:ml-4" key={index} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 font-bold uppercase">{title}</div>
            <div className="mt-4">{price} &euro;</div>
          </NavLink>
        ))}
      </div>
      {hasNextPage ? (
        <button
          onClick={() => fetchNextPage()}
          className="my-20 w-full cursor-pointer border border-black py-10 text-[16px] font-medium transition-opacity hover:opacity-80 active:opacity-70"
        >
          SHOW MORE
        </button>
      ) : (
        <div className="my-20" />
      )}
    </div>
  );
};

export default Products;
