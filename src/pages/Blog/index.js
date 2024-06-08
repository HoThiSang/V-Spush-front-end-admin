import React, { useState, useEffect } from "react";
import axiosService from "../../services/configAxios";
import "./style.css";
import { Link } from "react-router-dom";
import BlogItem from '../../components/BlogItem'
import {Modal } from "antd";
import AdminLayout from "../../layouts/AdminLayout";

const Blog = () => {
  const [blogs, setBlog] = useState([]);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const toggleMenu = (index) => {
    setOpenedMenuIndex(index === openedMenuIndex ? null : index);
  };

  const getBlogData = async () => {
    try {
      const response = await axiosService.get("/admin-show-all-post");
      setBlog(response.data.data);
    } catch (error) {
      alert("Something wrong ", error);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);
  const handleDeleteBlog = async(id)=>{
    try {
      const response = await axiosService.delete(`/admin-delete-post/${id}`)
      const updatedCarts = blogs.filter((item) => item.id !== id);
      setBlog(updatedCarts);
      setSuccessMessage('Deleted blog successfully!');
      setIsSuccessModalVisible(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsErrorModalVisible(true);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
        setIsErrorModalVisible(true);
      }
    }
  }
  return (
    <AdminLayout>
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">Users</h5>
          <div className="d-flex justify-content">
            <Link
            to={'/create-blog'}
              className="btn btn-primary btn-create-new"
              id=""
            >
              Create new
            </Link>
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Blog title</th>
                  <th>Blog content</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {blogs.map((blog, index) => (
                  <BlogItem 
                    key={blog.id}
                    id={blog.id}
                    index={index}
                    title={blog.title}
                    content={blog.content}
                    image_url={blog.image_url}
                    image_name={blog.image_name}
                    toggleMenu={()=>toggleMenu(index)}
                    openedMenuIndex={openedMenuIndex}
                    handleDeleteBlog={()=>handleDeleteBlog(blog.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal  className="error"
          title="Error"
          open={isErrorModalVisible}
          onOk={() => setIsErrorModalVisible(false)}
          onCancel={() => setIsErrorModalVisible(false)}
        >
          <p>{errorMessage}</p>
        </Modal>
        <Modal
          title="Success"
          open={isSuccessModalVisible}
          onOk={() => setIsSuccessModalVisible(false)}
          onCancel={() => setIsSuccessModalVisible(false)}
        >
          <p>{successMessage}</p>
        </Modal>
    </div>
    </AdminLayout>
  );
};

export default Blog;
