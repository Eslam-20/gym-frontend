import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navigation/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import WeightExercise from "./Pages/WeightExercise";
import Pricing from "./Pages/Pricing";
import HomeWorkout from "./Pages/HomeWorkout";
import ScrollToTop from "./components/ScrollToTop";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Footer from './components/footer/Footer';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HealthMetricss from "./Pages/HealthMetrics";
import AdminDetails from './components/Admin/AdminDetails';
import UserDetails from './components/User/UserDetails';
import Dietplan from './components/DietPlan/dietplan';





function App() {
  return (
    <>
      <NavBar />
      
      <Routes>
  <Route index element={<Signup />} />
  <Route path="/Home" element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  } />
  <Route path="/Signin" element={<Signin />} />
  <Route path="/Signup" element={<Signup />} />
  <Route path="/about" element={
    <ProtectedRoute>
      <About />
    </ProtectedRoute>
  } />
  <Route path="/WeightExercise" element={
    <ProtectedRoute>
      <WeightExercise />
    </ProtectedRoute>
  } />
  <Route path="/admin-details" element={
    <ProtectedRoute>
      <AdminDetails />
    </ProtectedRoute>
  } />
  <Route path="user-details" element={
    <ProtectedRoute>
      <UserDetails />
    </ProtectedRoute>
  } />
  <Route path="dietPlan" element={
    <ProtectedRoute>
      <Dietplan />
    </ProtectedRoute>
  } />
  <Route path="/HealthMetrics" element={
    <ProtectedRoute>
      <HealthMetricss />
    </ProtectedRoute>
  } />
  <Route path="/pricing" element={
    <ProtectedRoute>
      <Pricing />
    </ProtectedRoute>
  } />
  <Route path="/HomeWorkout" element={
    <ProtectedRoute>
      <HomeWorkout />
    </ProtectedRoute>
  } />
</Routes>

<ScrollToTop />
<Footer/>
    </>
  );
}
export default App;