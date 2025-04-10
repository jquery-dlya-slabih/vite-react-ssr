import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import desktopLayerImage from './images/desktopLayer.webp';
import layerImage from './images/layer.webp';

function NotFound() {
  const [media, setMedia] = useState('mobile');

  useEffect(() => {
    const { matches } = matchMedia('(width >= 1024px)');
    setMedia(matches ? 'desktop' : 'mobile');
  }, []);

  return (
    <>
      <title>404 Not Found</title>
      <meta name="description" content="404 Not Found" />
      <div className="relative h-[100dvh] w-[100vw] lg:static lg:h-[60vh] lg:w-full">
        {media === 'mobile' ? (
          <img className="absolute -z-1 h-full w-full object-fill" src={layerImage} alt="background" />
        ) : (
          <img
            className="absolute top-0 left-0 -z-1 h-full w-full object-fill"
            src={desktopLayerImage}
            alt="background"
          />
        )}
        <div className="flex flex-col items-center p-16">
          <h1 className="mt-64 text-[36px] font-bold">404</h1>
          <div className="mt-6">Ooops page not found</div>
          <NavLink className="custom-button mt-24" to="/">
            To main page
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default NotFound;
