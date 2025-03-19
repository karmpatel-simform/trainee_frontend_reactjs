import React, { useState, useEffect } from 'react';
import { getProducts, editProduct } from '../../api/api';
import { ChevronLeft, Save, X, Image, DollarSign, Tag, FileText } from 'lucide-react';

const EditPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [successMessage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to fetch products');
    }
  };

  const handleEditButtonClick = (productId) => {
    const productToEdit = products.find((prod) => prod.id === productId);
    setSelectedProduct(productToEdit);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  const handleImageUrlChange = (e) => {
    setSelectedProduct({ ...selectedProduct, image: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct.id) {
      setError('Please select a product to edit.');
      return;
    }

    setLoading(true);

    try {
      await editProduct(selectedProduct.id, selectedProduct);
      setLoading(false);
      setSuccessMessage("Product updated successfully!"); 
      setErrorMessage("");
      setSelectedProduct(null); 
    } catch (err) {
      setLoading(false);
      setErrorMessage('Failed to update the product');
      setSuccessMessage(""); 
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(filter.toLowerCase()) ||
    product.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-gray-50 rounded-lg">
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            {successMessage}
          </div>
          <button onClick={() => setSuccessMessage("")} className="text-green-700">
            <X size={16} />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
            </svg>
            {errorMessage}
          </div>
          <button onClick={() => setErrorMessage("")} className="text-red-700">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex flex-col space-y-6">
        {selectedProduct ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <button 
                  onClick={handleCancel}
                  className="mr-3 p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold text-gray-800">Edit Product: {selectedProduct.name}</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={selectedProduct.name}
                        onChange={handleChange}
                        className="pl-10 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText size={16} className="text-gray-400" />
                      </div>
                      <textarea
                        name="description"
                        value={selectedProduct.description}
                        onChange={handleChange}
                        rows="4"
                        className="pl-10 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="price"
                        value={selectedProduct.price}
                        onChange={handleChange}
                        className="pl-10 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={selectedProduct.image}
                      onChange={handleImageUrlChange}
                      className="pl-10 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>

                  <div className="mt-4 flex justify-center">
                    <div className="border rounded-lg p-4 w-full flex flex-col items-center">
                      {selectedProduct.image ? (
                        <>
                          <img
                            src={selectedProduct.image}
                            alt="Product Image"
                            className="max-w-full max-h-48 rounded-lg object-contain"
                          />
                          <p className="text-sm text-gray-500 mt-2">Preview</p>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-48 w-full bg-gray-100 rounded-lg">
                          <Image size={48} className="text-gray-300" />
                          <p className="text-sm text-gray-500 mt-2">No image provided</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  {loading ? (
                    <span className="inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <Save size={18} className="mr-2" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Select a product to edit</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 bg-gray-100 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="font-semibold text-indigo-600">${product.price}</span>
                          <button
                            onClick={() => handleEditButtonClick(product.id)}
                            className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-4 text-gray-500">No products found matching your search.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPage;
