import FullSlider from '@components/FullSlider';
import PagesService from '@app/services/PagesService';

const getData = () => PagesService.getHomePage();

const Home = async () => {
  const { page } = (await getData()) || {};
  const sliderDesktop = page?.slider?.sliderDesktop;
  const sliderMobile = page?.slider?.sliderMobile;

  return (
    <main className="w-full h-full">
      {sliderDesktop && (
        <FullSlider gallery={sliderDesktop} displayOrientation="landscape" />
      )}

      {sliderMobile && (
        <FullSlider gallery={sliderMobile} displayOrientation="portrait" />
      )}
    </main>
  );
};

export default Home;
