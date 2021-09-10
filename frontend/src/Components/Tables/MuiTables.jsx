import React from "react";
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider, createTheme } from "@material-ui/core";

class MuiTable extends React.Component {
  getMuiTheme = () =>
    createTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#AAF",
            height: "inherit",
          },
          paper: {
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
            borderRadius: "0.3vh",
            maxHeight: "none",
            height: "calc(100% - 128px)"
            // padding: "1%"
          },
        },
        MuiToolbar: {
          root: {
            backgroundColor: "#F7F7F7",
            borderBottom: "1px solid #BDBDBD",
            borderRadius: "0.5vh 0.5vh 0 0",
          },
        },
        MuiTableCell: {
          head: {
            // backgroundColor: "purple",
          },
          root: {
              padding: "8px",
              paddingLeft: "2%",
              '&:nth-child(2)': {
                
              }
          }

        },
        MUIDataTableHeadCell: {
          root: {
            '&:nth-child(1)': {
              // width: "120px",
              textAlign: "center"

              
            },
          }
        },
        MuiTypography:{
          body1: {
            '&:nth-child(1)': {
              textAlign: "center"
            },
          }
        },
        MuiTableRow:{
            root: {
                // backgroundColor: "#AAF",
                '&:nth-child(odd)': {
                  backgroundColor: "#1a48752d;"
                }
            },
            footer: {
                backgroundColor: "#F7F7F7 !important",
            }


        },
        MuiDataTableSelectCell: {
          headerCell: {
            backgroundColor: "blue",
          },
        },
        MuiTableFooter: {
          root: {
            backgroundColor: "#F7F7F7 !important",
            borderTop: "1px solid #BDBDBD",
            "& .MuiToolbar-root": {
                backgroundColor: "#F7F7F7",
                borderBottom: "none",
                textAlign: "center",
            },
          },
        },
      },
    });

  render() {
    const title = this.props.title;
    const data = this.props.data;
    const columns = this.props.columns;
    const options = this.props.options;

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={title}
            data={data}
            columns={columns}
            options={options}
          />
      </MuiThemeProvider>
    );
  }
}

export default MuiTable;
