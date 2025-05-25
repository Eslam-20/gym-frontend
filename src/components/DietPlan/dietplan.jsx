import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

export default function Dietplan() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState('Select plan goal');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const options = [
    { value: 'weight_gain', label: 'Weight Gain' },
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'maintain_weight', label: 'Maintain Weight' },
  ];

  const mapGoalToServerValue = (goalValue) => {
    switch (goalValue) {
      case 'weight_gain': return 'weightGain';
      case 'weight_loss': return 'weightLoss';
      case 'maintain_weight': return 'maintainWeight';
      default: return '';
    }
  };

  const fetchPlan = (selectedGoal) => {
    setLoading(true);
    setError('');
    setPlan(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view diet plans.");
      setLoading(false);
      return;
    }

    const bodyData = { dietType: mapGoalToServerValue(selectedGoal) };
    if (!bodyData.dietType) {
      setError("Invalid goal selected.");
      setLoading(false);
      return;
    }

    fetch('http://localhost:5000/api/dietPlans/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPlan(data?.data?.plan || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to load diet plan. Please try again.');
        setPlan(null);
        setLoading(false);
      });
  };

  const handleSelect = (selected) => {
    setGoal(selected);
    fetchPlan(selected);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === goal)?.label || goal;

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
          🍽️ Personalized Diet Plan
        </h1>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left text-gray-800 font-semibold shadow-sm hover:border-blue-400 transition"
          >
            {selectedLabel}
          </button>
          {isOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-xl mt-2 shadow-lg z-20 max-h-48 overflow-auto text-gray-800">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer capitalize transition"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={() => fetchPlan(goal)}
          disabled={!options.some(opt => opt.value === goal) || loading}
          className={`w-full py-3 rounded-xl font-semibold transition duration-300
            ${
              (!options.some(opt => opt.value === goal) || loading)
                ? 'bg-gray-200 cursor-not-allowed text-gray-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            }`}
        >
          {loading ? 'Loading...' : 'Generate Plan'}
        </button>

        {/* Error */}
        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        {/* Plan Result */}
        {plan && !loading && (
          <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-inner text-gray-800">
            <h2 className="text-xl font-bold text-center mb-4 drop-shadow-md">{plan.planName}</h2>
            <p className="text-center mb-2">{plan.planDescription}</p>
            <p className="text-center italic mb-4 text-gray-500 text-sm">
              Duration: {plan.planDuration} days | Goal: {plan.planGoal}
            </p>

            <div className="bg-gray-100 p-6 rounded-xl space-y-3 border border-gray-200 shadow-inner">
              <p><strong>🍳 Breakfast:</strong> {plan.mealPlan.breakfast} <span className="text-gray-500 font-semibold">({plan.calorieData.breakfast} kcal)</span></p>
              <p><strong>🥗 Lunch:</strong> {plan.mealPlan.lunch} <span className="text-gray-500 font-semibold">({plan.calorieData.lunch} kcal)</span></p>
              <p><strong>🍲 Dinner:</strong> {plan.mealPlan.dinner} <span className="text-gray-500 font-semibold">({plan.calorieData.dinner} kcal)</span></p>
              <p><strong>🍎 Snacks:</strong> {plan.mealPlan.snacks} <span className="text-gray-500 font-semibold">({plan.calorieData.snacks} kcal)</span></p>
              <p className="text-right font-semibold text-blue-600 text-lg mt-4">🔥 Total Calories: {plan.calorieData.total} kcal</p>
            </div>
          </div>
        )}

        {/* No Data Message */}
        {!loading && !plan && !error && options.some(opt => opt.value === goal) && (
          <p className="text-center text-gray-500 text-lg font-semibold">
            No diet plan data found.
          </p>
        )}
      </div>
    </div>
  );
}
