import { Route, Routes } from 'react-router';
import routes from '@/routes.tsx';
import Layout from '@/components/layout';

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
