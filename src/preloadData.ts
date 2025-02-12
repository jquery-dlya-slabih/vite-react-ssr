import { dehydrate, QueryClient } from '@tanstack/react-query';
import { matchPath } from 'react-router';
import { getTopProducts, getPosts, getMainPost, getProducts } from '@/api.ts';
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
  }

  const dehydratedState = dehydrate(queryClient);

  return { queryClient, dehydratedState };
}
