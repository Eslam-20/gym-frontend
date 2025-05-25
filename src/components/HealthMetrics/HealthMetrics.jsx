import { useState } from 'react';
import axios from 'axios';

export default function HealthMetrics() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Choose activity level');
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const options = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

  const handleSubmit = async () => {
    if (!options.includes(selected)) {
      setError('Please select a valid activity level.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to submit.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/healthMetrics/calculate',
        { activityLevel: selected },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMetrics({
        ...response.data.data.healthMetrics,
        age: response.data.data.age,
        email: response.data.data.email,
        gender: response.data.data.gender,
        height: response.data.data.height,
        activityLevel: selected,
      });
    } catch (err) {
      console.error('Error!', err.response || err.message);
      setMetrics(null);
      setError('There was an error fetching the metrics.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-5"></div>

      <div className="relative w-full max-w-2xl bg-white bg-opacity-25 rounded-3xl p-8 space-y-8 shadow-2xl z-10 text-gray-900">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 drop-shadow-lg">
          🎯 Calculate Health Metrics
        </h1>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left text-gray-800 font-semibold shadow-sm hover:border-blue-400 transition"
          >
            {selected.replace('_', ' ')}
          </button>
          {isOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-xl mt-2 shadow-lg z-20 max-h-48 overflow-auto text-gray-800">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                    setMetrics(null);
                    setError('');
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer capitalize transition"
                >
                  {option.replace('_', ' ')}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!options.includes(selected) || loading}
          className={`w-full py-3 rounded-xl font-semibold transition duration-300
            ${
              (!options.includes(selected) || loading)
                ? 'bg-gray-200 cursor-not-allowed text-gray-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            }`}
        >
          {loading ? 'Submitting...' : 'Calculate'}
        </button>

        {/* Error */}
        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        {/* Metrics Result */}
        {metrics && (
          <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-inner text-gray-800">
            <h2 className="text-xl font-bold text-center mb-4 drop-shadow-md">🩺 Health Metrics:</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <MetricItem label="Activity Level" value={metrics.activityLevel} />
              <MetricItem label="Age" value={metrics.age} />
              <MetricItem label="Gender" value={metrics.gender} />
              <MetricItem label="Height (cm)" value={metrics.height} />
              <MetricItem label="BMR" value={metrics.bmr} />
              <MetricItem label="BMI" value={metrics.bmi} />
              <MetricItem label="Calories" value={metrics.maintenanceCalories} />
              <MetricItem label="Carbs (g)" value={metrics.carbPerGram} />
              <MetricItem label="Carbs per Cal" value={metrics.carbPerCal} />
              <MetricItem label="Protein (g)" value={metrics.protein} />
              <MetricItem label="Sugar (g)" value={metrics.sugar} />
              <MetricItem label="BFP" value={metrics.bfp} />
              <MetricItem label="Suggested Goal" value={metrics.suggestedGoal} />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const MetricItem = ({ label, value }) => (
  <li className="bg-gray-100 border border-gray-300 rounded-xl p-4 shadow-md flex flex-col text-gray-800">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </li>
);
