import { queryOptions, infiniteQueryOptions, skipToken } from '@tanstack/react-query';

import { getMainPost, getPost, getPosts, getProduct, getProducts, getTopProducts } from '@/api.ts';

export const productQuery = (id?: string) =>
  queryOptions({
    queryKey: ['product', id],
    queryFn: id ? () => getProduct(id) : skipToken
  });

export const postQuery = (id?: string) =>
  queryOptions({
    queryKey: ['post', id],
    queryFn: id ? () => getPost(id) : skipToken
  });

export const topProductsQuery = () =>
  queryOptions({
    queryKey: ['top_products'],
    queryFn: getTopProducts
  });

export const bestSellersQuery = () =>
  queryOptions({
    queryKey: ['top_products'],
    queryFn: getTopProducts,
    select: (data) => data.slice(1, 3)
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
