import menuIcon from './images/menu.svg';
import searchIcon from './images/search.svg';
import heartIcon from './images/heart.svg';
import profileIcon from './images/profile.svg';
import bagIcon from './images/bag.svg';

export default function Topline() {
  return (
    <div className="flex h-48 items-center justify-between px-20">
      <img src={menuIcon} alt="menu button" className="size-20" />
      <img src={searchIcon} alt="search button" className="size-24" />
      <img src={heartIcon} alt="favorites button" className="h-24 w-29" />
      <img src={profileIcon} alt="profile button" className="size-24" />
      <img src={bagIcon} alt="cart button" className="h-24 w-18" />
    </div>
  );
}
