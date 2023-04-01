import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import FileUpload from "@mui/icons-material/FileUpload";
import Save from "@mui/icons-material/Save";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";

import {
  randomAddress,
  randomCreatedDate,
  randomInt,
  randomQuantity,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";

let idCounter = 1;
const createRandomRow = () => {
  idCounter += 1;
  return { id: idCounter };
};

export default function BasicEditingGrid() {
  const data = [
    {
      id: 1,
      title: randomTraderName(),
      price: 25,
      quantity: randomQuantity(),
      date: randomCreatedDate(),
      gift: randomAddress(),
    },
  ];

  const [rows, setRows] = React.useState(() => data);

  const handleAddRow = () => {
    setRows((data) => [...data, createRandomRow()]);
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Box height={500}>
        <Button
          onClick={() => handleAddRow()}
          variant="text"
          color="inherit"
          size="small"
        >
          <Add fontSize="small" color="inherit" />
        </Button>
        <DataGrid
          rows={rows ?? []}
          columns={columns}
          pageSize={25}
          // rowsPerPageOptions={[5]}
        />
      </Box>
    </div>
  );
}

const onUpload = (e, row) => {
  e.stopPropagation();
  //do whatever you want with the row
  alert(
    `ürün kimligi: ${row.id} ve ürün bilgisi: ${row.title}, ${row.price} olan yeni bir icerik yükleyiniz.`
  );
};

const onSave = (e, row) => {
  e.stopPropagation();

  console.log(row);
};

const columns = [
  { field: "id", headerName: "No", width: 180, editable: false }, // data.fetchShopID.shop_id
  { field: "title", headerName: "Ürün", width: 300, editable: true }, // data.fetchShopID.shop_id
  { field: "price", headerName: "Fiyat", type: "number", editable: true }, // data.fetchShopID.shop_id
  { field: "quantity", headerName: "Adet", type: "number", editable: true },
  { field: "date", headerName: "Tarih", type: "date", editable: true },
  { field: "gift", headerName: "Hediye Ürün", width: 300, editable: true },

  {
    field: "upload",
    headerName: "",
    width: 80,
    renderCell: (params) => {
      return (
        <Button
          onClick={(e) => onUpload(e, params.row)}
          variant="contained"
          color="primary"
          size="small"
        >
          <FileUpload fontSize="small" />
        </Button>
      );
    },
  },
  {
    field: "save",
    headerName: "",
    width: 80,
    renderCell: (params) => {
      return (
        <Button
          onClick={(e) => onSave(e, params.row)}
          variant="contained"
          color="primary"
          size="small"
        >
          <Save fontSize="small" />
        </Button>
      );
    },
  },
  {
    field: "delete",
    headerName: "",
    width: 80,
    renderCell: (params) => {
      return (
        <Button
          onClick={(e) => onRemove(e, params.row)}
          variant="contained"
          color="secondary"
          size="small"
        >
          <Delete fontSize="small" />
        </Button>
      );
    },
  },
  //   {
  //     field: "dateCreated",
  //     headerName: "Date Created",
  //     type: "date",
  //     width: 180,
  //     editable: true,
  //   },
  //   {
  //     field: "lastLogin",
  //     headerName: "Last Login",
  //     type: "dateTime",
  //     width: 220,
  //     editable: true,
  //   },
];

// const rows = [
//   {
//     id: 1,
//     name: randomTraderName(),
//     age: 25,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 2,
//     name: randomTraderName(),
//     age: 36,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 3,
//     name: randomTraderName(),
//     age: 19,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 4,
//     name: randomTraderName(),
//     age: 28,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 5,
//     name: randomTraderName(),
//     age: 23,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
// ];
