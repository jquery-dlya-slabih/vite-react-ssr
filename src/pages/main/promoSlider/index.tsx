import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';

import { getTopProducts } from '@/api.ts';

import type { MouseEvent } from 'react';

function PromoSlider() {
  const { data } = useQuery({ queryKey: ['top_products'], queryFn: getTopProducts });
  const promo = data?.slice(0, 1);

  const onSlideClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      {promo?.map((product) => {
        return (
          <NavLink to={`/products/${product.id}`} key={product.id} className="relative block h-375 overflow-hidden">
            <div className="absolute inset-x-20 top-36 z-3 text-[32px] leading-36 font-bold text-white">
              {product.title}
            </div>
            <div className="absolute bottom-18 z-3 flex w-full justify-center">
              <button onClick={onSlideClick} className="size-12 cursor-pointer rounded-full bg-white" />
              <button onClick={onSlideClick} className="ml-20 size-12 cursor-pointer rounded-full bg-white/30" />
              <button onClick={onSlideClick} className="ml-20 size-12 cursor-pointer rounded-full bg-white/30" />
            </div>
            <div className="bg-black-500/50 absolute z-2 h-full w-full" />
            <img className="absolute z-1 h-full w-full" src={product.images[0]} alt={product.title} />
          </NavLink>
        );
      })}
    </div>
  );
}

export default PromoSlider;
