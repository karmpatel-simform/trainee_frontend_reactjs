import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-400 text-white p-4">
        <nav>
          <ul className="flex justify-center space-x-4">
            <li>
              <Link
                to="/productlist"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Product List
              </Link>
            </li>
            <li>
              <Link
                to="/productedit"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Edit Product
              </Link>
            </li>
            <li>
              <Link
                to="/productadd"
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Add Product
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow p-4"><Outlet /></main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        © Admin Dashboard
      </footer>
    </div>
  );
};

export default Layout;

