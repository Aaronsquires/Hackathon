import React, { useState, useEffect } from "react";
import BSTButton from "../../../../../Components/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross } from "@fortawesome/free-solid-svg-icons";
import { Routes } from "../../../../../Utils/routes";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import TextField from "@material-ui/core/TextField";
import axiosInstance from "../../../../../Services/axiosInstance";
import Form from "react-bootstrap/Form";

import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import axios from "axios";
import { Colours_URL } from "../../../../../Utils/constants";

function CreateProduct(props) {
  const history = useHistory();

  const initialFormData = Object.freeze({
    productCode: "",
    description: "",
    supplier: "",
    stockStatus: false,
    minquantity: "",
    quantity: 0,
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [newFormData, updateNewFormData] = useState(initialFormData);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [colour, setColourData] = useState("");

  useEffect(() => {
    async function getData() {
      await axiosInstance.get(Colours_URL).then((response) => {
        // check if the data is populated
        console.log("data: " + response.data);
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

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace

      [e.target.name]: e.target.value.trim(),
    });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    updateNewFormData({
      productCode: formData.productCode,
      description: formData.description,
      supplier: formData.supplier,
      colourcode: colour,
      minquantity: formData.minquantity,
    });

    e.preventDefault();
    axiosInstance.post(`products/create`, {
      productCode: formData.productCode,
      description: formData.description,
      supplier: formData.supplier,
      colourCode: colour,
      stockStatus: formData.stockStatus,
      minquantity: formData.minquantity,
      quantity: formData.quantity,
    });
    history.push({
      pathname: Routes.SettingsProduct.path,
    });
    window.location.reload();

    // console.log(newFormData);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="edit-form">
          {/*  */}
          <TextField
            // variant="outlined"
            // required
            fullWidth
            id="productCode"
            label="Product"
            name="productCode"
            autoComplete="productCode"
            onChange={handleChange}
          />

          {/*  */}
          <TextField
            // variant="outlined"
            // required
            fullWidth
            id="description"
            label="description"
            name="description"
            autoComplete="description"
            onChange={handleChange}
          />

          {/*  */}
          <Select
            variant="outlined"
            defaultValue="Colour Code"
            value={colour}
            onChange={(e) => setColourData(e.target.value)}
          >
            {data.map((item, i) => (
              <MenuItem key={i} value={item.colour}>
                {item.colour}
              </MenuItem>
            ))}
          </Select>

          {/*  */}
          <TextField
            // variant="outlined"
            // required
            fullWidth
            id="supplier"
            label="supplier"
            name="supplier"
            autoComplete="supplier"
            onChange={handleChange}
          />

          {/*  */}
          <TextField
            // variant="outlined"
            // required
            fullWidth
            id="minquantity"
            label="minquantity"
            name="minquantity"
            autoComplete="minquantity"
            onChange={handleChange}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button onClick={handleSubmit}>Create Product</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateProduct;
