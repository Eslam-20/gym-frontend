import Hero from "../components/hero/Hero";
WhoWeAre
import FeaturedClass from "../components/featured-class/FeaturedClass";
import CallToAction from "../components/call-to-action/CallToAction";
import ChooseUs from "../components/choose-us/ChooseUs";
import PricingCards from "../components/pricing/PricingCards";
import CallToAction2 from "../components/call-to-action2/CallToAction2";
import WhoWeAre from './../components/WhoWeAre/WhoWeAre';

function Home() {
  return (
    <main>
      <Hero />
      <WhoWeAre/>
      <FeaturedClass />
      
      <CallToAction />
      <ChooseUs />
      <PricingCards />
      <CallToAction2 />
    </main>
  );
}

export default Home;
