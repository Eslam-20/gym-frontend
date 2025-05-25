import { useState } from "react";
import Days from "../components/WeightExercise-page/Days";
import List from "../components/WeightExercise-page/List";

function WeightExercise() {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <section className="px-6  py-32 bg-gray-50">
      <div className="container mx-auto">
        <Days selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <List selectedDay={selectedDay} />
      </div>
    </section>
  );
}

export default WeightExercise;
