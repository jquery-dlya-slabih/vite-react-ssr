import { lazy, Suspense } from 'react';

const PostPageLazyModule = lazy(() => import('@/pages/post'));

const PostRoute = () => (
  <Suspense>
    <PostPageLazyModule />
  </Suspense>
);

export default PostRoute;
