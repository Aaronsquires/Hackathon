import React from "react";
import { withRouter } from "react-router-dom";
import { drawerStyles } from "./SidebarStyles";
import { SidebarData } from "./SidebarData";
import './Sidebar.css'

const Sidebar = (props) => {

  const { history } = props;
  const classes = drawerStyles();
  const pathname = window.location.pathname;


  return (
    <div className={classes.drawer}>
      <ul class="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              class="row"
              key={key}
              id={pathname.includes(val.link) ? "active" : ""}

              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="Sidebar-Item-Icon">{val.icon}</div>
              <div id="Sidebar-Item-Title">{val.title}</div>
            </li> 
          ); //return
        })}
      </ul>
    </div>
  );
}

export default withRouter(Sidebar);







// import React from "react";
// import {
//   Drawer,
//   ListItem,
//   List,
//   ListItemIcon,
//   ListItemText,
// } from "@material-ui/core";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
// const Sidebar = (props) => {
//   const { history } = props;
//   const classes = drawerStyles();


  
//   const itemsList = [
//     {
//       text: "Home",
//       icon: <InboxIcon />,
//       onClick: () => history.push("/home"),
//     },
//     {
//       text: "Inventory",
//       icon: <MailIcon />,
//       onClick: () => history.push("/inventory"),
//     },
//     {
//       text: "Settings",
//       icon: <MailIcon />,
//       onClick: () => history.push("/settings"),
//     },
//   ];

//   return (
//     <div className="container">
//         <Drawer 
//         variant="permanent" 
//         elevation={100}
//         className={classes.drawer}
//         classes={{ paper: classes.paper }}        >
//         <List>
//           {itemsList.map((item, index) => {
//             const { text, icon, onClick } = item;
//             return (
//               <ListItem 
//                 button 
//                 key={text} 
//                 onClick={onClick}
//                 activeClassName={classes.active}
//               >
//                 {icon && <ListItemIcon>{icon}</ListItemIcon>}
//                 <ListItemText primary={text} />
//               </ListItem>
//             );
//           })}
//         </List>
//       </Drawer>
//     </div>
//   );
// };

// export default withRouter(Sidebar);