import { BottomNavigation } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    customButton: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "2.5px",
      fontWeight: "500",
      color: "#fff",
      backgroundColor: "#1A4875",
      border: "none",
      borderRadius: "45px",
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease 0s",
      cursor: "pointer",
      outline: "none",
      height: "45px",
      "&:hover": {
        backgroundColor: "#fff",
        boxShadow: " 0px 15px 20px rgba(26, 72, 117, 0.4)",
        color: "#1A4875",
        outline: "none",
      },
    },
    buttonIcon: {
      fontSize: "20px"
    },
    email: {
      paddingBottom: "2%"
    },
    password: {
      paddingBottom: "5%"
    }
  }));
  
