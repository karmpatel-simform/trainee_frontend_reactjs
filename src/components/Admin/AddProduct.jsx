import React, { useState } from "react";
import { addProduct } from '../../api/api';

const AddPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [product, setProduct] = useState({ name: "", description: "", price: "" });
  const [successMessage, setSuccessMessage] = useState(""); // State for success alert
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { name: product.name, description: product.description, price: product.price, image: imageUrl };
    try {
      await addProduct(productData);
      setSuccessMessage("Product added successfully!"); // Show success message
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      setErrorMessage("Error adding product. Please try again."); // Set error message
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add New Product</h1>

        {/* Success Alert */}
        {successMessage && (
          <div className="bg-green-500 text-white p-3 mb-4 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Price</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter Product Price"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter Image URL"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
