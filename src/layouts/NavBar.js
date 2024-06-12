import { Search } from "../components/Search";
import { Dropdown, Menu, Avatar } from "antd";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const NavBar = () => {
    const menu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/admin-profile">My Profile</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" icon={<PoweroffOutlined />}>
                <Link to="#!" onClick={() => document.getElementById("logout-form").submit()}>
                    Logout
                </Link>
                <form id="logout-form" action="#!" method="POST" className="d-none"></form>
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
                    <li className="nav-item lh-1 me-3">
                        <a className="github-button" href="#!" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star themeselection/sneat-html-admin-template-free on GitHub">
                            Star
                        </a>
                    </li>

                    <li className="nav-item">
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                            <a href="#!" onClick={(e) => e.preventDefault()} className="ant-dropdown-link">
                                <Avatar src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" />
                            </a>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
