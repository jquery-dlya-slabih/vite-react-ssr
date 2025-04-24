import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import * as v from 'valibot';

const ProductsScheme = v.object({
  products: v.array(
    v.object({
      id: v.number(),
      title: v.string(),
      brand: v.string(),
      rating: v.number(),
      price: v.number(),
      images: v.array(v.string())
    })
  ),
  total: v.number(),
  skip: v.number()
});

const PostsScheme = v.object({
  posts: v.array(
    v.object({
      id: v.number(),
      title: v.string(),
      body: v.string(),
      tags: v.array(v.string())
    })
  ),
  total: v.number(),
  skip: v.number()
});

type Products = v.InferOutput<typeof ProductsScheme>;
type Posts = v.InferOutput<typeof PostsScheme>;

const getTopProducts = async (): Promise<Products> => {
  const res: Products = await fetch('https://dummyjson.com/products?limit=3').then((res) => res.json());

  try {
    return v.parse(ProductsScheme, res);
  } catch (error) {
    console.error(error);

    return res;
  }
};

const getProducts = async ({ pageParam }: { pageParam: number }): Promise<Products> => {
  const res: Products = await fetch(`https://dummyjson.com/products?limit=${4}&skip=${3 + pageParam}`).then((res) =>
    res.json()
  );

  try {
    return v.parse(ProductsScheme, res);
  } catch (error) {
    console.error(error);

    return res;
  }
};

const getPosts = async ({ pageParam }: { pageParam: number }): Promise<Posts> => {
  const res = await fetch(`https://dummyjson.com/posts/tag/love?limit=${4}&skip=${1 + pageParam}`).then((res) =>
    res.json()
  );

  try {
    return v.parse(PostsScheme, res);
  } catch (error) {
    console.error(error);

    return res;
  }
};

const getMainPost = async (): Promise<Posts> => {
  const res = await fetch(`https://dummyjson.com/posts/tag/love?limit=1`).then((res) => res.json());

  try {
    return v.parse(PostsScheme, res);
  } catch (error) {
    console.error(error);

    return res;
  }
};

export const topProductsQuery = () =>
  queryOptions({
    queryKey: ['top_products'],
    queryFn: getTopProducts
  });

export const bestSellersQuery = () =>
  queryOptions({
    queryKey: ['top_products'],
    queryFn: getTopProducts,
    select: (data) => data.products.slice(1, 3)
  });

export const mainPostQuery = () =>
  queryOptions({
    queryKey: ['main_post'],
    queryFn: getMainPost
  });

export const blogQuery = () =>
  infiniteQueryOptions({
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

export const productsQuery = () =>
  infiniteQueryOptions({
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
