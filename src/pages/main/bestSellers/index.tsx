import { useQuery } from '@tanstack/react-query';
import { getTopProducts } from '@/api.ts';
import { NavLink } from 'react-router';

const BestSellers = () => {
  const { data } = useQuery({
    queryKey: ['top_products'],
    queryFn: getTopProducts,
    select: (data) => data.slice(1, 3)
  });

  if (!data) {
    return null;
  }

  return (
    <div className="mx-20 mt-18 flex lg:mt-30 lg:mr-0">
      {data.map(({ id, images, brand, price, title }) => (
        <NavLink to={`/products/${id}`} className="basis-1/2 odd:mr-20" key={id}>
          <div className="relative h-138">
            <img
              src={images[0]}
              alt="product"
              className="absolute top-0 h-full w-full bg-linear-to-r from-violet-400 to-pink-500 object-contain"
            />
            <div className="absolute top-21 left-18 w-80 bg-black p-3 text-center text-[9px] text-white uppercase">
              best seller january 2025
            </div>
          </div>
          <div className="mt-4 text-black/30">{brand}</div>
          <div className="mt-8 text-[18px] leading-20 font-bold tracking-[1px] uppercase">{title}</div>
          <div className="mt-8">{price} &euro;</div>
        </NavLink>
      ))}
    </div>
  );
};

export default BestSellers;
