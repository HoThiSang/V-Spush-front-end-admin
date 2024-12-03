import { NavBar } from "./NavBar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function AdminLayout({ children }) {
  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <NavBar />
            <div>{children}</div>
            <Footer />
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}

export default AdminLayout;
