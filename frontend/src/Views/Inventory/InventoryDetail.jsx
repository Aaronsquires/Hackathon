import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import BSTButton from "../../Components/Buttons/Button";
import Loading from "../../Components/Loading";
import axiosInstance from "../../Services/axiosInstance";
import { Routes } from "../../Utils/routes";
import Select from "@material-ui/core/Select";

import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Colours_URL, Inventory_URL, Supplier_URL } from "../../Utils/constants";
import { MenuItem } from "@material-ui/core";
import MuiTable from "../../Components/Tables/MuiTables";
import moment from 'moment';

function InventoryDetail() {
  const product = useLocation();
  const history = useHistory();

  const id = product.state.detail[0];

  const [loadingData, setLoadingData] = useState(true);
  const [formData, updateFormData] = useState([]);
  const [historyData, updateHistoryData] = useState([]);
  const [checked, setChecked] = useState();
  const [colour, setColourData] = useState("");
  const [colourData, setData] = useState("");
  const [supplier, setSupplierData] = useState("");
  const [supplierData, setSuppData] = useState("");
  const [newQuant, setNewQuat] = useState("");

  useEffect(() => {
    console.log("location " + id);

    async function getData() {
      await axiosInstance
        .get("products/" + product.state.detail[0])
        .then((res) => {
          updateFormData({
            ...formData,
            ["productCode"]: res.data.productCode,
            // ["description"]: res.data.description,
            ["active"]: res.data.active,
            ["quantity"]: res.data.quantity,
            ["colourCode"]: res.data.colourCode,
            ["minquantity"]: res.data.minquantity,
          });
          // console.log(res.data.history);
          updateHistoryData(res.data.history);
        });
    }

    async function getColour() {
      await axiosInstance.get(Colours_URL).then((response) => {
        // check if the data is populated
        // console.log("colour data: " + response.data);
        setData(response.data);
        // you tell it that you had the result
        setLoadingData(false);
      });
    }

    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
      // getSupplier();
      getColour();
      // console.log(data);
    }

    // console.log("boop: " + formData);
  }, []);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
    console.log(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    // console.log(data.history);

    axiosInstance.put(`products/` + product.state.detail[0], {
      productCode: formData.productCode,
      // description: formData.description,
      supplier: formData.supplier,
      quantity: newQuant,
      colourCode: formData.colourCode,
      // active: checked,
    });
    history.push({
      pathname: Routes.Inventory.path,
    });
    window.location.reload(false);
    console.log(newQuant);
  };


  const handleSubtract = (e) => {
    var amount = e.target.value.trim();
    // console.log(newQuant);
    var oldQuant = formData.quantity;

    var updatedQuant = oldQuant - amount;

    // console.log(newQuant);
    setNewQuat(updatedQuant);
  }

  const handleAddition = (e) => {
    var amount = e.target.value.trim();
    // console.log(newQuant);
    var oldQuant = formData.quantity;

    var updatedQuant = Number(oldQuant) + Number(amount);

    // console.log(newQuant);
    setNewQuat(updatedQuant);
  }

  const options = {
    filter: true,
    responsive: "stacked",
    selectableRows: false,
    filter: false,
    download: false,
    print: false,
    viewColumns: false,
  };

  const columns = [
    {
      name: "Change Date",
      options: {
        filter: true,
      },
    },
    {
      name: "Change Reason",
      options: {
        filter: true,
      },
    },
    {
      name: "New Quantity",
      options: {
        display: true,
      },
    },
    {
      name: "Change Reason",
      options: {
        filter: true,
      },
    },
    {
      name: "Revert",
      options: {
        display: true,
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
        <h4 class="h4">Edit: {formData.productCode}</h4>
        <div class="button-container">
          <BSTButton
            icon={<FontAwesomeIcon icon={faPlusCircle} />}
            title="Cancel"
            path={Routes.Inventory.path}
          ></BSTButton>
        </div>
      </div>

      <div className="edit-product-container">
        {loadingData ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="view-container">
            <div className="left-container">
              <form className="edit-form">
                <Form.Group className="mb-3" controlId="productCode">
                  <Form.Label>Product Code</Form.Label>
                  <Form.Control
                    defaultValue={formData.productCode}
                    onChange={handleChange}
                    id="productCode"
                    name="productCode"
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    defaultValue={formData.description}
                    onChange={handleChange}
                    id="description"
                    name="description"
                  />
                </Form.Group> */}

                <Form.Group>
                  <Form.Label>Colour</Form.Label>
                    <Select
                  fullWidth
                  variant="outlined"
                  defaultValue={formData.colourCode}
                  value={colour}
                  onChange={(e) => setColourData(e.target.value)}
                >
                  {colourData.map((item, i) => (
                    <MenuItem key={i} value={item.colour}>
                      {item.colour}
                    </MenuItem>
                  ))}
                </Select>
                </Form.Group>
              

                <Form.Group className="mb-3" controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    defaultValue={formData.quantity}
                    onChange={handleChange}
                    id="quantity"
                    name="quantity"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="quantity">
                  <Form.Label>Sub Quantity</Form.Label>
                  <Form.Control
                    onChange={handleSubtract}
                    id="quantity"
                    name="quantity"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="quantity">
                  <Form.Label>Add Quantity</Form.Label>
                  <Form.Control
                    onChange={handleAddition}
                    id="quantity"
                    name="quantity"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="minquantity">
                  <Form.Label>minquantity</Form.Label>
                  <Form.Control
                    defaultValue={formData.minquantity}
                    onChange={handleChange}
                    id="minquantity"
                    name="minquantity"
                  />
                </Form.Group>

                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  color="primary"
                  // className={styles.customButton}
                >
                  Edit {formData.productCode}
                </Button>
              </form>
            </div>
            <div className="right-container">
              <div>
                <MuiTable
                  title={"Product List"}
                  data={historyData.map((item) => {
                    var newDate = moment(item.history_date).format('MMMM Do YYYY, h:mm:ss a')
                    // console.log(item)
                    return [
                      newDate,
                      item.history_type,
                      item.quantity
                      
                    ];
                  })}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryDetail;
