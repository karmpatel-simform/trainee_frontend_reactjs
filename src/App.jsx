import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import ListPage from "./components/Admin/GetProduct";
import EditPage from "./components/Admin/EditProduct";
import AddPage from "./components/Admin/AddProduct";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import HomePage from "./page/Landing";
import PrivateRoute from "./api/PrivateRoute";
import PageNotFound from "./page/404";
import LandingPage from "./page/Landing/Landing";
import CartPage from "./components/Cart/Cart";
import { authService } from "../src/api/authService"; // Assuming you have this service

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const checkAuth = async () => {
      try {
        const isAuth = authService.isAuthenticated();
        if (isAuth) {
          // Get user data from your auth service
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<PrivateRoute element={<Layout user={user} />} />}>
          <Route path="productlist" element={<PrivateRoute element={<ListPage />} />} />
          <Route path="productedit" element={<PrivateRoute element={<EditPage />} />} />
          <Route path="productadd" element={<PrivateRoute element={<AddPage />} />} />
        </Route>

        <Route path="/console" element={<LandingPage user={user} />} />
        <Route path="/cart" element={
          <PrivateRoute element={<CartPage user={user} />} />
        } />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;