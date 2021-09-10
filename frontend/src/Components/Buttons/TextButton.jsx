import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    color: "#ffffff",
    textDecoration: "none",
    "&:hover, &:focus": {
      color: "white",
    },
  },

  buttonRoot: {
    margin: "0px",
  },
}));

export default function TextButtons(props) {
  const classes = useStyles();
  const [title] = useState(props.title);
  const [path] = useState(props.path);

  return (
    <div className={classes.root}>
      <div className={classes.buttonRoot}>
        <Link className={classes.button} to={path}>
          {title}
        </Link>
      </div>
    </div>
  );
}
