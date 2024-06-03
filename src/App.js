import "./App.css";
import { Footer } from "./layouts/Footer";
import { NavBar } from "./layouts/NavBar";
import SideBar from "./layouts/Sidebar";
import Home from "./pages/Home";

function App() {
  return (
    <>
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />
        <div className="layout-page">
        <NavBar />
          {/* Content */}

          <Footer />
          <div className="content-backdrop fade"></div>
        </div>
      </div>
    </div>
    <div class="layout-overlay layout-menu-toggle"></div>
    </>
  );
}

export default App;
