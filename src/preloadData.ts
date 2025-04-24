import { dehydrate, QueryClient } from '@tanstack/react-query';
import { matchPath } from 'react-router';

import { topProductsQuery, bestSellersQuery, mainPostQuery, blogQuery, productsQuery } from '@/data/main.ts';
import { postQuery } from '@/data/post.ts';
import { productQuery } from '@/data/product.ts';
import routes, { PATH } from '@/routes.tsx';

export default async function preloadData(url: string) {
  const queryClient = new QueryClient();
  const currentRoute = routes.map((route) => matchPath(route.path, url)).find((route) => route);

  if (currentRoute?.pattern.path === PATH.MAIN) {
    await Promise.all([
      queryClient.prefetchQuery(bestSellersQuery()),
      queryClient.prefetchInfiniteQuery(blogQuery()),
      queryClient.prefetchInfiniteQuery(productsQuery()),
      queryClient.prefetchQuery(mainPostQuery()),
      queryClient.prefetchQuery(topProductsQuery())
    ]);
  } else if (currentRoute?.pattern.path === PATH.POST) {
    await queryClient.prefetchQuery(postQuery(currentRoute.params.id));
  } else if (currentRoute?.pattern.path === PATH.PRODUCT) {
    await queryClient.prefetchQuery(productQuery(currentRoute.params.id));
  }

  const dehydratedState = dehydrate(queryClient);

  return { queryClient, dehydratedState };
}
