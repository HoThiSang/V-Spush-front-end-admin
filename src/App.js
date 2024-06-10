import {  Routes, Route, Navigate } from "react-router-dom";
import { Order, Blog, CreateBlog, ShowContact, UpdateContact, UpdateBlog, Product, ShowCategory, DetailCategory, DeleteCategory, CreateBanner,CreateCategory,UpdateCategory, UpdateProduct} from "./pages";
import Login from "./pages/Login/Login";
import React from "react";
import Banner from "./pages/Banner";
import CreateProduct from "./pages/Product/CreateProduct";

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
        <Route path="/create-banner" element={<CreateBanner />} />
        <Route path="/update-contact/:id" element={<UpdateContact />} />
        <Route path="/update-blog/:id" element={<UpdateBlog />} />
        <Route path="/products" element={<Product />} />
        <Route path="/categories" element={<ShowCategory />} />
        
        <Route path="/detail-category/:id" element={<DetailCategory />} />
        <Route path="/delete-category/:id" element={<DeleteCategory />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/update-category/:id" element={<UpdateCategory />} />
        <Route path="/create-product" element={<CreateProduct />} />

        <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>

  );
}

export default App;