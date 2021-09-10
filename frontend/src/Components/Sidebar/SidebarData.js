import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDollyFlatbed, faCog, faPallet } from '@fortawesome/free-solid-svg-icons';




export const SidebarData = [
    {
        title: "Dashboard",
        icon: <FontAwesomeIcon icon={faChartLine} />,
        link: "/dashboard",
    },
    {
        title: "Inventory",
        icon: <FontAwesomeIcon icon={faDollyFlatbed}  />,
        link: "/inventory",
    },
    {
        title: "Orders",
        icon: <FontAwesomeIcon icon={faPallet}  />,
        link: "/orders",
    },
    {
        title: "Settings",
        icon: <FontAwesomeIcon icon={faCog}  />,
        link: "/settings",
    },
]
