import { Route, Routes } from 'react-router';
import About from '@/routes/about.tsx';
import NotFound from '@/routes/notFound.tsx';
import Main from '@/routes/main.tsx';

const Router = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;
