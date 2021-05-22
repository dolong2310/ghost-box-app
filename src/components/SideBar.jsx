import React from "react";
import Images from "../constants/images";
import SideBarDragArea from "./SideBarDragArea";
import SideBarLink from "./SideBarLink";

function SideBar(props) {
    const menuList = [
        {
            id: 1,
            title: "Home",
            url: Images.HOME_ICON,
            path: "home",
        },
        {
            id: 2,
            title: "App",
            url: Images.APP_ICON,
            path: "app",
        },
        {
            id: 3,
            title: "Photos",
            url: Images.GALLERY_ICON,
            path: "photos",
        },
        {
            id: 4,
            title: "File Manager",
            url: Images.PAPER_ICON,
            path: "file",
        },
        {
            id: 5,
            title: "Setting",
            url: Images.SETTING_ICON,
            path: "setting",
        },
    ];
    return (
        <>
            <section className="sidebar">
                <div className="navigation">
                    <a href="/#" className="logo">
                        <img
                            src={Images.LOGO}
                            alt="logo1"
                            className="logo-lg"
                        />
                        <img
                            src={Images.BRAND_ICON}
                            alt="logo2"
                            className="logo-sm"
                        />
                    </a>
                    <ul>
                        {menuList.map((menu) => (
                            <SideBarLink menu={menu} key={menu.id} />
                        ))}
                    </ul>
                </div>
                <div className="upload">
                    <SideBarDragArea />
                </div>
            </section>
        </>
    );
}

export default SideBar;
