import "../../../homeStyles.css";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../../../Components/Loading";
import MuiTable from "../../../../Components/Tables/MuiTables";
import { History_URL } from "../../../../Utils/constants";
import axiosInstance from "../../../../Services/axiosInstance";

function Backlog() {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axiosInstance.get(History_URL).then((response) => {
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
  ];

  return (
    <div className="App">
      {/* ToolBar */}
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 pb-2"
        id="dashboard-bar"
      >
        <h4 class="h4">Backlog</h4>
        <div class="btn-toolbar mb-2 mb-md-0"></div>
      </div>

      <div className="product-table">
        {loadingData ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div>
            {/* <MuiTable
              title={"Product List"}
              data={data.map((item) => {
                return item.history.map((objects) => {
                    return (
                      objects.history_date
                    )
                  })
                })
              }
              columns={columns}
              options={options}
            /> */}
            <MuiTable
              title={"Product List"}
              data={data.map((item, index) => {
                return [
                  index,
                  item.history.map((objects, index) => {
                    return [
                      objects.history_id,
                      objects.productCode
                    ];
                  }),
                ];
                // return item.history.map((objects, index) => {
                // return [
                //   objects.history_id,
                // ]
                // })
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

export default Backlog;
