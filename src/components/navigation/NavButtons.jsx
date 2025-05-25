import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";

const btnStyles = `hover:text-red text-white transition-colors duration-300 focus`;

function NavButtons({ onToggleNav }) {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();


  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(!!localStorage.getItem('token'));
    };


    window.addEventListener('storage', handleStorageChange);


    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    window.dispatchEvent(new Event("storage"));
    navigate('/Signin');
  };

  return (
    <div className="flex items-center justify-between gap-7">
      <button className={`3xl:hidden ${btnStyles}`} onClick={onToggleNav}>
        <FaBars className="h-6 w-6" />
      </button>

      {isAuth ? (
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-2 bg-red-500 rounded-md shadow-sm hover:bg-red-600 transition-all duration-200 text-white text-xs font-semibold uppercase"
        >
          Logout
        </button>
      ) : (
        <div className="flex items-center gap-2 p-2 bg-white rounded-md border border-gray-300">

          <Link
            to="/Signup"
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 transition-all duration-200 text-white text-xs font-semibold uppercase"
          >
            <FaPlus className="h-4 w-4 bg-white text-blue-500 rounded-full p-0.5" />
            Register
          </Link>


          <Link
            to="/Signin"
            className="flex items-center gap-1.5 px-3 py-2 bg-green-500 rounded-md shadow-sm hover:bg-green-600 transition-all duration-200 text-white text-xs font-semibold uppercase"
          >
            <FaPlus className="h-4 w-4 bg-white text-green-500 rounded-full p-0.5" />
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavButtons;
