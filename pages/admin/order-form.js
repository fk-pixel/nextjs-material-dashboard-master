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
import { Autocomplete, FormControl, TextField } from "@mui/material";

import { Button, Box } from "@mui/material";
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

const PRODUCTMAINTYPE_OPTIONS = [
  { id: "panel", label: "Panel" },
  { id: "roll", label: "Rulo" },
  { id: "glas", label: "Cam" },
];

const PANELTYPE_OPTIONS = [
  { id: "thinHoop", label: "Ince Kasnak" },
  { id: "normalHoop", label: "Normal Kasnak" },
];

const ROLLTYPE_OPTIONS = [
  { id: "normalRoll", label: "Normal Rulo" },
  { id: "NonReflectiveRoll", label: "Yansimasiz Rulo" },
  { id: "coatedPaper", label: "Kuse Kagit" },
];

const SHIPPING_OPTIONS = [
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

  const [orderState, setOrderState] = React.useState({
    id: uuidv4(),
    number: uniqueId(),
    company: "dowiedo",
    username: "fk2534",
    product: "",
    productSize: "",
    productSizeWidth: null,
    productSizeHeight: null,
    productMainType: "",
    productSubType: "",
    productCargoType: "",
    gift1: "",
    gift1Size: "",
    gift1SizeWidth: null,
    gift1SizeHeight: null,
    gift2: "",
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
    createdBy: "fk2534",
  });

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
        ...rest
      } = orderState;

      const newID =
        orders.find((x) => x.id === id) !== undefined ? uuidv4() : id;

      const ordersState = {
        ...rest,
        id: newID,
        productSize:
          productSizeWidth !== null || productSizeHeight !== null
            ? productSizeWidth + "x" + productSizeHeight
            : null,
        gift1Size:
          gift1SizeWidth !== null || gift1SizeHeight !== null
            ? gift1SizeWidth + "x" + gift1SizeHeight
            : null,
        gift2Size:
          gift2SizeWidth !== null || gift2SizeHeight !== null
            ? gift2SizeWidth + "x" + gift2SizeHeight
            : null,
      };

      localStorage.setItem("orders", JSON.stringify([...orders, ordersState]));
    }
  }

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
                      id="company"
                      value={orderState.company}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          company: e.target.value,
                        })
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextInput
                      labelText="Yönetici"
                      id="username"
                      value={orderState.username}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                      onChange={(e) =>
                        setOrderState({
                          ...orderState,
                          username: e.target.value,
                        })
                      }
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
                    Hediye1 Ölcü:{" "}
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
                    Hediye2 Ölcü:{" "}
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
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextForm
                      type={"number"}
                      label="Maliyet"
                      id="cost"
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
                      Dosya Ekle
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
