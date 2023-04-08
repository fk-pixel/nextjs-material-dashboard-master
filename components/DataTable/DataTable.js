import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Button, Box, Tooltip, Avatar } from "@mui/material";
import FileUpload from "@mui/icons-material/FileUpload";
import Save from "@mui/icons-material/Save";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import AutocompleteEditCell from "../../components/AutocompleteEditCell/AutocompleteEditCell.js";
import moment from "moment";

import {
  randomAddress,
  randomCreatedDate,
  randomInt,
  randomQuantity,
  randomTraderName,
  randomUpdatedDate,
  randomUserName,
} from "@mui/x-data-grid-generator";

let idCounter = 1;
const createRandomRow = () => {
  idCounter += 1;
  return { id: idCounter };
};

export default function BasicEditingGrid() {
  const { traderName, shortcut } = getShortcut();

  const data = [
    {
      id: 1,
      title: traderName,
      price: 25,
      quantity: randomQuantity(),
      saleDate: randomCreatedDate(), //moment(randomCreatedDate(), "YYYY-MM-DD"),
      gift: randomAddress(),
      avatar: shortcut,
      status: "🟡 Beklemede",
      createdDate: new Date(),
    },
  ];

  const [rows, setRows] = React.useState(() => data);

  const handleAddRow = () => {
    setRows((data) => [...data, createRandomRow()]);
  };

  return (
    <div style={{ height: 850, width: "100%" }}>
      <Box height={850}>
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
    `Ürün kimligi: ${row.id} ve ürün bilgisi: ${row.title}, ${row.price} olan yeni bir icerik yükleyiniz.`
  );
};

const onSave = (e, row) => {
  e.stopPropagation();

  console.log(row);
};

function getShortcut() {
  const traderName = randomTraderName();
  const firstLetter = traderName?.split(" ")[0][0];
  const secondLetter = traderName?.split(" ")[1][0];
  const shortcut = firstLetter + secondLetter;

  return { traderName, shortcut };
}

const STATUS_OPTIONS = [
  { id: "rejected", label: "🔴 Reddedildi" },
  { id: "inProgress", label: "🟡 Beklemede" },
  { id: "completed", label: "🟢 Gönderildi" },
];

const columns = [
  { field: "id", headerName: "No", width: 50, editable: false }, // data.fetchShopID.shop_id
  {
    field: "avatar",
    headerName: "",
    width: 80,
    renderCell: (params) => {
      return (
        <Tooltip title={"Magaza"}>
          <Avatar sx={{ bgcolor: "warning.main" }} alt="Remy Sharp">
            {params.value}
          </Avatar>
        </Tooltip>
      );
    },
  },
  { field: "title", headerName: "Ürün", width: 300, editable: true }, // data.fetchShopID.shop_id
  { field: "price", headerName: "Fiyat", type: "number", editable: true }, // data.fetchShopID.shop_id
  { field: "quantity", headerName: "Adet", type: "number", editable: true },
  {
    field: "saleDate",
    headerName: "Satis Tarihi",
    type: "date",
    editable: true,
  },
  { field: "gift", headerName: "Hediye Ürün", width: 300, editable: true },
  {
    field: "giftPrice",
    headerName: "Hediye Ürün Fiyat",
    type: "number",
    width: 180,
    editable: true,
  },
  {
    field: "giftQuantity",
    headerName: "Hediye Ürün Adet",
    type: "number",
    width: 180,
    editable: true,
  },
  {
    field: "status",
    headerName: "Statü",
    width: 180,
    editable: true,
    // cellEditorParams: {
    //   do: "fthbtl",
    // },
    renderEditCell: (params) => {
      return (
        <AutocompleteEditCell
          {...params}
          value={params.row.status}
          options={STATUS_OPTIONS}
          getOptionLabel={(o) => o.label || ""}
          freeSolo={true}
          autoHighlight={false}
          multiple={false}
          disableClearable={true}
        />
      );
    },
  },
  {
    field: "totalPrice",
    headerName: "Toplam Fiyat",
    type: "number",
    editable: true,
  },
  {
    field: "createdDate",
    headerName: "Kayit Tarihi",
    type: "date",
    editable: false,
  },
  {
    field: "upload",
    headerName: "",
    width: 80,
    renderCell: (params) => {
      return (
        <Tooltip title={"Belge ekle"}>
          <Button
            onClick={(e) => onUpload(e, params.row)}
            variant="contained"
            color="primary"
            size="small"
          >
            <FileUpload fontSize="small" />
          </Button>
        </Tooltip>
      );
    },
  },
  {
    field: "save",
    headerName: "",
    width: 80,
    renderCell: (params) => {
      return (
        <Tooltip title={"Siparisi kaydet"}>
          <Button
            onClick={(e) => onSave(e, params.row)}
            variant="contained"
            color="primary"
            size="small"
          >
            <Save fontSize="small" />
          </Button>
        </Tooltip>
      );
    },
  },
  {
    field: "delete",
    headerName: "",
    width: 80,
    renderCell: (params) => {
      return (
        <Tooltip title={"Siparisi sil"}>
          <Button
            onClick={(e) => onRemove(e, params.row)}
            variant="contained"
            color="secondary"
            size="small"
          >
            <Delete fontSize="small" />
          </Button>
        </Tooltip>
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
