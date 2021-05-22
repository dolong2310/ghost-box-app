import React from "react";
import { NavLink } from "react-router-dom";

function SideBarLink({ menu }) {
    return (
        <li>
            <NavLink to={`/${menu.path}`}>
                <img src={menu.url} alt={menu.title} />
                <span>{menu.title}</span>
            </NavLink>
        </li>
    );
}

export default SideBarLink;
