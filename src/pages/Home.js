
import { Footer } from "../layouts/Footer";
import { NavBar } from "../layouts/NavBar";
import SideBar from "../layouts/Sidebar";


function Home (){
    return (
        <>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <SideBar />
            <div className="layout-page">
            <NavBar />
              
    
              <Footer />
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
        <div class="layout-overlay layout-menu-toggle"></div>
        </>
    )
}

export default Home