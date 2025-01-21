import { lazy, Suspense } from 'react';

const MainPageLazyModule = lazy(() => import('@/pages/main'));

const NotFoundRoute = () => (
  <Suspense fallback={'loading...'}>
    <MainPageLazyModule />
  </Suspense>
);

export default NotFoundRoute;
