import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/api.ts';

function PromoSlider() {
  const { data } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  const promo = data?.slice(0, 1);

  return (
    <div>
      {promo?.map((product) => {
        return (
          <div key={product.id} className="relative h-375 overflow-hidden">
            <div className="absolute inset-x-20 top-36 z-3 text-[32px] font-bold text-white">{product.title}</div>
            <div className="absolute bottom-18 z-3 flex w-full justify-center">
              <div className="size-12 rounded-full bg-white" />
              <div className="ml-20 size-12 rounded-full bg-white/30" />
              <div className="ml-20 size-12 rounded-full bg-white/30" />
            </div>
            <div className="bg-black-500/50 absolute z-2 h-full w-full" />
            <img className="absolute z-1 h-full w-full" src={product.images[0]} alt={product.title} />
          </div>
        );
      })}
    </div>
  );
}

export default PromoSlider;
