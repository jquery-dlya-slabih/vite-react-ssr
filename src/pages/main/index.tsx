import BestSellers from './bestSellers';
import Blog from './blog';
import Post from './post';
import Products from './products';
import PromoSlider from './promoSlider';

function Main() {
  return (
    <>
      <title>Goods and blog</title>
      <meta name="description" content="Goods and blog" />
      <PromoSlider />
      <h2 className="px-20 pt-25 text-center text-[32px] font-bold tracking-[8px]">touché choice</h2>
      <div className="flex flex-col lg:mx-20 lg:flex-row">
        <Post />
        <BestSellers />
      </div>
      <Blog />
      <Products />
    </>
  );
}

export default Main;
