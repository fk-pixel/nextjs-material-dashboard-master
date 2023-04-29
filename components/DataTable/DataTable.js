import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Tooltip, Avatar } from "@mui/material";
import FileUpload from "@mui/icons-material/FileUpload";
import Save from "@mui/icons-material/Save";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import AutocompleteEditCell from "../Autocomplete/AutocompleteEditCell.js";

import { randomTraderName } from "@mui/x-data-grid-generator";
import {
  PANELTYPE_OPTIONS,
  PRODUCTMAINTYPE_OPTIONS,
  ROLLTYPE_OPTIONS,
  SHIPPING_OPTIONS,
} from "../../pages/admin/order-form.js";

let idCounter = 1;
const createRandomRow = () => {
  idCounter += 1;
  return { id: idCounter };
};

// var getItems = JSON.parse(localStorage.getItem("orders"));
// var getItems2 = window.localStorage.getItem("orders");

export default function BasicEditingGrid(props) {
  const { data, userData, onChangeDataTable } = props;

  var newData = getDataWithAvatar(data);

  const onUpload = (e, row) => {
    e.stopPropagation();

    alert(
      `Ürün kimligi: ${row.id} ve ürün bilgisi: ${row.title}, ${row.price} olan yeni bir icerik yükleyiniz.`
    );
  };

  const onSave = (e, row) => {
    e.stopPropagation();

    // const editedCellIndex = newData.indexOf(
    //   newData.find((x) => x.id === row.id) || newData[newData.length]
    // );
    // newData[editedCellIndex] = [...newData[editedCellIndex], row];

    // if (editedCellIndex !== -1) {
    // setChartConfigurations([...chartConfigurations]);
    // }
    const notEditedData = newData.filter((x) => x.id !== row.id);

    const editedData = {
      id: row.id,
      number: row.number,
      store: row.store,
      username: row.username,
      product: row.product,
      productFile: row.productFile,
      productSize: row.size,
      productSizeWidth: null,
      productSizeHeight: null,
      productMainType: row.productMainType,
      productSubType: row.productSubType,
      productCargoType: row.productCargoType,
      gift1: row.gift,
      gift1File: row.gift1File,
      gift1Size: row.giftSize,
      gift1SizeWidth: null,
      gift1SizeHeight: null,
      gift2: row.gift,
      gift2File: row.gift2File,
      gift2Size: row.giftSize,
      gift2SizeWidth: null,
      gift2SizeHeight: null,
      cost: row.cost,
      packagingCost: row.packagingCost,
      shippingCost: row.shippingCost,
      shippingLabel: row.shippingLabel,
      description: row.description,
      file: null,
      status: row.status,
      price: row.price,
      createdDate: row.createdDate,
      createdBy: row.createdBy,
    };

    const afterEditData = localStorage.setItem(
      "orders",
      JSON.stringify([...notEditedData, editedData])
    );

    onChangeDataTable(afterEditData);
  };

  const onRemove = (e, row) => {
    e.stopPropagation();

    const afterRemoveData = newData.filter((x) => x.id !== row.id);

    localStorage.setItem("orders", JSON.stringify(afterRemoveData));

    onChangeDataTable(afterRemoveData);
  };

  // const user = JSON.parse(localStorage.getItem("userData"));
  // const userData = localStorage.getItem("userData");

  function getChipProps(params) {
    if (params.value === "RED") {
      return {
        icon: <WarningIcon style={{ fill: red[500] }} />,
        label: params.value,
        style: {
          borderColor: red[500],
        },
      };
    } else {
      return {
        icon: <CheckCircleIcon style={{ fill: blue[500] }} />,
        label: params.value,
        style: {
          borderColor: blue[500],
        },
      };
    }
  }

  function getOptionProps(params) {
    if (params.value === "RED") {
      return {
        icon: <WarningIcon style={{ fill: red[500] }} />,
        label: params.value,
        style: {
          borderColor: red[500],
        },
      };
    } else {
      return {
        icon: <CheckCircleIcon style={{ fill: blue[500] }} />,
        label: params.value,
        style: {
          borderColor: blue[500],
        },
      };
    }
  }

  function getNewDataByUser() {
    return newData !== undefined
      ? newData.filter((x) => x.createdBy === userData.username)
      : [];
  }

  const newDataByUser = getNewDataByUser();

  const dataByRole =
    userData !== null || userData !== undefined
      ? userData?.role === "admin"
        ? newData
        : newDataByUser
      : {};

  const columns = [
    { field: "id", headerName: "ID", width: 50, editable: false },
    {
      field: "avatar",
      headerName: "",
      width: 60,
      renderCell: (params) => {
        return (
          <Tooltip title={"Kullanici"}>
            <Avatar sx={{ bgcolor: "warning.main" }} alt="Remy Sharp">
              {params.value}
            </Avatar>
          </Tooltip>
        );
      },
    },
    {
      field: "store",
      headerName: "Magaza",
      // width: 100,
      editable: true,
    },
    {
      field: "product",
      headerName: "Ürün",
      width: 200,
      editable: true,
    },
    {
      field: "productSize",
      headerName: "Ürün Ölcüsü",
      width: 120,
      // type: "number",
      editable: true,
    },
    {
      field: "productMainType",
      headerName: "Ürün Ana Tipi",
      // width: 100,
      editable: true,
      renderEditCell: (params) => {
        return (
          <AutocompleteEditCell
            {...params}
            value={params.row.productMainType}
            options={PRODUCTMAINTYPE_OPTIONS}
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
      field: "productSubType",
      headerName: "Ürün Alt Tipi",
      // width: 100,
      editable: true,
      renderEditCell: (params, onChange) => {
        return (
          <AutocompleteEditCell
            {...params}
            value={params.row.productSubType}
            options={[...PANELTYPE_OPTIONS, ...ROLLTYPE_OPTIONS]}
            getOptionLabel={(o) => o.label || ""}
            freeSolo={true}
            autoHighlight={false}
            multiple={false}
            disableClearable={true}
          />
        );
      },
      // renderCell: (params) => {
      //   return (
      //     <Chip
      //       variant="outlined"
      //       color="primary" /* {...getChipProps(params)} */
      //     />
      //   );
      // },
    },
    {
      field: "productCargoType",
      headerName: "Ürün Kargo Tipi",
      width: 120,
      editable: true,
      renderEditCell: (params) => {
        return (
          <AutocompleteEditCell
            {...params}
            value={params.row.productCargoType}
            options={SHIPPING_OPTIONS}
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
      field: "gift1",
      headerName: "Hediye Ürün1",
      width: 200,
      editable: true,
    },
    {
      field: "gift1Size",
      headerName: "Hediye Ürün1 Ölcü",
      width: 140,
      // type: "number",
      editable: true,
    },
    {
      field: "gift2",
      headerName: "Hediye Ürün2",
      width: 200,
      editable: true,
    },
    {
      field: "gift2Size",
      headerName: "Hediye Ürün2 Ölcü",
      width: 140,
      // type: "number",
      editable: true,
    },
    { field: "cost", headerName: "Maliyet", type: "number", editable: true },
    {
      field: "packagingCost",
      headerName: "Paket Maliyeti",
      type: "number",
      editable: true,
    },
    {
      field: "shippingCost",
      headerName: "Kargo Maliyeti",
      width: 120,
      type: "number",
      editable: true,
    },
    {
      field: "shippingLabel",
      headerName: "Kargo Etiketi",
      width: 100,
      type: "link",
      editable: true,
    },
    {
      field: "price",
      headerName: "Satis Tutari",
      type: "number",
      editable: true,
    },
    {
      field: "description",
      headerName: "Aciklama",
      width: 200,
      editable: true,
    },
    {
      field: "status",
      headerName: "Statü",
      width: 150,
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
      field: "createdDate",
      headerName: "Kayit Tarihi",
      type: "dateTime",
      valueGetter: ({ value }) => new Date(value),
      editable: false,
    },
    {
      field: "createdBy",
      headerName: "Olusturan",
      // width: 300,
      editable: true,
    },
    {
      field: "upload",
      headerName: "",
      width: 70,
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
      width: 70,
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
      width: 70,
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
  ];

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
          showCellVerticalBorder
          getRowId={(row) => row.id}
          rows={dataByRole ?? []}
          columns={columns}
          // pageSize={25}
          rowsPerPageOptions={[25]}
        />
      </Box>
    </div>
  );
}

export function getShortcut() {
  const traderName = randomTraderName();
  const firstLetter = traderName?.split(" ")[0][0];
  const secondLetter = traderName?.split(" ")[1][0];
  const shortcut = firstLetter + secondLetter;

  return { traderName, shortcut };
}

export function getDataWithAvatar(data) {
  if (data !== undefined && data !== null) {
    const newData = [];

    for (const i of data) {
      const firstLetter = i.username?.split(" ")[0][0];

      const secondLetter =
        i.username?.split(" ")[1] !== undefined
          ? i.username?.split(" ")[1][0]
          : "";

      const shortcut = firstLetter + secondLetter;

      newData.push({ ...i, avatar: shortcut });
    }
    return newData;
  }

  return;
}

export const STATUS_OPTIONS = [
  { id: "canceledAfterProduction", label: "🔴 Üretimden sonra iptal edildi" },
  { id: "canceledBeforeProduction", label: "🟠 Üretimden önce iptal edildi" },
  { id: "sentToProduction", label: "🟡 Üretime gönderildi" },
  { id: "shipped", label: "🟢 Kargolandi" },
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

/* async local storage data set and get example 

const [veggie, setVeggie] = useState();
  useEffect(() => {
    getVeggie();
  }, []);

 const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const res = await fetch(apiUrl);
      const data = await res.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log("app-data", data.recipes);
    }
  };


*/

// const data = [
//   {
//     id: 1,
//     title: traderName,
//     price: 25,
//     quantity: randomQuantity(),
//     saleDate: randomCreatedDate(), //moment(randomCreatedDate(), "YYYY-MM-DD"),
//     gift: randomAddress(),
//     avatar: shortcut,
//     status: "🟡 Üretime gönderildi",
//     createdDate: new Date(),
//   },
// ];

// const [rows, setRows] = React.useState(newData);
// const [rows, setRows] = React.useState(() => getItems);

// const handleAddRow = () => {
//   setRows((data) => [...data, createRandomRow()]);
// };
