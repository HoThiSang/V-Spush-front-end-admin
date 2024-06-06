import { Routes, Route } from "react-router";
// import Home from "./pages/Home";
import { Order, Blog , CreateBlog,ShowContact} from "./pages";
import { Footer } from "./layouts/Footer";
import { NavBar } from "./layouts/NavBar";
import SideBar from "./layouts/Sidebar";
import Banner from "./pages/Banner";

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
                <Route path="/orders" element={<Order />} />
                <Route path="/blogs" element={<Blog />} />
                <Route path="/create-blog" element={<CreateBlog />} />
                {/* <Route path="/orders" element={<Order />} /> */}
                <Route path="/contacts" element={<ShowContact />} />
                <Route path="/banner" element={<Banner />} />
              </Route>
            </Routes>
            <Footer />
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </>
  );
}

export default App;
