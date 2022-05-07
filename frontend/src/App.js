import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";
import Inventory from "./Views/Inventory/Inventory";
import Sidebar from "./Components/Sidebar2/Sidebar";
import DenseAppBar from "./Components/Header/Header";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import { Routes } from "./Utils/routes";
import test from "./Views/Dashboard/test";



const RouteWithSidebar = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <>
        <DenseAppBar></DenseAppBar>
        <div className="wrapper">
          <Sidebar />
          <div className="main-view">
            <Component {...props} />
          </div>
        </div>
      </>
    )}
    />
  );
};

class App extends Component {
  render() {
      return (
        <BrowserRouter>
              <Switch>
                <RouteWithSidebar exact path={Routes.Recruiter.path} component={test} />             
                <RouteWithSidebar exact path={Routes.Employee.path} component={Inventory} />
              </Switch>
        </BrowserRouter>
      );      
  }
}

export default App;