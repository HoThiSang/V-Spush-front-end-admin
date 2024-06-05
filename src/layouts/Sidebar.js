import { SideBarData } from "../data/SideBar";
import { SideBarItem } from "../components/SideBarItem";
import { TopBanner } from "../components/TopBanner";

const SideBar = () => {
    return (
        <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
        <TopBanner />
             <div class="menu-inner-shadow"></div>
                {
                    SideBarData.map((item, index)=> (
                        <SideBarItem 
                            key={index}
                            title = {item.title}
                            name = {item.name}
                        />
                    ))
                }
        </aside>
    )
}

export default SideBar 