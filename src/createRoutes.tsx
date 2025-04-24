import type { QueryClient } from '@tanstack/react-query';
import { lazy } from 'react';
import type { RouteObject } from 'react-router';

import Layout from '@/components/layout';
import { topProductsQuery, bestSellersQuery, mainPostQuery, blogQuery, productsQuery } from '@/data/main.ts';
import { postQuery } from '@/data/post.ts';
import { productQuery } from '@/data/product.ts';

const createRoutes = (queryClient: QueryClient): RouteObject[] => {
  return [
    {
      path: '/',
      Component: Layout,
      children: [
        {
          index: true,
          Component: lazy(() => import('@/pages/main')),
          loader: async () => {
            if (import.meta.env.SSR) {
              await Promise.all([
                queryClient.prefetchQuery(bestSellersQuery()),
                queryClient.prefetchInfiniteQuery(blogQuery()),
                queryClient.prefetchInfiniteQuery(productsQuery()),
                queryClient.prefetchQuery(mainPostQuery()),
                queryClient.prefetchQuery(topProductsQuery())
              ]);
            }
          }
        },
        {
          path: '/posts/:id',
          Component: lazy(() => import('@/pages/post')),
          loader: async ({ params }) => {
            if (import.meta.env.SSR) {
              await queryClient.prefetchQuery(postQuery(params.id));
            }
          }
        },
        {
          path: '/products/:id',
          Component: lazy(() => import('@/pages/product')),
          loader: async ({ params }) => {
            if (import.meta.env.SSR) {
              await queryClient.prefetchQuery(productQuery(params.id));
            }
          }
        },
        {
          path: '*',
          Component: lazy(() => import('@/pages/notFound'))
        }
      ]
    }
  ];
};

export default createRoutes;
