import React, { useState } from "react";

const EditPage = () => {
  const [product, setProduct] = useState({ id: 1, name: "", price: "" });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Edited:", product);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm">Product Price</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
