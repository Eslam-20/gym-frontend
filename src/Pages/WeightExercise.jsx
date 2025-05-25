import { useState } from "react";
import HeroPages from "../components/hero-pages/HeroPages";
import Days from "../components/WeightExercise-page/Days";
import List from "../components/WeightExercise-page/List";

function WeightExercise() {
  const [selectedDay, setSelectedDay] = useState(0); 

  return (
    <main>
      <HeroPages page="WeightExercise" />
      <Days selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <List selectedDay={selectedDay} />
    </main>
  );
}

export default WeightExercise;
