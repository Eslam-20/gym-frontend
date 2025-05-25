import HeroPages from "../components/hero-pages/HeroPages";
import History from "../components/about-page/history/History";
import WhoWeAre from "../components/WhoWeAre/WhoWeAre";

function About() {
  return (
    <main>
      
      <HeroPages page="About" />
      <WhoWeAre/>
      <History />
    </main>
  );
}

export default About;
