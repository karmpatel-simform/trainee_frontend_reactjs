import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Package, Edit, Plus, Home } from "lucide-react";
import { authService } from '../api/authService'; // Adjust path to your authService

const Layout = () => {
  const [username, setUsername] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login"); // Redirect to login after logging out
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setUsername(user.data.name); // Access the 'name' field from the response
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    if (authService.isAuthenticated()) {
      fetchCurrentUser();
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-72 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Panel</h1>
          <p className="text-sm text-gray-500 mb-8">Product Management</p>
          
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                isActive("/dashboard") 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home size={20} className="mr-3" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/dashboard/productlist"
              className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                isActive("/dashboard/productlist") 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Package size={20} className="mr-3" />
              <span>Product List</span>
            </Link>

            <Link
              to="/dashboard/productedit"
              className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                isActive("/dashboard/productedit") 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Edit size={20} className="mr-3" />
              <span>Edit Product</span>
            </Link>

            <Link
              to="/dashboard/productadd"
              className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                isActive("/dashboard/productadd") 
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
              <span className="text-sm font-medium text-gray-700">{username}</span> {/* Display username */}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 rounded-lg transition duration-200"
            >
              <span>Log Out</span>
            </button>
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

