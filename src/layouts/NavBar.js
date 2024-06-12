import { Search } from "../components/Search"
export const NavBar =()=>{
    return (
        <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a className="nav-item nav-link px-0 me-xl-4" href="#!)">
                <i className="bx bx-menu bx-sm"></i>
            </a>
        </div>

        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        
           <Search /> 
       
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              
                <li className="nav-item lh-1 me-3">
                    <a className="github-button" href="#!" data-icon="">Star</a>
                </li>

           
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                    <a className="nav-link dropdown-toggle hide-arrow" href="#!" data-bs-toggle="dropdown">
                        <div className="avatar avatar-online">
                            <img src="https://down-vn.img.susercontent.com/file/cdf9af013aa652eb0596cb252b1101d4_tn" alt="" className="w-px-40 h-auto rounded-circle" />
                        </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                        
                        <li>
                            <a className="dropdown-item" href="#!">
                                <i className="bx bx-user me-2"></i>
                                <span className="align-middle">My Profile</span>
                            </a>
                        </li>


                        <li>
                            <div className="dropdown-divider"></div>
                        </li>

                        <li>
                            <a className="dropdown-item" href="#!"  >Settings</a>
                            <form id="logout-form" action="#!" method="POST" className="d-none">
                            </form>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>

    )
}