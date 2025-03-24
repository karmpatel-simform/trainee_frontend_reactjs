import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-2xl text-gray-700 mb-4">Page Not Found</p>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
