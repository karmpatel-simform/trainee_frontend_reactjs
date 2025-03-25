import React from "react";
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard" element={<PrivateRoute element={<Layout />} />}>
          <Route path="productlist" element={<PrivateRoute element={<ListPage />} />} />
          <Route path="productedit" element={<PrivateRoute element={<EditPage />} />} />
          <Route path="productadd" element={<PrivateRoute element={<AddPage />} />} />
        </Route>

        <Route path="/console" element={<LandingPage/>} />
        <Route
              path="*"
              element={<PageNotFound />}
        />

        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
