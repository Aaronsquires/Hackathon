import React, { useState, useEffect } from "react";
import "../homeStyles.css";
import { Inventory_URL } from "../../Utils/constants";
import "../homeStyles.css";
import Loading from "../../Components/Loading";
import MuiTable from "../../Components/Tables/MuiTables";
import { dashboardPrintData, buttonText, columns } from "./dashboardData";
import DDButton from "../../Components/Buttons/dropdownButton";
import BSTButton from "../../Components/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Routes } from "../../Utils/routes";
import axiosInstance from "../../Services/axiosInstance";

function Orders() {
  // here you set a state to tell the component it needs to wait
  // until the result is fetched from the api
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);



  useEffect(() => {
    async function getData() {
      await axiosInstance.get(Inventory_URL).then((response) => {
        // check if the data is populated
        console.log(response.data);
        setData(response.data);
        // you tell it that you had the result
        setLoadingData(false);
      }).catch(error => {
        console.log("error: " + error);
      });
    }

    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, []);

  const options = {
    filter: true,
    responsive: "stacked",
    selectableRows: false,
    filter: false,
    download: false,
    print: false,
    viewColumns: false,
  };

  return (
    <div className="App">
    {/* ToolBar */}
       <div
        class="d-flex justify-content-between align-items-center mb-3"
        id="dashboard-bar"
      >
        <h4 class="h4">Orders</h4>
        <div class="button-container">
          <BSTButton
            icon={<FontAwesomeIcon icon={faPlusCircle} />}
            title="Add Order"
            path={Routes.OrdersAdd.path}
          ></BSTButton>
          <DDButton title={buttonText.btnText} data={dashboardPrintData} />
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
            return [
              item.id,
              item.productCode + "-" + item.colourcode,
              item.description,
              item.supplier,
              (item.stockStatus) ? "In-Stock" : "Out-of-Stock",
              item.quantity,
              item.minquantity,
              // <Button onClick={handleEditPress(rowData, rowMeta)}>
              //   Edit
              // </Button>
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
};

export default Orders;
