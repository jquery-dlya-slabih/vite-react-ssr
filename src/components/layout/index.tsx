import { Outlet } from 'react-router';

import { HTML_DIVIDER } from '@/constants';

import menuIcon from './images/menu.svg';
import searchIcon from './images/search.svg';
import heartIcon from './images/heart.svg';
import profileIcon from './images/profile.svg';
import bagIcon from './images/bag.svg';
import gradientImage from './images/gradient.webp';

export default function Layout() {
  return (
    <>
      {import.meta.env.SSR && HTML_DIVIDER}
      <img src={gradientImage} alt="gradient" className="h-48 w-full" />
      <div className="absolute top-0 h-48 w-full px-20 pt-7 text-[11px]">
        <div className="grid grid-cols-2 tracking-[1px]">
          <div>
            Delivery within <b>48</b> hours
          </div>
          <div className="text-end">
            <b>2</b> gift samples
          </div>
          <div>
            Free delivery from <b>19</b> euros
          </div>
          <div className="text-end font-bold uppercase underline underline-offset-2">order tracking</div>
        </div>
      </div>
      <div className="flex h-48 items-center justify-between px-20">
        <img src={menuIcon} alt="menu button" className="size-20" />
        <img src={searchIcon} alt="search button" className="size-24" />
        <img src={heartIcon} alt="favorites button" className="h-24 w-29" />
        <img src={profileIcon} alt="profile button" className="size-24" />
        <img src={bagIcon} alt="cart button" className="h-24 w-18" />
      </div>
      <Outlet />
      <footer className="mt-80 bg-black pb-300 text-white">2025</footer>
    </>
  );
}
