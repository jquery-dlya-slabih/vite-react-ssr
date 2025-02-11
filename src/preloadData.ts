import { dehydrate, QueryClient } from '@tanstack/react-query';
import { matchPath } from 'react-router';
import { getRecipes, getRecipe, getProducts, getPosts, getMainPost } from '@/api.ts';
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
      queryClient.prefetchQuery({ queryKey: ['main_post'], queryFn: getMainPost }),
      queryClient.prefetchQuery({ queryKey: ['products'], queryFn: getProducts })
    ]);
  }

  if (currentRoute?.pattern.path === PATH.RECIPES) {
    await queryClient.prefetchQuery({ queryKey: ['recipes'], queryFn: getRecipes });
  }

  if (currentRoute?.pattern.path === PATH.RECIPE) {
    const { id } = currentRoute.params;

    if (id) {
      await queryClient.prefetchQuery({ queryKey: ['recipe/' + id], queryFn: () => getRecipe(id) });
    }
  }

  const dehydratedState = dehydrate(queryClient);

  return { queryClient, dehydratedState };
}
