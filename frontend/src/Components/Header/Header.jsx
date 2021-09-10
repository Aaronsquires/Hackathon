import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import './headerStyles.css'
import TextButtons from '../Buttons/TextButton';
import { pink } from '@material-ui/core/colors';



export const appbarHeight = 60;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar: {
      height: appbarHeight,
      backgroundColor: "#1A4875",
  },
  textButton: {
    color: "pink",

  }
}));

export default function DenseAppBar() {
  const classes = useStyles();
  const username = localStorage.getItem('username');

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
          <div className="header-container">
            <div className="header-item-1">
              <TextButtons title="Logout" path={'/Logout'} className={classes.textButton}/>
            </div>
            <div className="header-item-2">
              Clivnars Inventory Management
            </div>
            <div className="header-item-3">
              {capitalizeFirstLetter(username)}
            </div>
          </div>
      </AppBar>
    </div>
  );
}