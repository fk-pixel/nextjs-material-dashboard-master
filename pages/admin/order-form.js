import React from "react";
import { v4 as uuidv4 } from "uuid";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TextInput from "components/TextInput/TextInput.js";
// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { FileUpload } from "components/FileUpload/FileUpload.js";
// import AutocompleteEditCell from "components/AutocompleteEditCell/AutocompleteEditCell.js";
import { Autocomplete, FormControl, TextField, Tooltip } from "@mui/material";
import FileDownload from "@mui/icons-material/FileDownload";
import Button from "components/CustomButtons/Button.js";

import { Button as MButton, Box } from "@mui/material";
import avatar from "assets/img/faces/marc.jpg";
import AutocompleteForm from "../../components/Autocomplete/AutocompleteForm";
import TextForm from "../../components/TextForm/TextForm";
import { uniqueId } from "lodash";
import { isDeepEqual } from "@mui/x-data-grid/internals";
import { Typography } from "@material-ui/core";

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

  const fileInputProduct = React.useRef(null);
  const fileInputGift1 = React.useRef(null);
  const fileInputGift2 = React.useRef(null);

  const [orderState, setOrderState] = React.useState({
    id: uuidv4(),
    number: uniqueId(),
    store: "",
    username: "",
    product: "",
    productFile: "",
    productSize: "",
    productSizeWidth: null,
    productSizeHeight: null,
    productMainType: "",
    productSubType: "",
    productCargoType: "",
    gift1: "",
    gift1File: "",
    gift1Size: "",
    gift1SizeWidth: null,
    gift1SizeHeight: null,
    gift2: "",
    gift2File: "",
    gift2Size: "",
    gift2SizeWidth: null,
    gift2SizeHeight: null,
    cost: null,
    packagingCost: null,
    shippingCost: null,
    description: "",
    file: null,
    status: null,
    price: null,
    createdDate: new Date(),
    createdBy: "",
  });

  function getUserData() {
    const ISSERVER = typeof window === "undefined";

    return !ISSERVER ? JSON.parse(localStorage.getItem("userData")) : {};
  }

  const userData = getUserData();

  function handleSubmit(e) {
    // e.preventDefault();
    if (orderState !== undefined) {
      var orders = JSON.parse(localStorage.getItem("orders"));

      if (orders === null) {
        orders = [];
      } else {
        orders;
      }

      const {
        productSizeWidth,
        productSizeHeight,
        gift1SizeWidth,
        gift1SizeHeight,
        gift2SizeWidth,
        gift2SizeHeight,
        id,
        username,
        store,
        createdBy,
        ...rest
      } = orderState;

      const newID =
        orders.find((x) => x.id === id) !== undefined ? uuidv4() : id;

      const orderState = {
        ...rest,
        id: newID,
        productSize:
          productSizeWidth !== null || productSizeHeight !== null
            ? productSizeWidth + "*" + productSizeHeight
            : null,
        gift1Size:
          gift1SizeWidth !== null || gift1SizeHeight !== null
            ? gift1SizeWidth + "*" + gift1SizeHeight
            : null,
        gift2Size:
          gift2SizeWidth !== null || gift2SizeHeight !== null
            ? gift2SizeWidth + "*" + gift2SizeHeight
            : null,
        username: JSON.parse(localStorage.getItem("userData")).username,
        store: JSON.parse(localStorage.getItem("userData")).store,
        createdBy: JSON.parse(localStorage.getItem("userData")).username,
      };

      localStorage.setItem("orders", JSON.stringify([...orders, orderState]));
    }
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
    const fileUploaded = event.target.files[0];
    setOrderState({ ...orderState, fileInputProduct: fileUploaded });
  };

  const handleChangeGift1 = (event) => {
    const fileUploaded = event.target.files[0];
    setOrderState({ ...orderState, fileInputGift1: fileUploaded });
  };

  const handleChangeGift2 = (event) => {
    const fileUploaded = event.target.files[0];
    setOrderState({ ...orderState, fileInputGift2: fileUploaded });
  };
  // React.useEffect(() => {
  //   if (myState !== undefined) {
  //     return;
  //   }
  // }, [myState]);

  // console.log("mystate", myState);

  // function removeForm() {
  //   const { company, username } = myState;

  //   setMyState({
  //     product: null,
  //     size: null,
  //     productMainType: null,
  //     productSubType: null,
  //     productCargoType: null,
  //     gift: null,
  //     cost: null,
  //     packagingCost: null,
  //     shippingCost: null,
  //     description: null,
  //     file: null,
  //     company,
  //     username,
  //   });

  //   //console.log(myState);
  // }

  // const removeForm2 = React.useCallback(() => {
  //   const { company, username } = myState;

  //   setMyState({
  //     product: "",
  //     size: "",
  //     productMainType: "",
  //     productSubType: "",
  //     productCargoType: "",
  //     gift: "",
  //     cost: null,
  //     packagingCost: null,
  //     shippingCost: null,
  //     description: "",
  //     file: null,
  //     company,
  //     username,
  //     price,
  //   });
  // }, []);

  // React.useEffect(() => {
  //   if (removeForm2) {
  //     myState;
  //   }
  // }, []);

  //console.log(myState);

  // function handleChange(event) {
  //   event.preventDefault();
  //   //console.log(myState);
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
                    <TextInput
                      labelText="Magaza"
                      id="store"
                      value={userData.store}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextInput
                      labelText="Yönetici"
                      id="username"
                      value={userData.username}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>

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
                  </GridItem>
                  <Typography style={{ marinLeft: 12, marginTop: 46 }}>
                    Ölcü:{" "}
                  </Typography>
                  {/* </Box> */}
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
                      id={`imageProduct`}
                      ref={fileInputProduct}
                      type="file"
                      accept="image/*"
                      onChange={handleChangeProduct}
                      style={{ display: "none" }}
                    />
                    <MButton
                      onClick={(e) => onUploadProduct(e)}
                      variant="contained"
                      color="inherit"
                      size="small"
                      type="file"
                    >
                      <FileDownload fontSize="small" />
                    </MButton>
                    {/* <Tooltip title={"Resim ekle"}>
                     
                    </Tooltip> */}
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
                        setOrderState({ ...orderState, gift1: e.target.value })
                      }
                    />
                  </GridItem>
                  <Typography style={{ marinLeft: 12, marginTop: 46 }}>
                    Ölcü:{" "}
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
                      id={`imageGift1`}
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
                      <FileDownload fontSize="small" />
                    </MButton>
                    {/* <Tooltip title={"Resim ekle"}>
                     
                    </Tooltip> */}
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  {" "}
                  <GridItem xs={12} sm={12} md={6}>
                    <TextForm
                      type={"text"}
                      label="Hediye2"
                      id="gift2"
                      fullWidth
                      onChange={(e) =>
                        setOrderState({ ...orderState, gift2: e.target.value })
                      }
                    />
                  </GridItem>
                  <Typography style={{ marinLeft: 12, marginTop: 46 }}>
                    Ölcü:{" "}
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
                      id={`imageGift2`}
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
                      <FileDownload fontSize="small" />
                    </MButton>
                    {/* <Tooltip title={"Resim ekle"}>
                     
                    </Tooltip> */}
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
                        setOrderState({ ...orderState, price: e.target.value })
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
                      Belge Ekle
                    </InputLabel>
                    <FileUpload
                      id={"file"}
                      onChange={(e) =>
                        setOrderState({ ...orderState, file: e.target.value })
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
                <Button
                  variant="contained"
                  color="inherit"
                  // onClick={removeForm2}
                >
                  Formu Yenile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div>
  );
}

OrderForm.layout = Admin;

export default OrderForm;
