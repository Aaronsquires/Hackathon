import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../../../Services/axiosInstance";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import BSTButton from "../../../../../Components/Buttons/Button";
import { Routes } from "../../../../../Utils/routes";
import Loading from "../../../../../Components/Loading";
import "./ProductDetailStyles.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function ProductDetail() {
  const product = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const initialFormData = Object.freeze({
    id: "",
    productCode: "",
    description: "",
    supplier: "",
    // history: [],
  });

  const [loadingData, setLoadingData] = useState(true);
  const [formData, updateFormData] = useState(initialFormData);
  const [checked, setChecked] = useState();

  useEffect(() => {
    // console.log(product.pathname); // result: '/settings/product/edit/:id'
    // console.log(product.state.detail); // result: 'rowData Array via index'
    console.log("id " + (id + 1));
    console.log("location " + product.state.detail[0]);

    async function getData() {
      await axiosInstance
        .get("products/" + product.state.detail[0])
        .then((res) => {
          updateFormData({
            ...formData,
            ["productCode"]: res.data.productCode,
            ["description"]: res.data.description,
            ["supplier"]: res.data.supplier,
            ["active"]: res.data.active,
            ["colourCode"]: res.data.colourCode,
            ["minquantity"]: res.data.minquantity,
          });
          console.log(res.data);
          // console.log(formData.history.description);
          setLoadingData(false);
          setChecked(res.data.active);
          console.log(res.data.active);
        });
    }

    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, []);

  const toggleChecked = () => {
    setChecked((checked) => !checked);
    console.log(checked);
  };

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
    console.log(formData);

    axiosInstance.put(`products/` + product.state.detail[0], {
      productCode: formData.productCode,
      description: formData.description,
      supplier: formData.supplier,
      // active: checked,
    });
    history.push({
      pathname: Routes.SettingsProduct.path,
    });
    window.location.reload(false);
  };

  const handleDelete = () => {
    axiosInstance.delete(`products/` + product.state.detail[0]);
    history.push({
      pathname: Routes.SettingsProduct.path,
    });
  };

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
            path={Routes.SettingsProduct.path}
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
                <TextField
                  // variant="outlined"
                  // required
                  fullWidth
                  id="productCode"
                  label="Product"
                  name="productCode"
                  autoComplete="productCode"
                  value={formData.productCode}
                  onChange={handleChange}
                />
                <TextField
                  // variant="outlined"
                  // required
                  fullWidth
                  id="description"
                  label="description"
                  name="description"
                  autoComplete="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <TextField
                  // variant="outlined"
                  // required
                  fullWidth
                  id="supplier"
                  label="supplier"
                  name="supplier"
                  autoComplete="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                />

                {/* <div>{formData.active.toString()}</div> */}
                {/* <input
                  type="checkbox"
                  checked={checked}
                  onChange={toggleChecked}
                /> */}

                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  color="primary"
                  // className={styles.customButton}
                >
                  Edit {formData.productCode}
                </Button>
                
                <Button
                  onClick={handleDelete}
                  fullWidth
                  variant="contained"
                  color="primary"
                  // className={styles.customButton}
                >
                  Delete {formData.productCode}
                </Button>
              </form>
              {/* <div>{formData.productCode}</div>
              <div>{formData.supplier}</div>
              <div>{formData.description}</div> */}
            </div>
            <div className="right-container"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
