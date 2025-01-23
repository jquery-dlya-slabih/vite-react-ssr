import { Route, Routes } from 'react-router';
import routes from '@/routes.tsx';

const Router = () => (
  <Routes>
    {routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}
  </Routes>
);

export default Router;
