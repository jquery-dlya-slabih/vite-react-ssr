import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { NavLink } from 'react-router';

import { getTopProducts } from '@/api.ts';

function PromoSlider() {
  const [slide, setSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery({ queryKey: ['top_products'], queryFn: getTopProducts });

  useEffect(() => {
    const interval = setInterval(() => {
      if (slide < 2) {
        setSlide(slide + 1);
      } else {
        setSlide(0);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [slide]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = (carouselRef.current.scrollWidth / 3) * slide;
    }
  }, [slide]);

  const onSlideClick = (newSlide: number) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSlide(newSlide);
  };

  return (
    <div className="relative h-375 overflow-y-hidden">
      <div ref={carouselRef} className="flex h-395 snap-x snap-mandatory overflow-x-scroll scroll-smooth lg:mx-20">
        {data?.map(({ id, title, images }, index) => {
          return (
            <NavLink
              id={`slide-${index}`}
              to={`/products/${id}`}
              key={id}
              className="relative w-full flex-shrink-0 snap-center snap-always"
            >
              <div className="absolute top-36 left-18 z-3 text-[32px] leading-36 font-bold text-white">{title}</div>
              <div className="bg-neutral-800/50 absolute z-2 h-full w-full" />
              <img
                className="z-1 h-full w-full object-cover"
                loading={index > 2 ? 'lazy' : 'eager'}
                src={images[0]}
                alt={title}
              />
            </NavLink>
          );
        })}
      </div>
      <div className="absolute bottom-18 z-3 flex w-full justify-center">
        {[0, 1, 2].map((point) => (
          <button
            key={point}
            onClick={onSlideClick(point)}
            className={`${slide === point ? 'bg-white' : 'bg-white/30'} ml-20 size-12 cursor-pointer rounded-full first:ml-0`}
          />
        ))}
      </div>
    </div>
  );
}

export default PromoSlider;
