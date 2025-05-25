import { useState } from 'react';
import axios from 'axios';

export default function AdminDetails() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [singleUser, setSingleUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getToken = () => localStorage.getItem('token');

  const fetchAllUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = getToken();
      if (!token) {
        setError('No token found. Please log in first.');
        setLoading(false);
        return;
      }

      const res = await axios.get('http://localhost:5000/api/admins/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.data || res.data);
      setSingleUser(null);
    } catch (err) {
      console.error('fetchAllUsers error:', err);
      setError('Error fetching users.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async () => {
    const trimmedId = userId.trim();
    if (!trimmedId) {
      setError('Please enter a valid user ID.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const token = getToken();
      if (!token) {
        setError('No token found. Please log in first.');
        setLoading(false);
        return;
      }

      const res = await axios.post(
        'http://localhost:5000/api/admins/user',
        { userId: trimmedId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSingleUser(res.data.data);
      setUsers([]);
    } catch (err) {
      console.error('fetchUserById error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'User not found.');
    } finally {
      setLoading(false);
    }
  };

  const renderUserCard = (user) => (
    <div
      key={user._id}
      className="bg-white bg-opacity-95 border border-gray-300 rounded-xl p-7 shadow-xl space-y-3 mb-10 max-w-md mx-auto"
    >
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Gender:</strong> {user.gender}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
      <p>
        <strong>Weight:</strong> {user.weight} kg
      </p>
      <p>
        <strong>Height:</strong> {user.height} cm
      </p>
      <p>
        <strong>Activity Level:</strong> {user.activityLevel}
      </p>
      {user.healthMetrics && (
        <>
          <p>
            <strong>BMR:</strong> {user.healthMetrics.bmr}
          </p>
          <p>
            <strong>Sugar:</strong> {user.healthMetrics.sugar}
          </p>
          <p>
            <strong>Protein:</strong> {user.healthMetrics.protein}
          </p>
          <p>
            <strong>Suggested Goal:</strong> {user.healthMetrics.suggestedGoal}
          </p>
        </>
      )}
    </div>
  );

  const Spinner = () => (
    <div className="flex justify-center items-center py-8">
      <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1558611848-73f7eb4001e7?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/60"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16 flex-grow flex flex-col space-y-12">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <button
              onClick={fetchAllUsers}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl shadow-lg font-semibold transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              Get All Users
            </button>

            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border border-gray-300 px-5 py-3 rounded-xl shadow-lg w-72 focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-60"
              disabled={loading}
            />

            <button
              onClick={fetchUserById}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-lg font-semibold transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              Get User by ID
            </button>
          </div>

          {loading && <Spinner />}
          {error && (
            <p className="text-red-400 text-center text-lg font-semibold max-w-xl drop-shadow-lg">
              {error}
            </p>
          )}
        </div>

        {singleUser && (
          <div>
            <h3 className="text-4xl font-bold mb-6 text-white drop-shadow-lg text-center">
              User Details
            </h3>
            {renderUserCard(singleUser)}
          </div>
        )}

        {users.length > 0 && (
          <div>
            <h3 className="text-4xl font-bold mb-6 text-white drop-shadow-lg text-center">
              All Users
            </h3>
            <div className="flex flex-wrap justify-center gap-10">{users.map(renderUserCard)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
