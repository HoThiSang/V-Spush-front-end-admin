import SideBar from "../layouts/Sidebar"

const Home = () => {
    return (
        <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
                <SideBar />
                <div className="layout-page">

        {/* Content */}
                <div className="content-backdrop fade"></div>
                </div>
        </div>
        </div>
    )
}

export default Home