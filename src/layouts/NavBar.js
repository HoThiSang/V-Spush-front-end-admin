import React, { useEffect, useState } from "react";
import { Search } from "../components/Search";
import { Dropdown, Menu, Avatar } from "antd";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axiosService from "../services/configAxios";

export const NavBar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const defaultAvatar = "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg";

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosService.get("/user/profile", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axiosService.post("/logout", null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const menu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/admin-profile">My Profile</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" icon={<PoweroffOutlined />}>
                <a href="#!" onClick={handleLogout}>
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" href="#!">
                    <i className="bx bx-menu bx-sm"></i>
                </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                <Search />

                <ul className="navbar-nav flex-row align-items-center ms-auto">
                    <li className="nav-item">
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                            <a href="#!" onClick={(e) => e.preventDefault()} className="ant-dropdown-link">
                                <Avatar src={user?.image_url || defaultAvatar} />
                            </a>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
