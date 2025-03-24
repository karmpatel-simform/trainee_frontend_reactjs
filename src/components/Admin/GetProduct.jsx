import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, RefreshCw, Filter, Eye, Edit, Trash } from 'lucide-react';

const ListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/products/get`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 items-center space-x-4  space-y-4">Product Inventory</h1>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <button 
              onClick={fetchProducts}
              className="p-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-700 text-center">{error}</p>
            <button 
              onClick={fetchProducts}
              className="mt-2 mx-auto block px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center">
                        Product Name
                        {sortBy === 'name' && (
                          <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                      <div className="flex items-center">
                        Price
                        {sortBy === 'price' && (
                          <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.description.length > 50 
                            ? `${product.description.substring(0, 50)}...` 
                            : product.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-12 h-12 object-cover rounded border"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        No products found. Try adjusting your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-lg p-4 shadow flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="flex space-x-1">
                <button className="px-3 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200">
                  Previous
                </button>
                <button className="px-3 py-1 bg-indigo-600 rounded text-white hover:bg-indigo-700">
                  1
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200">
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListPage;