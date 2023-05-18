import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TextInput from "components/TextInput/TextInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { FileUpload } from "components/FileUpload/FileUpload.js";
// import AutocompleteEditCell from "components/AutocompleteEditCell/AutocompleteEditCell.js";
import {
  Autocomplete,
  FormControl,
  TextField,
  Tooltip,
  Collapse,
  IconButton,
} from "@mui/material";
import Button from "components/CustomButtons/Button.js";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Delete from "@mui/icons-material/Delete";

import { Button as MButton, Box } from "@mui/material";
import avatar from "assets/img/faces/marc.jpg";
import AutocompleteForm from "../../components/Autocomplete/AutocompleteForm";
import TextForm from "../../components/TextForm/TextForm";
import { uniqueId } from "lodash";
import { isDeepEqual } from "@mui/x-data-grid/internals";
import { Typography } from "@material-ui/core";
import { Upload } from "@mui/icons-material";
import { createTheme } from "@mui/material/styles";

// const tema = createTheme({
//   status: {
//     danger: "#e53e3e",
//   },
//   palette: {
//     primary: {
//       main: "#0971f1",
//       darker: "#053e85",
//     },
//     neutral: {
//       main: "#64748B",
//       contrastText: "#fff",
//     },
//   },
// });

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const fileUploadProp = {
  accept: "image/*",
  onChange: (event) => {
    if (event.target.files !== null && event.target?.files?.length > 0) {
      console.log(`Saving ${event.target.value}`);
    }
  },
  onDrop: (event) => {
    console.log(`Drop ${event.dataTransfer.files[0].name}`);
  },
};

function selectSubOptions(mainOption) {
  switch (mainOption) {
    case "Panel":
      return PANELTYPE_OPTIONS;

    case "Rulo":
      return ROLLTYPE_OPTIONS;

    default:
      return [{ id: "", label: "" }];
  }
}

function selectShippingOptions(mainOption) {
  switch (mainOption) {
    case "Panel":
      return SHIPPING_OPTIONS;

    default:
      return [{ id: "", label: "" }];
  }
}

export const PRODUCTMAINTYPE_OPTIONS = [
  { id: "panel", label: "Panel" },
  { id: "roll", label: "Rulo" },
  { id: "glas", label: "Cam" },
];

export const PANELTYPE_OPTIONS = [
  { id: "thinHoop", label: "Ince Kasnak" },
  { id: "normalHoop", label: "Normal Kasnak" },
];

export const ROLLTYPE_OPTIONS = [
  { id: "normalRoll", label: "Normal Rulo" },
  { id: "NonReflectiveRoll", label: "Yansimasiz Rulo" },
  { id: "coatedPaper", label: "Kuse Kagit" },
];

export const SHIPPING_OPTIONS = [
  { id: "singlePanel", label: "Single Panel" },
  { id: "twoPanels", label: "Two Panels" },
  { id: "threePanels", label: "Three Panels" },
  { id: "threeBalancedPanels", label: "Three Balanced Panels" },
  { id: "fourPanels", label: "Four Panels" },
  { id: "fivePanels", label: "Five Panels" },
  { id: "fiveBalancedPanels", label: "Five Balanced Panels" },
];

function OrderForm() {
  const useStyles = makeStyles(styles);

  const classes = useStyles();

  const { reset } = useForm(); //TODO: Form validation a basla

  const fileInputProduct = React.useRef(null);
  const fileInputGift1 = React.useRef(null);
  const fileInputGift2 = React.useRef(null);

  const [orderState, setOrderState] = React.useState({
    id: uuidv4(),
    // number: uniqueId(),
    // store: "",
    // username: "",
    product: "",
    productFile: null,
    productSize: "",
    productSizeWidth: null,
    productSizeHeight: null,
    productMainType: "",
    productSubType: "",
    productCargoType: "",
    gift1: "",
    gift1File: null,
    gift1Size: "",
    gift1SizeWidth: null,
    gift1SizeHeight: null,
    gift2: "",
    gift2File: null,
    gift2Size: "",
    gift2SizeWidth: null,
    gift2SizeHeight: null,
    cost: null,
    packagingCost: null,
    shippingCost: null,
    description: "",
    cargoLabel: null,
    status: null,
    price: null,
    createdDate: new Date(),
    createdBy: "",
  });
  const [openProductFile, setOpenProductFile] = React.useState(false);
  const [openGift1File, setOpenGift1File] = React.useState(false);
  const [openGift2File, setOpenGift2File] = React.useState(false);
  const [isHoverProduct, setIsHoverProduct] = React.useState(false);
  const [isHoverGift1, setIsHoverGift1] = React.useState(false);
  const [isHoverGift2, setIsHoverGift2] = React.useState(false);

  function handleSubmit(e) {
    const userData = JSON.parse(localStorage.getItem("userData"));

    let orders = JSON.parse(localStorage.getItem("orders"));

    if (orders === null) {
      orders = [];
    } else {
      orders;
    }

    const newID =
      orders.find((x) => x.id === orderState.id) !== undefined
        ? uuidv4()
        : orderState.id;

    const newOrderState = {
      id: newID,
      product: orderState.product,
      productFile: orderState.productFile,
      productSize:
        orderState.productSizeWidth !== null ||
        orderState.productSizeHeight !== null
          ? orderState.productSizeWidth + "*" + orderState.productSizeHeight
          : null,
      productMainType: orderState.productMainType,
      productSubType: orderState.productSubType,
      productCargoType: orderState.productCargoType,
      gift1: orderState.gift1,
      gift1File: orderState.gift1File,
      gift1Size:
        orderState.gift1SizeWidth !== null ||
        orderState.gift1SizeHeight !== null
          ? orderState.gift1SizeWidth + "*" + orderState.gift1SizeHeight
          : null,
      gift2: orderState.gift2,
      gift2File: orderState.gift2File,
      gift2Size:
        orderState.gift2SizeWidth !== null ||
        orderState.gift2SizeHeight !== null
          ? orderState.gift2SizeWidth + "*" + orderState.gift2SizeHeight
          : null,
      createdBy: userData.username,
      cost: null,
      packagingCost: null,
      shippingCost: null,
      description: orderState.description,
      cargoLabel: orderState.cargoLabel,
      status: null,
      price: orderState.price,
      createdDate: new Date(),
    };

    localStorage.setItem("orders", JSON.stringify([...orders, newOrderState]));
  }

  function onUploadProduct(e) {
    e.preventDefault();
    fileInputProduct.current.click();
  }

  function onUploadGift1(e) {
    e.preventDefault();
    fileInputGift1.current.click();
  }

  function onUploadGift2(e) {
    e.preventDefault();
    fileInputGift2.current.click();
  }

  const handleChangeProduct = (event) => {
    // const fileReader = new FileReader();
    // fileReader.readAsText(event.target.files[0]);
    // fileReader.onload = (e) => {
    //   const result = e.target.result;
    //   const typeResult = typeof result;
    //   const content = JSON.parse(result);
    //   setOrderState({ productFile: content, ...orderState });
    // };
    setOrderState({
      ...orderState,
      productFile: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleChangeGift1 = (event) => {
    setOrderState({
      ...orderState,
      gift1File: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleChangeGift2 = (event) => {
    setOrderState({
      ...orderState,
      gift2File: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleMouseEnter = (image) => {
    if (image === "product") {
      setIsHoverProduct(true);
    }

    if (image === "gift1") {
      setIsHoverGift1(true);
    }

    if (image === "gift2") {
      setIsHoverGift2(true);
    }
  };

  const handleMouseLeave = (image) => {
    if (image === "product") {
      setIsHoverProduct(false);
    }

    if (image === "gift1") {
      setIsHoverGift1(false);
    }

    if (image === "gift2") {
      setIsHoverGift2(false);
    }
  };

  const removeImage = (image) => {
    if (image === "product") {
      setOrderState({ ...orderState, productFile: null });
    }

    if (image === "gift1") {
      setOrderState({ ...orderState, gift1File: null });
    }

    if (image === "gift2") {
      setOrderState({ ...orderState, gift2File: null });
    }
  };

  const removeForm = (e) => {
    e.preventDefault();
    setTriggerReset(true);
    // e.target.reset();
    document.getElementById("form").reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id={"form"}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Siparis Formu</h4>
                <p className={classes.cardCategoryWhite}>
                  Yeni bir siparis girin
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextForm
                      type="text"
                      label="Ürün Adi"
                      id="product"
                      fullWidth
                      value={orderState.product}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          product: e.target.value,
                        })
                      }
                    />
                    {orderState.productFile !== null && (
                      <>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpenProductFile(!openProductFile)}
                        >
                          {openProductFile ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <>
                              <KeyboardArrowDownIcon />
                              <Typography
                                style={{ marginLeft: 12, marginTop: 0 }}
                              >
                                {"Resmi göster"}
                              </Typography>{" "}
                            </>
                          )}
                        </IconButton>
                        <Collapse
                          in={openProductFile}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box display={"flex"}>
                            <img src={orderState.productFile} />
                            <Tooltip title={"Resmi sil"}>
                              <Delete
                                fontSize="small"
                                onMouseEnter={() => handleMouseEnter("product")}
                                onMouseLeave={() => handleMouseLeave("product")}
                                style={{
                                  marginLeft: 12,
                                  alignSelf: "end",
                                  color: isHoverProduct ? "red" : "black",
                                }}
                                onClick={() => removeImage("product")}
                              />
                            </Tooltip>
                          </Box>
                        </Collapse>
                      </>
                    )}
                  </GridItem>
                  <Typography style={{ marginLeft: 12, marginTop: 46 }}>
                    {"Ölcü:"}
                  </Typography>
                  <GridItem xs={12} sm={6} md={2}>
                    <TextForm
                      type="number"
                      label="En"
                      id="productSizeWidth"
                      fullWidth
                      value={orderState.productSizeWidth}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          productSizeWidth: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                  <Typography style={{ marginTop: 40 }}>x</Typography>
                  <GridItem xs={12} sm={6} md={2}>
                    <TextForm
                      type="number"
                      label="Boy"
                      id="productSizeHeight"
                      fullWidth
                      value={orderState.productSizeHeight}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          productSizeHeight: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                  <GridItem md={1} style={{ marginTop: 36 }}>
                    <input
                      id={`productFile`}
                      ref={fileInputProduct}
                      type="file"
                      accept="image/*"
                      onChange={handleChangeProduct}
                      style={{ display: "none" }}
                    />
                    <MButton
                      onClick={(e) => onUploadProduct(e)}
                      variant="contained"
                      color={"info"}
                      size="small"
                      type="file"
                    >
                      <Upload fontSize="small" />
                    </MButton>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4} style={{ marginTop: 36 }}>
                    <Autocomplete
                      id="productMainType"
                      onChange={(e, item) => {
                        setOrderState({
                          ...orderState,
                          productMainType: item.label,
                        });
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      options={PRODUCTMAINTYPE_OPTIONS}
                      getOptionLabel={(option) => option.label || ""}
                      disableClearable={true}
                      freeSolo={false}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Ürün Ana Tipi"
                          placeholder=""
                        />
                      )}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{ marginTop: 36 }}>
                    <Autocomplete
                      id="productSubType"
                      onChange={(e, v) =>
                        setOrderState({
                          ...orderState,
                          productSubType: v.label,
                        })
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      disabled={orderState.productMainType === "Cam"}
                      options={selectSubOptions(orderState.productMainType)}
                      getOptionLabel={(o) => o.label || ""}
                      freeSolo={false}
                      disableClearable={true}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Ürün Alt Tipi"
                          placeholder=""
                        />
                      )}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{ marginTop: 36 }}>
                    <Autocomplete
                      id="productCargoType"
                      onChange={(e, v) =>
                        setOrderState({
                          ...orderState,
                          productCargoType: v.label,
                        })
                      }
                      disabled={orderState.productMainType !== "Panel"}
                      options={selectShippingOptions(
                        orderState.productMainType
                      )}
                      getOptionLabel={(o) => o.label || ""}
                      freeSolo={false}
                      disableClearable={true}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Ürün Kargo Tipi"
                          placeholder=""
                        />
                      )}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextForm
                      type={"text"}
                      label="Hediye1"
                      id="gift1"
                      fullWidth
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          gift1: e.target.value,
                        })
                      }
                    />
                    {orderState.gift1File !== null && (
                      <>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpenGift1File(!openGift1File)}
                        >
                          {openGift1File ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <>
                              <KeyboardArrowDownIcon />
                              <Typography
                                style={{ marginLeft: 12, marginTop: 0 }}
                              >
                                {"Resmi göster"}
                              </Typography>{" "}
                            </>
                          )}
                        </IconButton>
                        <Collapse
                          in={openGift1File}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box display={"flex"}>
                            <img src={orderState.gift1File} />
                            <Tooltip title={"Resmi sil"}>
                              <Delete
                                fontSize="small"
                                onMouseEnter={() => handleMouseEnter("gift1")}
                                onMouseLeave={() => handleMouseLeave("gift1")}
                                style={{
                                  marginLeft: 12,
                                  alignSelf: "end",
                                  color: isHoverGift1 ? "red" : "black",
                                }}
                                onClick={() => removeImage("gift1")}
                              />
                            </Tooltip>
                          </Box>
                        </Collapse>
                      </>
                    )}
                  </GridItem>
                  <Typography style={{ marginLeft: 12, marginTop: 46 }}>
                    {"Ölcü:"}
                  </Typography>
                  <GridItem xs={12} sm={6} md={2}>
                    <TextForm
                      type="number"
                      label="En"
                      id="gift1SizeWidth"
                      fullWidth
                      value={orderState.gift1SizeWidth}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          gift1SizeWidth: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                  <Typography style={{ marginTop: 40 }}>x</Typography>
                  <GridItem xs={12} sm={6} md={2}>
                    <TextForm
                      type="number"
                      label="Boy"
                      id="gift1SizeHeight"
                      fullWidth
                      value={orderState.gift1SizeHeight}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          gift1SizeHeight: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                  <GridItem md={1} style={{ marginTop: 36 }}>
                    <input
                      id={`gift1File`}
                      ref={fileInputGift1}
                      type="file"
                      accept="image/*"
                      onChange={handleChangeGift1}
                      style={{ display: "none" }}
                    />
                    <MButton
                      onClick={(e) => onUploadGift1(e)}
                      variant="contained"
                      color="inherit"
                      size="small"
                      type="file"
                    >
                      <Upload fontSize="small" />
                    </MButton>
                    {/* <Tooltip title={"Resim ekle"}>
                     
                    </Tooltip> */}
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextForm
                      type={"text"}
                      label="Hediye2"
                      id="gift2"
                      fullWidth
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          gift2: e.target.value,
                        })
                      }
                    />
                    {orderState.gift2File !== null && (
                      <>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpenGift2File(!openGift2File)}
                        >
                          {openGift2File ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <>
                              <KeyboardArrowDownIcon />
                              <Typography
                                style={{ marginLeft: 12, marginTop: 0 }}
                              >
                                {"Resmi göster"}
                              </Typography>{" "}
                            </>
                          )}
                        </IconButton>
                        <Collapse
                          in={openGift2File}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box display={"flex"}>
                            <img src={orderState.gift2File} />
                            <Tooltip title={"Resmi sil"}>
                              <Delete
                                fontSize="small"
                                onMouseEnter={() => handleMouseEnter("gift2")}
                                onMouseLeave={() => handleMouseLeave("gift2")}
                                style={{
                                  marginLeft: 12,
                                  alignSelf: "end",
                                  color: isHoverGift2 ? "red" : "black",
                                }}
                                onClick={() => removeImage("gift2")}
                              />
                            </Tooltip>
                          </Box>
                        </Collapse>
                      </>
                    )}
                  </GridItem>
                  <Typography style={{ marginLeft: 12, marginTop: 46 }}>
                    {"Ölcü:"}
                  </Typography>
                  <GridItem xs={12} sm={6} md={2}>
                    <TextForm
                      type="number"
                      label="En"
                      id="gift2SizeWidth"
                      fullWidth
                      value={orderState.gift2SizeWidth}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          gift2SizeWidth: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                  <Typography style={{ marginTop: 40 }}>x</Typography>
                  <GridItem xs={12} sm={6} md={2}>
                    <TextForm
                      type="number"
                      label="Boy"
                      id="gift2SizeHeight"
                      fullWidth
                      value={orderState.gift2SizeHeight}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          gift2SizeHeight: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                  <GridItem md={1} style={{ marginTop: 36 }}>
                    <input
                      id={`gift2File`}
                      ref={fileInputGift2}
                      type="file"
                      accept="image/*"
                      onChange={handleChangeGift2}
                      style={{ display: "none" }}
                    />
                    <MButton
                      onClick={(e) => onUploadGift2(e)}
                      variant="contained"
                      color="inherit"
                      size="small"
                      type="file"
                    >
                      <Upload fontSize="small" />
                    </MButton>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextForm
                      type={"number"}
                      label="Maliyet"
                      id="cost"
                      disabled
                      fullWidth
                      onChange={(e) =>
                        setOrderState({ ...orderState, cost: e.target.value })
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextForm
                      type={"number"}
                      label="Paketleme Maliyeti"
                      id="packagingCost"
                      disabled
                      fullWidth
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          packagingCost: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextForm
                      type={"number"}
                      label="Kargolama Maliyeti"
                      id="shippingCost"
                      disabled
                      fullWidth
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          shippingCost: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextForm
                      type={"number"}
                      label="Satis Tutari"
                      id="price"
                      fullWidth
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          price: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextForm
                      type={"text"}
                      label="Aciklama"
                      id="description"
                      fullWidth
                      multiline
                      rows={4}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          description: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA", marginTop: 48 }}>
                      Kargo Etiketi Ekle
                    </InputLabel>
                    <FileUpload
                      id={"cargoLabel"}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          cargoLabel: e.target.value,
                        })
                      }
                      {...fileUploadProp}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button variant="contained" color="primary" type="submit">
                  Kaydet
                </Button>
                {/* <Button
                  type="submit"
                  variant="contained"
                  color="#AAAAAA"
                  onClick={(e) => removeForm(e)}
                >
                  Formu Yenile
                </Button> */}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        {/* </ThemeProvider> */}
      </form>
    </div>
  );
}

OrderForm.layout = Admin;

export default OrderForm;
