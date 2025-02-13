import { lazy, Suspense } from 'react';

const ProductPageLazyModule = lazy(() => import('@/pages/product'));

const ProductRoute = () => (
  <Suspense>
    <ProductPageLazyModule />
  </Suspense>
);

export default ProductRoute;
