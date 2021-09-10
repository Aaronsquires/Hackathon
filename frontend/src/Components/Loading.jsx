import React, { useEffect, useState, useRef } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../Utils/styles/loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <CircularProgress size={"70px"} />
      <p className="loader-text">Loading Data Please wait...</p>
    </div>
  );
};

export default Loading;
