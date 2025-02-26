import { Route, Routes } from 'react-router';

import Layout from '@/components/layout';
import routes from '@/routes.tsx';

const Router = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {routes.map((route) => {
        if (route.path === '/') {
          return <Route key={route.path} index element={route.element} />;
        }

        return <Route key={route.path} path={route.path} element={route.element} />;
      })}
    </Route>
  </Routes>
);

export default Router;
