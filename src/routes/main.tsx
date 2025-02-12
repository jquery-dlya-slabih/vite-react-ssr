import { lazy, Suspense } from 'react';

const MainPageLazyModule = lazy(() => import('@/pages/main'));

const MainRoute = () => (
  <Suspense>
    <MainPageLazyModule />
  </Suspense>
);

export default MainRoute;
