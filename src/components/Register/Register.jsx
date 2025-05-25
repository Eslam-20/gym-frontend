import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      gender: '',
      weight: '',
      height: '',
      age: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .min(8, 'At least 8 characters')
        .required('Required'),
      gender: Yup.string()
        .oneOf(['male', 'female'], 'Invalid gender')
        .required('Required'),
      weight: Yup.number()
        .positive('Must be positive')
        .max(200, 'Weight cannot be more than 200')
        .required('Required'),
      height: Yup.number()
        .positive('Must be positive')
        .max(200, 'Height cannot be more than 200')
        .required('Required'),
      age: Yup.number()
        .min(16, 'Age must be at least 16')
        .max(80)
        .required('Required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then(async (res) => {
          if (res.status === 409) {
            throw new Error('Email already exists with this email');
          }
          if (!res.ok) {
            const data = await res.json().catch(() => null);
            throw new Error(data?.message || 'Something went wrong');
          }
          return res.json();
        })
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'Account created successfully. Please sign in.',
            icon: 'success',
            confirmButtonColor: '#2563eb',
            timer: 900,
          }).then(() => {
            navigate('/Signin');
          });
        })
        .catch((error) => {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonColor: '#d33',
            timer: 900,
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white bg-opacity-30 p-8 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 drop-shadow-lg">
          Create Your Account
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(formik.initialValues).map((key) => {
            if (key === 'age') return null;

            return (
              <div key={key} className="flex flex-col mb-4">
                {key === 'gender' ? (
                  <select
                    id={key}
                    name={key}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[key]}
                    className={`w-full p-3 border-2 rounded-xl text-center bg-white focus:outline-none focus:ring-2 transition-all duration-300
                      ${
                        formik.touched[key] && formik.errors[key]
                          ? 'border-red-600 focus:ring-red-700'
                          : 'border-gray-800 focus:border-indigo-500 focus:ring-indigo-300'
                      }`}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <input
                    type={
                      key === 'password'
                        ? 'password'
                        : key === 'email'
                        ? 'email'
                        : key === 'weight' || key === 'height'
                        ? 'number'
                        : 'text'
                    }
                    id={key}
                    name={key}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[key]}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    className={`w-full p-3 border-2 rounded-xl text-center focus:outline-none focus:ring-2 transition-all duration-300
                      ${
                        formik.touched[key] && formik.errors[key]
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-900 focus:border-indigo-500 focus:ring-indigo-400'
                      }`}
                  />
                )}

                {formik.touched[key] && formik.errors[key] && (
                  <span className="text-red font-medium mt-1">{formik.errors[key]}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex border-black flex-col mb-4 mt-6 w-full md:w-1/2 mx-auto">
          <input
            type="number"
            id="age"
            name="age"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            placeholder="Age"
            className={`w-full p-3 border-2 border-black rounded-xl text-center focus:outline-none focus:ring-2 transition-all duration-300
              ${
                formik.touched.age && formik.errors.age
                  ? 'border-red-600 focus:ring-red-300'
                  : 'border-gray-900 focus:border-indigo-700 focus:ring-indigo-300'
              }`}
          />
          {formik.touched.age && formik.errors.age && (
            <span className="text-red-500 font-medium mt-1 text-center">{formik.errors.age}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full mt-6 bg-red text-white py-3 rounded-2xl font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
