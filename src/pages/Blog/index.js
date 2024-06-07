import React, { useState, useEffect } from "react";
import axiosService from "../../services/configAxios";
import "./style.css";
import { Link } from "react-router-dom";
import BlogItem from '../../components/BlogItem'
const Blog = () => {
  const [blogs, setBlog] = useState([]);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenedMenuIndex(index === openedMenuIndex ? null : index);
  };

  const getBlogData = async () => {
    try {
      const response = await axiosService.get("/admin-show-all-post");
      setBlog(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      alert("Something wrong ", error);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);
  return (
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
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
