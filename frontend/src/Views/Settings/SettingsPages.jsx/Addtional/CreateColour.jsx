import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import TextField from "@material-ui/core/TextField";
import Form from "react-bootstrap/Form";

import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import axios from "axios";
import axiosInstance from "../../../../Services/axiosInstance";
import { Routes } from "../../../../Utils/routes";
import BSTButton from "../../../../Components/Buttons/Button";



function CreateColour(props) {
  const history = useHistory();

  const initialFormData = Object.freeze({
    colourCode: "",
    colour: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [colour, setColourData] = useState("");


  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace

      [e.target.name]: e.target.value.trim(),
    });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post(`colours/create`, {
      colourCode: formData.colourCode,
      colour: formData.colour,
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
          Create Colour
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="edit-form">
          {/*  */}
          <TextField
            fullWidth
            id="colourCode"
            label="Colour Code"
            name="colourCode"
            autoComplete="colourCode"
            onChange={handleChange}
          />

          {/*  */}
          <TextField
            fullWidth
            id="colour"
            label="Colour Description"
            name="colour"
            autoComplete="colour"
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

export default CreateColour;
