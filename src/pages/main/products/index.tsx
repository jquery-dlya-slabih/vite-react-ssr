import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '@/api.ts';
import starImage from './imges/star.svg';
import { NavLink } from 'react-router';

const Products = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getProducts,
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
      <div className="mt-34 grid grid-cols-2 gap-20">
        {data.pages
          .map((page) => page.products)
          .flat()
          .map((product) => (
            <NavLink to={`/products/${product.id}`} key={product.id}>
              <div className="relative h-138 bg-pink-200 active:shadow-md active:outline active:outline-black">
                <img className="h-full w-full object-contain p-15" src={product.images[0]} alt={product.title} />
                <div className="absolute -right-2 -bottom-8 flex w-[80%] items-center justify-between bg-white">
                  <div className="py-3 pl-6 text-[14px] opacity-30">{product.brand || 'brand not found'}</div>
                  <div className="flex">
                    {new Array(Math.floor(product.rating)).fill('star').map((_value, index) => (
                      <img
                        className="mr-1 first:ml-4"
                        src={starImage}
                        key={index}
                        alt={'rating of product:' + product.rating}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-10 font-bold uppercase">{product.title}</div>
              <div className="mt-4">{product.price} &euro;</div>
            </NavLink>
          ))}
      </div>
      {hasNextPage ? (
        <button
          onClick={() => fetchNextPage()}
          className="mt-20 w-full border border-black py-10 text-[16px] font-medium"
        >
          SHOW MORE
        </button>
      ) : null}
    </div>
  );
};

export default Products;
