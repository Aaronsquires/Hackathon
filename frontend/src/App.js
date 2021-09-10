import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";
import Dashboard from "./Views/Dashboard/Home";
import Inventory from "./Views/Inventory/Inventory";
import Settings from "./Views/Settings/Settings";
import Sidebar from "./Components/Sidebar2/Sidebar";
import DenseAppBar from "./Components/Header/Header";
import Orders from "./Views/Orders/Orders";
import SignUp from "./Views/Authentication/Register";
import SignIn from "./Views/Authentication/Login/Login";
import Logout from "./Views/Authentication/Logout";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import AddOrder from "./Views/Orders/addOrder/addOrder";
import Products from "./Views/Settings/SettingsPages.jsx/Products/Products";
import Backlog from "./Views/Settings/SettingsPages.jsx/Backlog/Backlog";
import ProductDetail from "./Views/Settings/SettingsPages.jsx/Products/ProductDetail/ProductDetail";
import { Routes } from "./Utils/routes";
import CreateProduct from "./Views/Settings/SettingsPages.jsx/Products/CreateProduct/CreateProduct";
import InventoryDetail from "./Views/Inventory/InventoryDetail";



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
                {/* Authentication */}
                <Route path="/Login" component={SignIn} />
                <Route path="/Register" component={SignUp} />
                <Route path="/Logout" component={Logout} />
                {/* Dashboard */}
                <RouteWithSidebar exact path={Routes.Dashboard.path} component={Dashboard} />             
                {/* Inventory */}
                <RouteWithSidebar exact path={Routes.Inventory.path} component={Inventory} />
                <RouteWithSidebar exact path={Routes.InventoryEdit.path} component={InventoryDetail} />
                {/* Orders */}
                <RouteWithSidebar exact path={Routes.Orders.path} component={Orders} />
                <RouteWithSidebar exact path={Routes.OrdersAdd.path} component={AddOrder} />
                {/* Settings */}
                <RouteWithSidebar exact path={Routes.SettingsBase.path} component={Settings} />
                {/* Products */}
                <RouteWithSidebar exact path={Routes.SettingsProduct.path} component={Products} />
                <RouteWithSidebar exact path={Routes.SettingsProductEdit.path} component={ProductDetail} />
                {/* <RouteWithSidebar exact path={Routes.SettingsProductCreate.path} component={CreateProduct} /> */}
                {/* Backlog */}
                <RouteWithSidebar exact path={Routes.SettingsBacklog.path} component={Backlog} />
              </Switch>
        </BrowserRouter>
      );      
  }
}

export default App;