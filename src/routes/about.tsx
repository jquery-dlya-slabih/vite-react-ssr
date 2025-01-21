import { lazy, Suspense } from 'react';

const AboutPageLazyModule = lazy(() => import('@/pages/about'));

const AboutRoute = () => (
  <Suspense fallback={'loading...'}>
    <AboutPageLazyModule />
  </Suspense>
);

export default AboutRoute;
