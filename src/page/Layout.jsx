import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-indigo-100 text-gray-800 p-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-indigo-600">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/productlist"
                className="block py-2 px-4 bg-green-200 rounded-lg hover:bg-green-300 transition duration-300 text-gray-800"
              >
                Product List
              </Link>
            </li>
            <li>
              <Link
                to="/productedit"
                className="block py-2 px-4 bg-yellow-200 rounded-lg hover:bg-yellow-300 transition duration-300 text-gray-800"
              >
                Edit Product
              </Link>
            </li>
            <li>
              <Link
                to="/productadd"
                className="block py-2 px-4 bg-pink-200 rounded-lg hover:bg-pink-300 transition duration-300 text-gray-800"
              >
                Add Product
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-grow bg-gray-50">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-3xl font-semibold text-center text-gray-800">Dashboard</h1>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

