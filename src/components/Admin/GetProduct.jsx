import React from "react";

const ListPage = () => {
  const products = [
    { id: 1, name: "Product 1", price: "$10" },
    { id: 2, name: "Product 2", price: "$20" },
    { id: 3, name: "Product 3", price: "$30" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Product List</h1>
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="p-4 border rounded-lg shadow-md">
              <div className="flex justify-between">
                <span>{product.name}</span>
                <span>{product.price}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListPage;
