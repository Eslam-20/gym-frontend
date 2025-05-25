import { useEffect, useState } from "react";
import axios from "axios";

function List({ selectedDay }) {
  const muscleGroups = ["Chest", "Shoulders", "Biceps", "Triceps", "Back", "Legs"];
  const selectedMuscle = muscleGroups[selectedDay];

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view exercises.');
          setExercises([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'http://localhost:5000/api/weightexercises/generateDynamicPlan',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const allData = Array.isArray(response.data.data.plan) ? response.data.data.plan : [];
        const planObj = allData[0] || null;

        if (!planObj || !planObj.plan) {
          setError("No plan data found.");
          setExercises([]);
          setLoading(false);
          return;
        }

        const muscleKey = selectedMuscle.toLowerCase();
        const exercisesForMuscle = planObj.plan[muscleKey] || [];
        const limitedExercises = exercisesForMuscle.slice(0, 3);

        setExercises(limitedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setError('Failed to load exercises. Please try again.');
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [selectedDay]);

  if (error) {
    return (
      <p className="text-center text-red-600 text-xl font-semibold mt-0">{error}</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
      {loading ? (
        <p className="text-center text-2xl font-semibold text-gray-400">Loading...</p>
      ) : !exercises.length ? (
        <p className="text-center text-xl font-semibold text-gray-400">
          No exercises available for this muscle group.
        </p>
      ) : (
        <div className="grid gap-6 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {exercises.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="h-[360px] w-full"> 
                <iframe
                  src={
                    item.videoUrl?.includes("watch?v=")
                      ? item.videoUrl.replace("watch?v=", "embed/")
                      : item.videoUrl
                  }
                  title={item.name}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-red-600 mb-3">{item.name}</h3> 
                <p className="text-gray-700 text-sm mb-1">Weight: {item.weight} kg</p> 
                <p className="text-gray-700 text-sm mb-1">Reps: {item.reps}</p>
                <p className="text-gray-700 text-sm">Sets: {item.sets}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default List;
