import { NavLink } from 'react-router';
import layerImage from './images/layer.webp';

function NotFound() {
  return (
    <>
      <title>404 Not Found</title>
      <div className="relative h-[100dvh]">
        <img className="o absolute -z-1 h-full w-full object-fill" src={layerImage} alt="background" />
        <div className="flex flex-col items-center">
          <h1 className="mt-64 text-[36px] font-bold">404</h1>
          <div className="mt-6">Ooops page not found</div>
          <NavLink className="mt-24 w-204 border border-black p-10 text-center uppercase" to="/">
            To main page...
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default NotFound;
