import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import "../../../homeStyles.css";
import { Product_URL } from "../../../../Utils/constants";

import { Button } from "@material-ui/core";
import Loading from "../../../../Components/Loading";
// import TestTable from "../../Components/Tables/MuiTable";
import MuiTable from "../../../../Components/Tables/MuiTables";

// Fontawesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../Products/ProductStyles.css";
import { Routes } from "../../../../Utils/routes";
import BSTButton from "../../../../Components/Buttons/Button";
import CreateProduct from "./CreateProduct/CreateProduct";
import { makeStyles } from "@material-ui/core/styles";
import axiosInstance from "../../../../Services/axiosInstance";
import CreateColour from "../Addtional/CreateColour";
import CreateSupplier from "../Addtional/CreateSupplier";

export const useStyles = makeStyles(() => ({
  customButton: {
    marginLeft: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "2.5px",
    fontWeight: "500",
    color: "#000",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "45px",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease 0s",
    cursor: "pointer",
    outline: "none",
    height: "45px",
    "&:hover": {
      backgroundColor: "#1A4875",
      boxShadow: " 0px 15px 20px rgba(26, 72, 117, 0.4)",
      color: "#fff",
      outline: "none",
    },
    "&:focus": {
      border: "none",
      outline: "none",
    }
  },
  buttonIcon: {
    fontSize: "20px",
  },
  item1: {
    fontSize: "20px",
    marginRight: "10px",
    display: "inline-flex",
  }
}));

function Products() {
  const Styles = useStyles();

  const history = useHistory();
  // here you set a state to tell the component it needs to wait
  // until the result is fetched from the api
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalSupplierShow, setSupplierModalShow] = React.useState(false);
  const [modalColourShow, setColoursModalShow] = React.useState(false);

  // const styles = useStyles();
  // Table Head Data

  useEffect(() => {
    async function getData() {
      await axiosInstance.get(Product_URL).then((response) => {
        // check if the data is populated
        console.log(response.data);
        setData(response.data);
        // you tell it that you had the result
        setLoadingData(false);
      });
    }

    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
    

    // const interval = setInterval(() => {
    //   getData();
    // }, 2000);
    // return () => clearInterval(interval);

  }, []);

  function handleEditPress(value, rowData) {
    var index = rowData.rowIndex;
    var rowdata = rowData.rowData;

    history.push({
      pathname: Routes.SettingsProductEditNoID.path + index.toString(),
      state: { detail: rowdata },
    });
  }

  // table data
  const options = {
    filter: true,
    responsive: "scrollMaxHeight",
    selectableRows: false,
    filter: false,
    download: false,
    print: false,
    viewColumns: false,
  };

  const columns = [
    {
      name: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "Product",
      options: {
        filter: true,
      },
    },
    {
      name: "Description",
      options: {
        filter: true,
      },
    },
    {
      name: "Supplier",
      options: {
        filter: true,
      },
    },
    {
      name: "Edit",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Button
                // className={Styles.customButton}
                onClick={() => {
                  handleEditPress(value, tableMeta);
                }}
              >
                Edit
              </Button>
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="App">
      {/* ToolBar */}

      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 pb-2"
        id="dashboard-bar"
      >
        <h4 class="h4">Products</h4>
        <div class="button-container">
          <Button
            onClick={() => setModalShow(true)}
            className={Styles.customButton}
          >
            <div className={Styles.item1}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
            <div className={Styles.item2}>
            Add Product
            </div>
          </Button>
          <div></div>
          <Button
            onClick={() => setColoursModalShow(true)}
            className={Styles.customButton}
          >
            <div className={Styles.item1}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
            <div className={Styles.item2}>
              Add Colour
            </div>
          </Button>

          <Button
            onClick={() => setSupplierModalShow(true)}
            className={Styles.customButton}
          >
            <div className={Styles.item1}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
            <div className={Styles.item2}>
            Add Supplier
            </div>
          </Button>
        </div>
      </div>

      <CreateProduct show={modalShow} onHide={() => setModalShow(false)} />
      <CreateColour show={modalColourShow} onHide={() => setColoursModalShow(false)} />
      <CreateSupplier show={modalSupplierShow} onHide={() => setSupplierModalShow(false)} />



      <div className="product-table">
        {loadingData ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div>
            <MuiTable
              title={"Product List"}
              data={data.map((item) => {
                return [
                  item.id,
                  item.productCode + "-" + item.colourCode,
                  item.description,
                  item.supplier,
                ];
              })}
              columns={columns}
              options={options}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
