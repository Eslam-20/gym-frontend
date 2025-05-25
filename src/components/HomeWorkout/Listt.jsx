import { useEffect, useState } from "react";
import axios from "axios";

function Listt() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view exercises.");
          setExercises([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/homeworkouts/generatePlan-dynamic",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const allExercises = Array.isArray(response.data.data?.workout?.exercises)
          ? response.data.data.workout.exercises
          : [];

        setExercises(allExercises);
      } catch (error) {
        setError("Failed to load exercises. Please try again.");
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (error) {
    return (<>
      
      <p className="text-center text-red-700 text-lg font-semibold my-0">
        {error}
      </p>
      </>
    );
  }

  return (
    <>
    <h1 className="text-center text-4xl font-extrabold text-red-600 mb-5 mt-6"> Your Exercises:</h1>
    <div className=" bg-white py-14 px-6 max-w-7xl mx-auto">
      {loading ? (
        <p className="text-center text-gray-500 text-xl font-semibold">Loading...</p>
      ) : !exercises.length ? (
        <p className="text-center text-gray-400 text-lg font-medium">
          No exercises available.
        </p>
      ) : (
        <div className="flex justify-between gap-2" style={{ maxWidth: "100%" }}>
          {exercises.slice(0, 3).map((item, i) => (
            <div
              key={item._id || i}
              className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-400 cursor-pointer overflow-hidden flex-shrink-0"
              style={{ width: "32%", display: "flex", flexDirection: "column" }}
            >
              <div className="w-full" style={{ flex: "0 0 auto" }}>
                <img
                  src={item.gifUrl}
                  alt={item.name}
                  className="w-full"
                  style={{ maxHeight: "260px", objectFit: "contain" }}
                  loading="lazy"
                />
              </div>
              <div className="p-6 text-center" style={{ flex: "1 1 auto" }}>
                <h3 className="text-2xl font-semibold text-red-600 mb-3 tracking-wide">
                  {item.name}
                </h3>
                <p className="text-gray-700 text-md mb-1">
                  <span className="font-medium">Reps:</span> {item.reps}
                </p>
                <p className="text-gray-700 text-md">
                  <span className="font-medium">Sets:</span> {item.sets}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>);
}

export default Listt;
