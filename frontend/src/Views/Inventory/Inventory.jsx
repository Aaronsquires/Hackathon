import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Inventory_URL, Stocklist_URL } from "../../Utils/constants";
import Table from "../../Components/table";
import { Styles } from "../styles";
import BSTButton from "../../Components/Buttons/Button";
import "../homeStyles.css";
import { dashboardPrintData, buttonText } from "./dashboardData";
import Loading from "../../Components/Loading";
// import TestTable from "../../Components/Tables/MuiTable";
import MuiTable from "../../Components/Tables/MuiTables";
import { Button } from "@material-ui/core";

// Fontawesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import TableCell from "@material-ui/core/TableCell";
import { Typography } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { authInstance } from "../../Services/authentication";
import axiosInstance from "../../Services/axiosInstance";
import { useHistory } from "react-router-dom";

import { Routes } from "../../Utils/routes";

function Inventory() {
  const history = useHistory();

  // here you set a state to tell the component it needs to wait
  // until the result is fetched from the api
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  // const styles = useStyles();

  // Table Head Data

  useEffect(() => {
    async function getData() {
      await axiosInstance
        .get(Inventory_URL)
        .then((response) => {
          // check if the data is populated
          console.log(response.data);
          setData(response.data);
          // you tell it that you had the result
          setLoadingData(false);
        })
    }

    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, []);

  function handleEditPress(value, rowData) {
    var index = rowData.rowIndex;
    var rowdata = rowData.rowData;

    history.push({
      pathname: Routes.InventoryEditNoId.path + index.toString(),
      state: { detail: rowdata },
    });
  }


  const options = {
    filter: true,
    responsive: "stacked",
    selectableRows: false,
    filter: true,
    download: false,
    print: false,
    viewColumns: false,

    //! allows for individual row stylisation
    customRowRender: (data, dataIndex, rowIndex) => {
      let style = {};

      console.log("dataIndex: " + dataIndex);
      console.log("rowIndex: " + rowIndex);

      console.log("data: " + data[4]);

      // Test Style - turns selected data green if equal to DF310
      if (data[4].toString() === "Below-Min-Stock") {
        style.backgroundColor = "rgba(255, 253, 124, 0.4)";
      }
      if (data[4].toString() === "Out-of-Stock") {
        style.backgroundColor = "rgba(255, 0, 0, 0.4)";
      }

      return (
        <TableRow style={style}>
          {/* {data.map(({objects, index}) => 
            <TableCell>
              {objects}
            </TableCell>
          )} */}
          <TableCell>{data[0]}</TableCell>
          <TableCell>{data[1]}</TableCell>
          <TableCell>{data[2]}</TableCell>
          <TableCell>{data[3]}</TableCell>
          <TableCell>{data[4]}</TableCell>
          <TableCell>{data[5]}</TableCell>
          <TableCell>{data[6]}</TableCell>
          <TableCell align="left">{data[7]}</TableCell>
        </TableRow>
      );
    },
  };

  const columns = [
    {
      name: "ID",
      options: {
        filter: true,
        sort: true,
        sortDirection: 'desc',
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
      name: "Stock Status",
      options: {
        filter: true,
      },
    },
    {
      name: "Quantity",
      options: {
        filter: true,
      },
    },
    {
      name: "Min-Quantity",
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
        <h4 class="h4">Inventory</h4>
        <div class="btn-toolbar mb-2 mb-md-0">
          <BSTButton title={buttonText.btnText} data={dashboardPrintData} />
        </div>
      </div>
      {/* <div className="table-container"> */}
      {/* Table */}
      {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank
         page because the data is an empty array at the moment of mounting */}
      {loadingData ? (
        <div>
          <Loading />
        </div>
      ) : (
        // <Styles>
        //   <Table columns={columns} data={data} />
        // </Styles>
        // <TestTable columns={columns} data={data}></TestTable>
        <div>
          <MuiTable
            title={"Product List"}
            data={data.map((item) => {
              var stockStatus = "";
              
              //! sets stockStatus basesd on quantities
              if (item.quantity > item.minquantity) {
                stockStatus = "In-Stock";
              }
              else if (item.quantity <= item.minquantity && item.quantity > 0) {
                stockStatus = "Below-Min-Stock";
              }
              else if (item.quantity <= 0) {
                stockStatus = "Out-of-Stock";
              }
   

              return [
                item.id,
                item.productCode + "-" + item.colourCode,
                item.description,
                item.supplier,
                stockStatus,
                item.quantity,
                item.minquantity,
              ];
            })}
            columns={columns}
            options={options}
          />
        </div>
      )}
      {/* </div> */}
    </div>
  );
}

export default Inventory;
