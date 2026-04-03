import React from "react";
import MUIDataTable from "mui-datatables";
import { Typography } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

function DataTable({
  title,
  data,
  columns,
  options = {
    filterType: "multiselect",
    selectableRows: "none",
    elevation:'0'
  },
}) {

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableToolbar: {
          root: {
            backgroundColor: "#efefef",
          },
        },
        MUIDataTableHeadRow: {
          root: {
            backgroundColor: "#efefef",
          },
        },
        
      },
    });

  return (
    <div>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={<Typography variant="h5"> {title}</Typography>}
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default DataTable;
