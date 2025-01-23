import { lazy, Suspense } from 'react';

const NotFoundPageLazyModule = lazy(() => import('@/pages/notFound'));

const NotFoundRoute = () => (
  <Suspense>
    <NotFoundPageLazyModule />
  </Suspense>
);

export default NotFoundRoute;
