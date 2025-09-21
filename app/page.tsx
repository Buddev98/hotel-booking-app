import Hero from '@/components/home/hero';
import FeaturedHotels from '@/components/home/featured-hotels';
import SearchSection from '@/components/home/search-section';
import Testimonials from '@/components/home/testimonials';
import DestinationGuide from '@/components/home/destination-guide';
import AppPromo from '@/components/home/app-promo';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <SearchSection />
      <FeaturedHotels />
      <DestinationGuide />
      <Testimonials />
      <AppPromo />
    </div>
  );
}
