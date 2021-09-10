import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #1a4875;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 45px;
  text-decoration: none;
  transition: 350ms;
  font-size: 18px;
  &:hover {
    border-left: 4px solid #1a4875;
    cursor: pointer;
    background-color: #f5f5f5;
    color: #1a4875;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #f5f5f5;
  height: 45px;
  padding-left: 2.5rem;
  display: flex;
  transition: 1350ms;
  align-items: center;
  text-decoration: none;
  color: #1a4875;
  font-size: 18px;
  &:hover {
    border-left: 4px solid #1a4875;
    cursor: pointer;
    background-color: #f5f5f5;
    /* border-bottom: 5px solid #1A4875; */
    color: #1a4875;
  }
  
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const pathname = window.location.pathname;

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        id={pathname.includes(item.path || item.title.toLowerCase()) ? "active" : ""}
        to={item.path}
        onClick={item.subNav && showSubnav}
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink
              to={item.path}
              key={index}
              id={pathname.includes(item.path) ? "active" : ""}
            >
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
