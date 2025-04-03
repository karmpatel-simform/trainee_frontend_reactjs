import React, { useState } from 'react';
import { authService } from '../../api/authService';
import { toast } from 'react-hot-toast';

// SignUp Component
const SignUp = ({ onClose, onSuccess }) => {
  const [error, setError] = useState('');
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(signUpData);
      console.log('Status:', response.status);
      console.log('Response Data:', response.data);
    
      if (response.status === 201 && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Sign up successful!');
        onSuccess();
        onClose();
      } else if (response.status === 204) {
        toast.success('Sign up successful!');
        onSuccess();
        onClose();
      } else {
        onSuccess();
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Sign up failed');
    }      
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSignUpData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
      >
        ✕
      </button>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-600 mt-2">Create an account to start shopping</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            value={signUpData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            value={signUpData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={signUpData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
