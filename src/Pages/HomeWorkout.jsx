import { useState } from "react";
import HeroPages from "../components/hero-pages/HeroPages";

import Listt from "../components/HomeWorkout/Listt";


function HomeWorkout() {
  const [selectedDay, setSelectedDay] = useState(0);
  return (
    <main>
      <HeroPages page="HomeWorkout" />
      
      <Listt selectedDay={selectedDay} />
    </main>
  );
}

export default HomeWorkout;
