import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDollyFlatbed, faCog, faPallet, faDolly } from '@fortawesome/free-solid-svg-icons';


export const SidebarData = [
  {
    title: 'Emplotee',
    path: '/Employee',
    icon: <FontAwesomeIcon icon={faChartLine} />,  },
  {
    title: 'Recruiter',
    path: '/Recruiter',
    icon: <FontAwesomeIcon icon={faDollyFlatbed}  />,
},

];