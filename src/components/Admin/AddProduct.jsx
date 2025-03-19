import React, { useState } from "react";
import { addProduct } from '../../api/api';
import { Upload, X, Check, AlertCircle } from "lucide-react";

const AddPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [product, setProduct] = useState({ name: "", description: "", price: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = { 
      name: product.name, 
      description: product.description, 
      price: product.price, 
      image: imageUrl 
    };

    try {
      await addProduct(productData);
      setSuccessMessage("Product added successfully!");
      setErrorMessage("");
      setProduct({ name: "", description: "", price: "" });
      setImageUrl("");
    } catch (error) {
      setErrorMessage("Error adding product. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>

        {successMessage && (
          <div className="flex items-center bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            <Check size={20} className="mr-2" />
            <p>{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <AlertCircle size={20} className="mr-2" />
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <div className="flex">
              <input
                type="text"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg px-3 flex items-center">
                <Upload size={20} className="text-gray-500" />
              </div>
            </div>
          </div>

          {imageUrl && (
            <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="Product Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/api/placeholder/320/160";
                  e.target.alt = "Invalid image URL";
                }}
              />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 font-medium rounded-lg text-white ${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } transition duration-200 flex justify-center items-center`}
          >
            {loading ? (
              <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;