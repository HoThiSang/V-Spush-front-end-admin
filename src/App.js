import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import { Order } from "./pages";
import { Footer } from "./layouts/Footer";
import { NavBar } from "./layouts/NavBar";
import SideBar from "./layouts/Sidebar";

function App() {
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar />
          <div className="layout-page">
            <NavBar />
            <Routes>
              <Route>
                <Route path="/" element={<Home />} />
                <Route path="/orders" element={<Order />} />
              </Route>
            </Routes>
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
