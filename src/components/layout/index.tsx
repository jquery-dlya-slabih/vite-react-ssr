import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';

import { checkAuth } from '@/api.ts';
import Authorize from '@/components/authorize';
import { HTML_DIVIDER } from '@/constants';

import BagIcon from './images/bag.svg?react';
import FbIcon from './images/fb.svg?react';
import footerImage from './images/footer.webp';
import gradientImage from './images/gradient.webp';
import HearIcon from './images/heart.svg?react';
import InstIcon from './images/inst.svg?react';
import MenuIcon from './images/menu.svg?react';
import ProfileIcon from './images/profile.svg?react';
import SearchIcon from './images/search.svg?react';
import XIcon from './images/x.svg?react';

export default function Layout() {
  const { data, isError, isPending } = useQuery({
    queryKey: ['me'],
    queryFn: checkAuth,
    retry: 1,
    retryDelay: 3000
  });

  const location = useLocation();
  const [authorizeFormShowed, setAuthorizeFormShowed] = useState(false);

  const themeCookie = Cookies.get('theme');
  const isThemeValid = themeCookie === 'light' || themeCookie === 'dark';
  const [theme, setTheme] = useState<'light' | 'dark'>(isThemeValid ? themeCookie : 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);

  const changeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    Cookies.set('theme', newTheme);
    setTheme(newTheme);
  };

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
      <div className="flex h-48 items-center justify-between px-20 shadow-md dark:shadow-[#fb64b6]/50 lg:justify-end">
        <MenuIcon className="size-20 transition-colors cursor-pointer hover:opacity-70 lg:hidden" />
        <SearchIcon className="size-24 cursor-pointer transition-colors hover:opacity-70" />
        <button className="lg:-order-1 lg:mr-auto cursor-pointer" onClick={changeTheme}>
          <HearIcon className="h-24 w-29 animate-pulse" />
        </button>
        {!isError && !isPending ? (
          <div className="flex lg:ml-16">
            <div>{data.firstName}</div>
            <img src={data.image} className="ml-6 size-24" alt="user avatar" />
          </div>
        ) : (
          <button data-testid="login" type="button" onClick={() => setAuthorizeFormShowed(true)}>
            <ProfileIcon className="size-24 cursor-pointer transition-colors hover:opacity-70 lg:ml-16" />
          </button>
        )}
        <BagIcon className="h-24 w-18 cursor-pointer transition-colors hover:opacity-70 lg:ml-16" />
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
            <FbIcon className="size-24" />
          </a>
          <a href="/">
            <XIcon className="size-24" />
          </a>
          <a href="/">
            <InstIcon className="size-24" />
          </a>
        </div>
      </footer>
    </>
  );
}
