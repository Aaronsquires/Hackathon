import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    customButton: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "2.5px",
      fontWeight: "500",
      color: "#000",
      backgroundColor: "#fff",
      border: "none",
      borderRadius: "45px",
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease 0s",
      cursor: "pointer",
      outline: "none",
      height: "45px",
      "&:hover": {
        backgroundColor: "#1A4875",
        boxShadow: " 0px 15px 20px rgba(26, 72, 117, 0.4)",
        color: "#fff",
        outline: "none",
      },
    },
    buttonIcon: {
      fontSize: "20px"
    }
  }));
  
