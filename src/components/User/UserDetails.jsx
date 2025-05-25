import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/me/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const uniqueExercises = (exercises) => {
    const seen = new Set();
    return exercises.filter(ex => {
      if (seen.has(ex.name)) return false;
      seen.add(ex.name);
      return true;
    });
  };

  const uniqueWorkoutPlans = (plans) => {
    const seen = new Set();
    return plans.filter(plan => {
      const key = `${plan.goal}-${plan.level}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-x-blue-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userData) {
    return <p className="p-6 text-center text-red-600">No user data found.</p>;
  }

  const uniqueHomeWorkouts = uniqueWorkoutPlans(userData.homeWorkouts || []);
  const uniqueWeightExercises = uniqueWorkoutPlans(userData.weightExercises || []);

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white shadow-xl rounded-2xl space-y-10">
      <h2 className="text-4xl font-bold text-center text-gray-700">👤 User Profile</h2>

      {/* Basic Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <Info label="Name" value={userData.name} />
        <Info label="Email" value={userData.email} />
        <Info label="Gender" value={userData.gender} />
        <Info label="Age" value={userData.age} />
        <Info label="Weight" value={userData.weight ? `${userData.weight} kg` : 'N/A'} />
        <Info label="Height" value={userData.height ? `${userData.height} cm` : 'N/A'} />
        <Info label="Role" value={userData.role} />
      </section>

      {/* Health Metrics */}
      <Divider title="🩺 Health Metrics" />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        {Object.entries(userData.healthMetrics || {}).map(([key, val]) => (
          <Info key={key} label={capitalize(key)} value={val} />
        ))}
      </section>

      {/* Diet Plans */}
      <Divider title="🍽️ Diet Plans" />
      {userData.dietPlans?.length ? (
        userData.dietPlans.map((plan) => (
          <Card key={plan._id} title={`🥗 ${plan.planName}`}>
            <Info label="Goal" value={plan.planGoal} />
            <Info label="Description" value={plan.planDescription} />
            <Info label="Calories Total" value={plan.calorieData?.total} />
            <div>
              <p className="font-medium text-orange-600">🍱 Meals:</p>
              <ul className="list-disc ml-6 mt-1 text-sm text-gray-700 bg-orange-50 p-3 rounded-lg shadow-sm">
                {Object.entries(plan.mealPlan || {}).map(([meal, desc]) => (
                  <li key={meal}><strong>{meal}:</strong> {desc}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))
      ) : <p className="text-red-500">No diet plans available.</p>}

      {/* Home Workouts */}
      <Divider title="🏋️ Home Workouts" />
      {uniqueHomeWorkouts.length ? (
        uniqueHomeWorkouts.map((workout) => {
          const exercises = uniqueExercises(workout.exercises || []);
          return (
            <Card key={workout._id} title={`💪 ${workout.name || 'Workout Plan'}`}>
              <ul className="list-disc ml-6 text-sm text-gray-700 space-y-2">
                {exercises.map((ex, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">{ex.name}</span> — {ex.sets} sets × {ex.reps} reps
                    {ex.gifUrl && (
                      <img src={ex.gifUrl} alt={ex.name} className="inline-block w-10 h-10 ml-3 rounded-full border shadow" />
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })
      ) : <p className="text-red-500">No home workouts available.</p>}

      {/* Weight Exercises */}
      <Divider title="🏋️‍♂️ Weight Exercises" />
      {uniqueWeightExercises.length ? (
        uniqueWeightExercises.map((plan) => (
          <Card key={`${plan.goal}-${plan.level}`} title={`🎯 Goal: ${plan.goal}, Level: ${plan.level}`}>
            {Object.entries(plan.plan || {}).map(([muscle, exercises]) => {
              const uniqueMuscleExercises = uniqueExercises(exercises);
              return (
                <div key={muscle} className="mb-3">
                  <p className="font-semibold text-emerald-600">{capitalize(muscle)}</p>
                  <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                    {uniqueMuscleExercises.map((ex, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{ex.name}</span> — {ex.sets} × {ex.reps}, Weight: {ex.weight} kg
                        {ex.videoUrl && (
                          <a href={ex.videoUrl} target="_blank" rel="noreferrer" className="ml-2 text-blue-600 underline">🎥 Watch</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </Card>
        ))
      ) : <p className="text-red-500">No weight exercises available.</p>}
    </div>
  );
}

const Info = ({ label, value }) => (
  <p><strong className="text-gray-600">{label}:</strong> {value || 'N/A'}</p>
);

const Card = ({ title, children }) => (
  <div className="p-4 bg-gray-50 rounded-lg shadow-sm space-y-2 border">
    {title && <h4 className="font-semibold text-lg text-gray-700 mb-1">{title}</h4>}
    {children}
  </div>
);

const Divider = ({ title }) => (
  <div className="border-t pt-6 mt-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
  </div>
);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
