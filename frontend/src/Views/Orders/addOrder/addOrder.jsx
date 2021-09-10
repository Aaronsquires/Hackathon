import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Button imports
import { dashboardPrintData, buttonText } from "../dashboardData";
import Button from "@material-ui/core/Button";
import DDButton from "../../../Components/Buttons/dropdownButton";
import BSTButton from "../../../Components/Buttons/Button";
import "../../../Components/Buttons/buttonStyles.css";

// Fontawesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// bootstrap imports
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

// import styles
import { makeStyles } from "@material-ui/core/styles";
import { Styles } from "../../styles";
import "../../homeStyles.css";
import { tableStyles, useStyles } from "./addOrderStyles";
import {
  createTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";

// import Table as Ctable from "../../Components/table";

import TableCell from "@material-ui/core/TableCell";
import { Typography } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../../Components/Accordian";
import MuiTable from "../../../Components/Tables/MuiTables";
import { Route } from "react-router-dom";
import { Routes } from "../../../Utils/routes";
import { Product_URL } from "../../../Utils/constants";
import axiosInstance from "../../../Services/axiosInstance";

import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";

const AddOrder = () => {
  const styles = useStyles();

  const productList = [];

  const initialFormData = Object.freeze({
    orderID: "",
    supplier: "",
    order_address: "",
    order_end_date: "",
  });

  const [singleSelections, setSingleSelections] = useState([]);
  const [list, setProductList] = React.useState(productList);
  const [quantity, setQuantity] = React.useState("");
  const [expanded, setExpanded] = React.useState("panel1");
  const [loadingData, setLoadingData] = useState(true);
  const [colour, setColourData] = useState("");
  const [formData, updateFormData] = useState([]);



  const [data, setData] = useState([]);

  // Holds form data


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

    
  }, []);

  // ! easy way to grab row index and data (click row)
  const handleRowClick = (rowData, rowMeta) => {
    console.log(rowMeta);
  };

  const handleAdd = (e) => {
    const newList = list.concat({
      id: uuidv4(),
      quantity,
      product: singleSelections,
    });

    console.log(formData);
    e.preventDefault();

    setProductList(newList);

    // setQuantity("");
  };

  function handleQuantity(event) {
    setQuantity(event.target.value);
  }

  function removeListData(rowData) {
    const index = rowData.rowIndex;
    const rowId = rowData.rowData[3];

    console.log("rowID", rowId);

    console.log(list);
    const updatedList = list.filter((item) => item.id !== rowId);
    console.log(updatedList);
    setProductList(updatedList);
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleFormChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
    console.log(e.target.value);
  };


  // const columns = ["Product", "Quantity"];
  const columns = [
    {
      name: "Delete",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              className={Styles.customButton}
              onClick={() => {
                removeListData(tableMeta);
              }}
            >
              <FontAwesomeIcon icon={faTimes} className={styles.buttonIcon} />
            </Button>
          );
        },
      },
    },
    {
      name: "Product",
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
      name: "uuid",
      options: {
        display: false,
      },
    },
  ];

  const options = {
    filter: true,
    responsive: "stacked",
    selectableRows: false,
    filter: false,
    download: false,
    print: false,
    search: false,
    viewColumns: false,
    // onColumnSortChange: (changedColumn, direction) =>
    //   console.log("changedColumn: ", changedColumn, "direction: ", direction),
    // onChangeRowsPerPage: (numberOfRows) =>
    //   console.log("numberOfRows: ", numberOfRows),
    // onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
    textLabels: {
      body: {
        noMatch: "Add Products to Product List Above",
      },
    },

    //! allows for individual row stylisation
    customRowRender: (data, dataIndex, rowIndex) => {
      let style = {};

      console.log("dataIndex" + dataIndex);
      console.log("rowIndex" + rowIndex);

      console.log("data" + data);

      return (
        <TableRow style={style}>
          <TableCell>
            <Typography>{data[0]}</Typography>
          </TableCell>
          <TableCell>{data[1]}</TableCell>
          <TableCell>{data[2]}</TableCell>
        </TableRow>
      );
    },
  };

  return (
    <div className="view-container-add-order">
      {/* ToolBar */}
      <div
        class="d-flex justify-content-between align-items-center mb-3"
        id="dashboard-bar"
      >
        <h4 class="h4">Add New Order</h4>
        <div class="button-container">
          <BSTButton
            icon={<FontAwesomeIcon icon={faTimes} />}
            title="Cancel"
            path={Routes.Orders.path}
          ></BSTButton>
        </div>
      </div>

      <form className="input-form">
        <div className="mb-4">
          <Accordion square onChange={handleChange("panel1")}>
            <AccordionSummary
              aria-label="Expand"
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Add order by file</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" />
              </Form.Group>
              <Button className={Styles.customButton}>Add Order By File</Button>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="table-container mb-3">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="orderID">
              <Form.Label>Order ID</Form.Label>
              <Form.Control
                type="orderID"
                placeholder="OrderID"
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Row>
        </div>

        <div className="table-container mb-4">
          <Row className="mb-3">
            <div className="col">
              <a>Product</a>
              <Form.Group controlId="formGridState">
                <Select
                  variant="outlined"
                  defaultValue="Colour Code"
                  value={singleSelections}
                  onChange={(e) => setSingleSelections(e.target.value)}
                >
                  {data.map((item, i) => (
                    <MenuItem key={i} value={item.productCode}>
                      {item.productCode}
                    </MenuItem>
                  ))}
                </Select>
              </Form.Group>
            </div>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="quantity"
                placeholder="Quantity"
                onChange={handleQuantity}
                required
              />
            </Form.Group>
          </Row>
          <Button className={Styles.customButton} onClick={handleAdd}>
            Add Product
          </Button>
        </div>

        {/* <MuiThemeProvider theme={theme}>
          <div className="table">
            <MUIDataTable
              title={"Product List"}
              data={list.map((item) => {
                return [item.product, item.quantity, item.id];
              })}
              columns={columns}
              options={options}
            />
          </div>
        </MuiThemeProvider> */}

        <MuiTable
          title={"Product List"}
          data={list.map((item) => {
            return [item.product, item.quantity, item.id];
          })}
          columns={columns}
          options={options}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={styles.customButton}
        >
          Create Order
        </Button>
      </form>
    </div>
  );
};

export default AddOrder;
