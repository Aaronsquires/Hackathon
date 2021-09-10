import { Button, TableCell, TableRow } from "@material-ui/core";
import React, { useMemo, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BSTButton from "../../Components/Buttons/Button";
import Loading from "../../Components/Loading";
import MuiTable from "../../Components/Tables/MuiTables";
import axiosInstance from "../../Services/axiosInstance";
import { Inventory_URL, ProductLowStock_URL, ProductNoStock_URL } from "../../Utils/constants";
import { Routes } from "../../Utils/routes";
import "../homeStyles.css";
import { dashboardPrintData, buttonText } from "./dashboardData";



function Dashboard() {
  const history = useHistory();

  // here you set a state to tell the component it needs to wait
  // until the result is fetched from the api
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [dataNoStock, setDataNoStock] = useState([]);




  useEffect(() => {
    async function getLowStock() {
      await axiosInstance
        .get(ProductLowStock_URL)
        .then((response) => {
          // check if the data is populated
          console.log(response.data);
          setData(response.data);
          // you tell it that you had the result
        })
    }

    async function getNoStock() {
      await axiosInstance
        .get(ProductNoStock_URL)
        .then((response) => {
          // check if the data is populated
          console.log(response.data);
          setDataNoStock(response.data);
          // you tell it that you had the result
          setLoadingData(false);
        })
    }



    if (loadingData) {
      // if the result is not ready so you make the axios call
      getLowStock();
      getNoStock();
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
    filter: false,
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
      name: "Status",
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
      name: "Minimum Quantity",
      options: {
        filter: true,
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
        <h4 class="h4">Dashboard</h4>
        <div class="btn-toolbar mb-2 mb-md-0">
          <BSTButton title={buttonText.btnText} data={dashboardPrintData} />
        </div>
      </div>

      <div className="Button-row">

      </div>

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
            title={"Out of Stock Products"}
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
                stockStatus,
                item.quantity,
                item.minquantity,
              ];
            })}
            columns={columns}
            options={options}
          />
          <MuiTable
            title={"Out of Stock Products"}
            data={dataNoStock.map((item) => {


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

export default Dashboard;
