import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Package, Edit, Plus, Home } from "lucide-react";

const Layout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-72 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Panel</h1>
          <p className="text-sm text-gray-500 mb-8">Product Management</p>
          
          <nav className="space-y-2">
            <Link
              to="/"
              className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                isActive("/") 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home size={20} className="mr-3" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/productlist"
              className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                isActive("/productlist") 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Package size={20} className="mr-3" />
              <span>Product List</span>
            </Link>

            <Link
              to="/productedit"
              className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                isActive("/productedit") 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Edit size={20} className="mr-3" />
              <span>Edit Product</span>
            </Link>

            <Link
              to="/productadd"
              className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                isActive("/productadd") 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Plus size={20} className="mr-3" />
              <span>Add Product</span>
            </Link>
          </nav>
        </div>
      </aside>

      <div className="flex-grow">
        <header className="bg-white shadow-sm p-4 px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {location.pathname === "/" && "Dashboard"}
              {location.pathname === "/productlist" && "Product List"}
              {location.pathname === "/productedit" && "Edit Product"}
              {location.pathname === "/productadd" && "Add Product"}
            </h1>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">Admin User</span>
            </div>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;