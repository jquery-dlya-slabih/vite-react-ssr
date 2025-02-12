import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';

import { HTML_DIVIDER } from '@/constants';

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
  const location = useLocation();

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
      <img src={footerImage} alt="footer gradient" className="h-6 w-full" />
      <footer className="flex flex-col items-center bg-black px-20 pt-64 pb-20 text-white">
        <div className="text-center text-[30px] font-bold">SUBSCRIBE TO OUR NEWS LETTER</div>
        <input
          type="email"
          placeholder="example@email.com"
          className="mt-12 w-208 border-b-1 border-b-white text-center outline-none placeholder:text-white"
        />
        <button className="mt-34 w-208 border border-white p-12">SUBSCRIBE</button>
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
