import Main from '@/routes/main.tsx';
import NotFound from '@/routes/notFound.tsx';

export enum PATH {
  MAIN = '/',
  NOT_FOUND = '*'
}

export default [
  {
    path: PATH.MAIN,
    element: <Main />
  },
  {
    path: PATH.NOT_FOUND,
    element: <NotFound />
  }
];
