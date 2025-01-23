import { lazy, Suspense } from 'react';

const MainPageLazyModule = lazy(() => import('@/pages/main'));

const NotFoundRoute = () => (
  <Suspense>
    <MainPageLazyModule />
  </Suspense>
);

export default NotFoundRoute;
