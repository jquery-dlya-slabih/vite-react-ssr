import { NavLink, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/api.ts';

function Product() {
  const { id } = useParams();
  const { data } = useQuery({ queryKey: ['product', id], queryFn: () => getProduct(id || '') });

  if (!data) {
    return null;
  }

  return (
    <>
      <title>{data.title}</title>
      <div className="p-20">
        <div className="lg:flex">
          <img
            src={data.images[0]}
            alt={data.title}
            className="h-312 w-full bg-gray-200 object-contain lg:h-390 lg:w-422"
          />
          <div className="mt-24 lg:mt-0 lg:flex lg:flex-col lg:pl-20">
            <h1 className="text-[22px] font-light uppercase">{data.title}</h1>
            <div className="font-bold uppercase">{data.price} &euro;</div>
            <div>
              <span className="font-bold">Rating: </span>
              <span className={data.rating >= 4 ? 'text-green-600' : 'text-orange-300'}>{data.rating}</span>
            </div>
            <div className="mt-24">{data.description}</div>
            <div className="mt-24 lg:mt-auto lg:flex">
              <button className="block w-full cursor-pointer border border-black p-12 text-center uppercase transition-opacity hover:opacity-80 active:opacity-70 lg:w-208">
                add to cart
              </button>
              <NavLink
                className="mt-12 block w-full border border-black p-12 text-center uppercase transition-opacity hover:opacity-80 active:opacity-70 lg:mt-0 lg:ml-12 lg:w-208"
                to="/"
              >
                Back
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
