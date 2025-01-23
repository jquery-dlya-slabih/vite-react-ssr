import { lazy, Suspense } from 'react';

const RecipesPageLazyModule = lazy(() => import('@/pages/recipes'));

const RecipesRoute = () => (
  <Suspense>
    <RecipesPageLazyModule />
  </Suspense>
);

export default RecipesRoute;
