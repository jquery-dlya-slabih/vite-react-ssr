import Main from '@/routes/main.tsx';
import Post from '@/routes/post.tsx';
import NotFound from '@/routes/notFound.tsx';

export enum PATH {
  MAIN = '/',
  POST = '/posts/:id',
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
    path: PATH.NOT_FOUND,
    element: <NotFound />
  }
];
