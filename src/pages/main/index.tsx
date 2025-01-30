import Topline from './topline';
import PromoSlider from './promoSlider';
import Post from './post';
import BestSellers from './bestSellers';

function Main() {
  return (
    <>
      <Topline />
      <PromoSlider />
      <Post />
      <BestSellers />
      <div className="mt-80 bg-black pb-300" />
    </>
  );
}

export default Main;
