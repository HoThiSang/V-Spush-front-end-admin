import {  Routes, Route, Navigate } from "react-router-dom";
import { Order, Blog, CreateBlog, ShowContact, UpdateContact, UpdateBlog , Product,ShowCategory, UpdateProduct} from "./pages";
import Login from "./pages/Login";
import React from "react";
import Banner from "./pages/Banner";

function App() {
  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/contacts" element={<ShowContact />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/update-contact/:id" element={<UpdateContact />} />
        <Route path="/update-blog/:id" element={<UpdateBlog />} />
        <Route path="/products" element={<Product />} />
        <Route path="/categories" element={<ShowCategory />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>

  );
}

export default App;