import { useQuery, skipToken } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router';

import { getProduct } from '@/api.ts';

function Product() {
  const { id } = useParams();
  const { data, isError, isPending } = useQuery({
    queryKey: ['product', id],
    queryFn: id ? () => getProduct(id) : skipToken
  });

  if (isPending) {
    return <div className="animate-pulse p-50 font-bold text-pink-500">Loading...</div>;
  }

  if (isError) {
    return <div className="p-50 font-bold text-red-400">Something went wrong...</div>;
  }

  const { title, images, price, rating, description } = data;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <div className="p-20">
        <div className="lg:flex">
          <img src={images[0]} alt={title} className="h-312 w-full bg-gray-200 object-contain lg:h-390 lg:w-422" />
          <div className="mt-24 lg:mt-0 lg:flex lg:flex-col lg:pl-20">
            <h1 className="text-[22px] font-light uppercase">{title}</h1>
            <div className="font-bold uppercase">{price}&nbsp;&euro;</div>
            <div>
              <span className="font-bold">Rating: </span>
              <span className={rating >= 4 ? 'text-green-600' : 'text-orange-300'}>{rating}</span>
            </div>
            <div className="mt-24">{description}</div>
            <div className="mt-24 lg:mt-auto lg:flex">
              <button className="custom-button">add to cart</button>
              <NavLink className="custom-button mt-12 block lg:mt-0 lg:ml-12" to="/">
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
