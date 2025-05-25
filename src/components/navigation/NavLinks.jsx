import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const linkStyles = "hover:text-red focus:text-red focus";

function NavLinks({ onToggleNav, styles }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // الحالة لتخزين نوع المستخدم

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    setIsLoggedIn(!!token);
    setRole(userRole);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole");
      setIsLoggedIn(!!token);
      setRole(userRole);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!isLoggedIn) return null;

  return (
    <ul className={styles}>
      <li>
        <Link to="/Home" className={linkStyles} onClick={onToggleNav}>
          Home
        </Link>
      </li>

      {role === "admin" ? (
        <>
          <li>
            <Link to="/admin-details" className={linkStyles} onClick={onToggleNav}>
              Admin Details
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/HealthMetrics" className={linkStyles} onClick={onToggleNav}>
              HealthMetrics
            </Link>
          </li>
          <li>
            <Link to="/HomeWorkout" className={linkStyles} onClick={onToggleNav}>
              Home-Workout
            </Link>
          </li>
          <li>
            <Link to="/WeightExercise" className={linkStyles} onClick={onToggleNav}>
              Weight-Exercise
            </Link>
          </li>
          <li>
            <Link to="/dietPlan" className={linkStyles} onClick={onToggleNav}>
              Diet Plan
            </Link>
          </li>
        </>
      )}

      <li>
        <Link to="/about" className={linkStyles} onClick={onToggleNav}>
          About
        </Link>
      </li>
    </ul>
  );
}

export default NavLinks;
