import React from "react";
import { MDBDataTable } from "mdbreact";
import { Inventory_URL } from "../Utils/constants";

export default function dataTables() {
  return <MDBDataTable data={Inventory_URL} striped bordered hover />;
}
