import { useState } from 'react';
import API from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      return setErrorMessage("Please fill out all the details");
    }

    try {
      const res = await API.post('/user/register', formData);
      alert('User registered! You can now login.');
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('User already exists');
      } else {
        setErrorMessage('Error registering user: ' + error.message);
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          id='username'
          onChange={handleChange}
          placeholder="Username"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          id='email'
          onChange={handleChange}
          placeholder="Email"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          id='password'
          onChange={handleChange}
          placeholder="Password"
          className="mb-4 p-2 border border-gray-300 rounded"
        />

        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Register
        </button>
        <div className="flex gap-2 text-sm mt-3 text-slate-600">
            <span className='font-serif text-slate-600'>Have an account?</span>
            <Link to="/login" className="text-blue-500">
              LogIn
            </Link>
        </div>

        {/* Display error message if exists */}
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default Register;
