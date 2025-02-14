import { NavLink, Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { HTML_DIVIDER } from '@/constants';
import Authorize from '@/components/authorize';
import { checkAuth } from '@/api.ts';

import menuIcon from './images/menu.svg';
import searchIcon from './images/search.svg';
import heartIcon from './images/heart.svg';
import profileIcon from './images/profile.svg';
import bagIcon from './images/bag.svg';
import gradientImage from './images/gradient.webp';
import footerImage from './images/footer.webp';
import fbIcon from './images/fb.svg';
import instIcon from './images/inst.svg';
import xIcon from './images/x.svg';

export default function Layout() {
  const { data, isError, isPending } = useQuery({
    queryKey: ['me'],
    queryFn: checkAuth,
    retry: 1,
    retryDelay: 3000
  });

  const location = useLocation();
  const [authorizeFormShowed, setAuthorizeFormShowed] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);

  return (
    <>
      {import.meta.env.SSR && HTML_DIVIDER}
      {authorizeFormShowed && <Authorize closeForm={() => setAuthorizeFormShowed(false)} />}
      <img src={gradientImage} alt="gradient" className="h-48 w-full" />
      <div className="absolute top-0 h-48 w-full px-20 pt-7 text-[11px] lg:px-40 lg:py-6">
        <div className="grid grid-cols-2 tracking-[1px] lg:flex lg:h-full lg:items-center lg:text-[14px]">
          <div>
            Delivery within <b>48</b> hours
          </div>
          <div className="text-end lg:ml-16">
            <b>2</b> gift samples
          </div>
          <div className="lg:ml-16">
            Free delivery from <b>19</b> euros
          </div>
          <NavLink
            to="tracking"
            className="text-end font-bold uppercase underline underline-offset-2 transition-colors hover:opacity-70 lg:ml-auto lg:cursor-pointer"
          >
            order tracking
          </NavLink>
        </div>
      </div>
      <div className="flex h-48 items-center justify-between px-20 shadow-md lg:justify-end">
        <img src={menuIcon} alt="menu button" className="size-20 transition-colors hover:opacity-70 lg:hidden" />
        <img
          src={searchIcon}
          alt="search button"
          className="size-24 cursor-pointer transition-colors hover:opacity-70"
        />
        <img src={heartIcon} alt="favorites button" className="h-24 w-29 lg:-order-1 lg:mr-auto" />
        {!isError && !isPending ? (
          <div className="flex lg:ml-16">
            <div>{data.firstName}</div>
            <img src={data.image} className="ml-6 size-24" alt="user avatar" />
          </div>
        ) : (
          <img
            onClick={() => setAuthorizeFormShowed(true)}
            src={profileIcon}
            alt="profile button"
            className="size-24 cursor-pointer transition-colors hover:opacity-70 lg:ml-16"
          />
        )}
        <img
          src={bagIcon}
          alt="cart button"
          className="h-24 w-18 cursor-pointer transition-colors hover:opacity-70 lg:ml-16"
        />
      </div>
      <div className="relative flex flex-col items-center">
        <div className="flex max-w-[1200px] flex-col">
          <Outlet />
        </div>
      </div>
      <img src={footerImage} alt="footer gradient" className="h-6 w-full" />
      <footer className="flex flex-col items-center bg-black px-20 pt-64 pb-20 text-white">
        <div className="text-center text-[30px] font-bold">SUBSCRIBE TO OUR NEWS LETTER</div>
        <input
          type="email"
          placeholder="example@email.com"
          className="mt-12 w-208 border-b-1 border-b-white p-5 text-center outline-none placeholder:text-white/70"
        />
        <button className="mt-34 w-208 cursor-pointer border border-white p-12 transition-opacity hover:opacity-80 active:opacity-70">
          SUBSCRIBE
        </button>
        <h3 className="mt-64 text-[18px] leading-32 font-bold uppercase">Terms and privacy</h3>
        <a className="leading-32 uppercase" href="/">
          Privacy Policy
        </a>
        <a className="leading-32 uppercase" href="/">
          Terms and Conditions
        </a>
        <a className="leading-32 uppercase" href="/">
          Ads based on interests
        </a>
        <a className="leading-32 uppercase" href="/">
          Accessibility
        </a>
        <a className="leading-32 uppercase" href="/">
          cookies
        </a>
        <div className="mt-60 flex w-200 justify-between pb-20">
          <a href="/">
            <img className="size-24" src={fbIcon} alt="fb link" />
          </a>
          <a href="/">
            <img className="size-24" src={xIcon} alt="x link" />
          </a>
          <a href="/">
            <img className="size-24" src={instIcon} alt="inst link" />
          </a>
        </div>
      </footer>
    </>
  );
}
