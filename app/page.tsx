import { getHomePage } from '@services/PagesService';
import FullSlider from './components/FullSlider';

const getDAta = () => getHomePage();

const Home = async () => {
  const { page } = (await getDAta()) || {};
  const sliderDesktop = page?.slider?.sliderDesktop;
  const sliderMobile = page?.slider?.sliderMobile;

  return (
    <main className="w-full h-full">
      {sliderDesktop && (
        <div className="slider h-full portrait:hidden">
          {sliderDesktop && <FullSlider gallery={sliderDesktop} />}
        </div>
      )}
      {sliderMobile && (
        <div className="slider h-full landscape:hidden">
          {sliderMobile && <FullSlider gallery={sliderMobile} />}
        </div>
      )}
    </main>
  );
};

export default Home;
