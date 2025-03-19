import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListPage = () => {
  const [products, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKENDURL}/api/products/get`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">Product List</h1>
        {loading && <p className="text-center text-blue-600">Loading...</p>}
        {error && <p className="text-center text-red-600">Error loading products</p>}
        
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="p-6 bg-white border rounded-lg shadow-sm">
              <div className="flex space-x-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <span className="font-bold text-teal-600">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPage;

