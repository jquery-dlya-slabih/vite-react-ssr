import { queryOptions, skipToken } from '@tanstack/react-query';
import * as v from 'valibot';

const ProductScheme = v.object({
  title: v.string(),
  price: v.number(),
  rating: v.number(),
  description: v.string(),
  images: v.array(v.string())
});

type Product = v.InferOutput<typeof ProductScheme>;

const getProduct = async (id: string): Promise<Product> => {
  const res: Product = await fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json());

  try {
    return v.parse(ProductScheme, res);
  } catch (error) {
    console.error(error);

    return res;
  }
};

export const productQuery = (id?: string) =>
  queryOptions({
    queryKey: ['product', id],
    queryFn: id ? () => getProduct(id) : skipToken
  });
