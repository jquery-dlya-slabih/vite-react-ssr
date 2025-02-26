import { dehydrate, QueryClient } from '@tanstack/react-query';
import { matchPath } from 'react-router';

import { getTopProducts, getPosts, getPost, getMainPost, getProducts, getProduct } from '@/api.ts';
import routes, { PATH } from '@/routes.tsx';

export default async function preloadData(url: string) {
  const queryClient = new QueryClient();
  const currentRoute = routes.map((route) => matchPath(route.path, url)).find((route) => route);

  if (currentRoute?.pattern.path === PATH.MAIN) {
    await Promise.all([
      queryClient.prefetchInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        initialPageParam: 0
      }),
      queryClient.prefetchInfiniteQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        initialPageParam: 0
      }),
      queryClient.prefetchQuery({ queryKey: ['main_post'], queryFn: getMainPost }),
      queryClient.prefetchQuery({ queryKey: ['top_products'], queryFn: getTopProducts })
    ]);
  } else if (currentRoute?.pattern.path === PATH.POST) {
    await queryClient.prefetchQuery({
      queryKey: ['post', currentRoute.params.id],
      queryFn: () => getPost(currentRoute.params.id as string)
    });
  } else if (currentRoute?.pattern.path === PATH.PRODUCT) {
    await queryClient.prefetchQuery({
      queryKey: ['product', currentRoute.params.id],
      queryFn: () => getProduct(currentRoute.params.id as string)
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return { queryClient, dehydratedState };
}
