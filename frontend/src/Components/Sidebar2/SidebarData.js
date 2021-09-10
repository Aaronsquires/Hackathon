import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDollyFlatbed, faCog, faPallet, faDolly } from '@fortawesome/free-solid-svg-icons';


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <FontAwesomeIcon icon={faChartLine} />,  },
  {
    title: 'Inventory',
    path: '/inventory',
    icon: <FontAwesomeIcon icon={faDollyFlatbed}  />,
},
  {
    title: 'Orders',
    path: '/orders',
    icon: <FontAwesomeIcon icon={faPallet}  />,
},
  {
    title: 'Settings',
    // path: '/settings',
    icon: <FontAwesomeIcon icon={faCog}  />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Products',
        path: '/settings/product',
        icon: <FontAwesomeIcon icon={faDolly} />
      },
    ]
  },
];