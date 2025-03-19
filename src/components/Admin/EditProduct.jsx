import React, { useState, useEffect } from 'react';
import { getProducts, editProduct } from '../../api/api';

const EditPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchProducts();
  }, []);

  const handleEditButtonClick = (productId) => {
    const productToEdit = products.find((prod) => prod.id === productId);
    setSelectedProduct(productToEdit);
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
      alert("Product updated successfully!");
      setSelectedProduct(null); // Close the form after submitting
    } catch (err) {
      setLoading(false);
      setError('Failed to update the product');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Edit Product</h1>

        {loading && <p className="text-center text-blue-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!selectedProduct && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Select a product to edit:</h2>
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.id} className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg shadow-sm">
                  <div className="flex space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditButtonClick(product.id)}
                    className="ml-4 py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedProduct && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={selectedProduct.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={selectedProduct.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={selectedProduct.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                value={selectedProduct.image}
                onChange={handleImageUrlChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {selectedProduct.image && (
                <div className="mt-2">
                  <img
                    src={selectedProduct.image}
                    alt="Product Image"
                    className="mt-2"
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                  <p className="text-sm text-gray-500">Current Image</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPage;

