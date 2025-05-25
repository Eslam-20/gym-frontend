import { useState } from "react";

import Listt from "../components/HomeWorkout/Listt";

function HomeWorkout() {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <section className="px-0  py-0 bg-gray-50">
      <div className="container mx-auto">
        
        <Listt selectedDay={selectedDay} />
      </div>
    </section>
  );
}

export default HomeWorkout;
