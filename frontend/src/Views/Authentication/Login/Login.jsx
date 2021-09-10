import React, { useState } from "react";
import { authInstance } from "../../../Services/authentication";
import { useHistory } from "react-router-dom";
import "./loginStyles.css";
import { useStyles } from "./loginStyles";

// Button imports
import BSTButton from "../../../Components/Buttons/Button";

//MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SubmitButton from "../../../Components/Buttons/submitButton";

function SignIn() {
  const history = useHistory();
  const styles = useStyles();

  // Holds form data
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  //?
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // * handles post request to login to django server via JWT token
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    authInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        // splits the user email at the "@" getting the first part of email -
        // All work emails first substring will be the users name
        const setUsername = formData.email.substring(
          0,
          formData.email.indexOf("@")
        );

        // sets items to localstorage
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        localStorage.setItem("username", setUsername);
        localStorage.setItem("loggedIn", "True");
        console.log(localStorage.getItem("loggedIn"));
        authInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        history.push("/dashboard");
        //console.log(res);
        //console.log(res.data);
      });
  };

  return (
    <div className="login-wrapper">
      {/* <div className="login-container"> */}
      <div className="form-container">
        <Typography component="h1" variant="h4" className="headerTitle">
          Clivnars Inventory Management
        </Typography>
        <form className="form" noValidate>
          <TextField
            className={styles.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            className={styles.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.customButton}
			onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
}

export default SignIn;
