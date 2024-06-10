import React, { useState, useEffect } from "react";
import axiosService from "../../services/configAxios";
import "./style.css";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

    const toggleMenu = (index) => {
        setOpenedMenuIndex(index === openedMenuIndex ? null : index);
    };

    const deleteBanner = async (id) => {
        try {
            await axiosService.delete(`/admin-delete-banner/${id}`);
            setBanners(banners.filter(banner => banner.id !== id));
        } catch (error) {
            alert("Failed to delete banner: ", error);
        }
    };

    const getBannerData = async () => {
        try {
            const response = await axiosService.get("/admin-show-all-banner");
            setBanners(response.data.data);
        } catch (error) {
            alert("Something wrong ", error);
        }
    };

    useEffect(() => {
        getBannerData();
    }, []);

    return (
        <AdminLayout>
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Users</h5>
                    <div className="d-flex justify-content">
                        <Link
                            to={'/create-banner'}
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
                                    <th>title</th>
                                    <th>Sub title</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {banners.map((banner, index) => (
                                    <tr key={banner.id}>
                                        <td>
                                            <strong>{banner.id}</strong>
                                        </td>
                                        <td>
                                            <img
                                                src={banner.image_url}
                                                alt=""
                                                style={{ maxWidth: "200px" }}
                                            />
                                        </td>
                                        <td>{banner.title.slice(0, 35)}</td>
                                        <td>{banner.sub_title.slice(0, 40)}</td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className={`btn p-10 dropdown-toggle hide-arrow ${index === openedMenuIndex ? "show" : ""
                                                        }`}
                                                    data-bs-toggle="dropdown"
                                                    onClick={() => toggleMenu(index)}
                                                >
                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                </button>
                                                <div
                                                    className={`dropdown-menu ${index === openedMenuIndex ? "show" : ""
                                                        }`}
                                                >
                                                    <Link className="dropdown-item" to={`/update-banner/${banner.id}`}>
                                                        <i className="fa-solid fa-pen"></i> Edit
                                                    </Link>
                                                    <button className="dropdown-item" onClick={() => deleteBanner(banner.id)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                        Delete
                                                    </button>
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
        </AdminLayout>
    );
};

export default Banner;
