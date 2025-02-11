import Topline from './topline';
import PromoSlider from './promoSlider';
import Post from './post';
import BestSellers from './bestSellers';
import Blog from './blog';
import Products from './products';

function Main() {
  return (
    <>
      <Topline />
      <PromoSlider />
      <Post />
      <BestSellers />
      <Blog />
      <Products />
      <div className="mt-80 bg-black pb-300" />
    </>
  );
}

export default Main;
