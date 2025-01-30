import Topline from './topline';
import PromoSlider from './promoSlider';

import gradientImage from './images/gradient.webp';

function Main() {
  return (
    <>
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
      <Topline />
      <PromoSlider />
    </>
  );
}

export default Main;
