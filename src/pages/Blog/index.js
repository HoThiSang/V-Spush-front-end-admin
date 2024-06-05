import React, { useState, useEffect } from "react";
import axiosService from "../../services/configAxios";
import "./style.css";
import { Link } from "react-router-dom";
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
                  <tr key={blog.id}>
                    <td>
                      <strong>{blog.id}</strong>
                    </td>
                    <td>
                      <img
                        src={blog.image_url}
                        alt=""
                        style={{ maxWidth: "200px" }}
                      />
                    </td>
                    <td>{blog.title.slice(0, 35)}</td>
                    <td>{blog.content.slice(0, 40)}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className={`btn p-10 dropdown-toggle hide-arrow ${
                            index === openedMenuIndex ? "show" : ""
                          }`}
                          data-bs-toggle="dropdown"
                          onClick={() => toggleMenu(index)}
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <div
                          className={`dropdown-menu ${
                            index === openedMenuIndex ? "show" : ""
                          }`}
                        >
                          <a className="dropdown-item" href="#!">
                            <i className="fa-solid fa-pen"></i> Edit
                          </a>
                          <a className="dropdown-item" href="#!">
                            <i className="fa-solid fa-trash"></i>
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
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
