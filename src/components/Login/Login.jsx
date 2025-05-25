import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            if (data.role) {
              localStorage.setItem('userRole', data.role);
            }
            Swal.fire({
              title: 'Success!',
              text: 'You have signed in successfully!',
              icon: 'success',
              confirmButtonColor: '#2563eb',
              background: '#ffffff',
              color: '#111827',
              timer: 900,
              timerProgressBar: true,
              showConfirmButton: false,
            }).then(() => {
              window.dispatchEvent(new Event('storage'));
              if (data.role === 'admin') {
                navigate('/admin-details');
              } else {
                navigate('/HealthMetrics');
              }
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: data.message || 'Login failed.',
              icon: 'error',
              confirmButtonColor: '#d33',
              timer: 900,
            });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong during login.',
            icon: 'error',
            confirmButtonColor: '#d33',
            timer: 900,
          });
        });
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 animate-fade-in"
      style={{
        backgroundImage:"url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white bg-opacity-30 p-8 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-lg">
          Welcome Back
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {['email', 'password'].map((key) => (
            <div key={key} className="flex flex-col">
              <input
                type={key === 'password' ? 'password' : 'email'}
                id={key}
                name={key}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[key]}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className={`w-full p-3 border-2 rounded-xl text-center focus:outline-none focus:ring-2 transition-all duration-300
                  ${
                    formik.touched[key] && formik.errors[key]
                      ? 'border-red-600 focus:ring-red-500'
                      : 'border-gray-600 focus:border-indigo-500 focus:ring-indigo-300'
                  }`}
              />
              {formik.touched[key] && formik.errors[key] && (
                <span className="text-red font-medium mt-1 text-center">{formik.errors[key]}</span>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-10 bg-red text-white py-3 rounded-2xl font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
