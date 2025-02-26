import Main from '@/routes/main.tsx';
import NotFound from '@/routes/notFound.tsx';
import Post from '@/routes/post.tsx';
import Product from '@/routes/product.tsx';

export enum PATH {
  MAIN = '/',
  POST = '/posts/:id',
  PRODUCT = '/products/:id',
  NOT_FOUND = '*'
}

export default [
  {
    path: PATH.MAIN,
    element: <Main />
  },
  {
    path: PATH.POST,
    element: <Post />
  },
  {
    path: PATH.PRODUCT,
    element: <Product />
  },
  {
    path: PATH.NOT_FOUND,
    element: <NotFound />
  }
];
