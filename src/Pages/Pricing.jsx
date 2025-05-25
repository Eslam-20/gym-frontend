import HeroPages from "../components/hero-pages/HeroPages";
import PricingCards from "../components/pricing/PricingCards";
import WhoWeAre from './../components/WhoWeAre/WhoWeAre';

function Pricing() {
  return (
    <main>
      <HeroPages page="Pricing" />
      <PricingCards />
      <WhoWeAre/>
      
    </main>
  );
}
export default Pricing;
