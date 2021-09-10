import { makeStyles } from "@material-ui/core/styles";

export const drawerStyles = makeStyles({
    paper: {
      top: "60px !important",
      width: "250px !important",
      boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.1)",
    },
    drawer: {
      width: "250px",
      height: "calc(100vh - 60px)",
      backgroundColor: "#ffffff",
      top: "60px",
      position: "sticky",
      // position: "fixed",
    },
    active: {
        backgroundColor: "violet",
    }
  }
);