import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import ListPage from "./components/Admin/GetProduct";
import EditPage from "./components/Admin/EditProduct";
import AddPage from "./components/Admin/AddProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/productlist" element={<ListPage />} />
          <Route path="/productedit" element={<EditPage />} />
          <Route path="/productadd" element={<AddPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
