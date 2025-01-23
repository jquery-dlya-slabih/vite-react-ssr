import { lazy, Suspense } from 'react';

const RecipePageLazyModule = lazy(() => import('@/pages/recipe'));

const RecipeRoute = () => (
  <Suspense>
    <RecipePageLazyModule />
  </Suspense>
);

export default RecipeRoute;
