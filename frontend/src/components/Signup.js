import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      const response = await axios.post('http://localhost/allevent/backend/user.php', formData);
      console.log(response);
      toast.success("User registered successfully")
      navigate('/login');
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error("Error in Registration: ",error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 flex items-center justify-center flex-col p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Your Email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
          <p className='pt-2 text-center'>already have an account ? <Link to='/login'>login </Link> </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
