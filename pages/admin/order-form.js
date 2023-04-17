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

  const [myState, setMyState] = React.useState({
    id: uuidv4(),
    number: uniqueId(),
    company: "dowiedo",
    username: "fk2534",
    product: "",
    size: "",
    size1: null,
    size2: null,
    productMainType: "",
    productSubType: "",
    productCargoType: "",
    gift: "",
    giftSize: "",
    size3: null,
    size4: null,
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

  // const orders = localStorage.getItem("orders");

  // const orderState = new Map(
  //   myState !== null ? myState[0].idp((x) => [x.id, x]) : []
  // );

  // const [veggie, setVeggie] = useState();
  // useEffect(() => {
  //   getVeggie();
  // }, []);

  // const getVeggie = async () => {
  //   const check = localStorage.getItem("veggie");
  //   if (check) {
  //     setVeggie(JSON.parse(check));
  //   } else {
  //     const res = await fetch(apiUrl);
  //     const data = await res.json();
  //     localStorage.setItem("orders", JSON.stringify(myState));
  //     setVeggie(data.recipes);
  //     console.log("app-data", data.recipes);
  //   }
  // };

  function handleSubmit(e) {
    // e.preventDefault();
    if (myState !== undefined) {
      var getItems = JSON.parse(localStorage.getItem("orders"));

      if (getItems === null) {
        getItems = [];
      } else {
        getItems;
      }
      const { size1, size2, size3, size4, id, ...rest } = myState;

      const newID =
        getItems.find((x) => x.id === id) !== undefined ? uuidv4() : id;

      const ordersState = {
        ...rest,
        id: newID,
        size: size1 !== null || size2 !== null ? size1 + "x" + size2 : null,
        giftSize: size3 !== null || size4 !== null ? size3 + "x" + size4 : null,
      };

      localStorage.setItem(
        "orders",
        JSON.stringify([...getItems, ordersState])
      );
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
                      value={myState.company}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                      onChange={(e) =>
                        setMyState({ ...myState, company: e.target.value })
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextInput
                      labelText="Yönetici"
                      id="username"
                      value={myState.username}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                      onChange={(e) =>
                        setMyState({ ...myState, username: e.target.value })
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
                      value={myState.product}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setMyState({ ...myState, product: e.target.value })
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
                      id="size"
                      fullWidth
                      value={myState.size1}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setMyState({ ...myState, size1: e.target.value })
                      }
                    />
                  </GridItem>
                  <Typography style={{ marginTop: 40 }}>x</Typography>
                  <GridItem xs={12} sm={6} md={2}>
                    <TextForm
                      type="number"
                      label="Boy"
                      id="size"
                      fullWidth
                      value={myState.size2}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setMyState({ ...myState, size2: e.target.value })
                      }
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4} style={{ marginTop: 36 }}>
                    <Autocomplete
                      id="productMainType"
                      onChange={(e, item) => {
                        setMyState({
                          ...myState,
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
                        setMyState({
                          ...myState,
                          productSubType: v.label,
                        })
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      disabled={myState.productMainType === "Cam"}
                      options={selectSubOptions(myState.productMainType)}
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
                        setMyState({
                          ...myState,
                          productCargoType: v.label,
                        })
                      }
                      disabled={myState.productMainType !== "Panel"}
                      options={selectShippingOptions(myState.productMainType)}
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
                      label="Hediye"
                      id="gift"
                      fullWidth
                      onChange={(e) =>
                        setMyState({ ...myState, gift: e.target.value })
                      }
                    />
                  </GridItem>
                  {/* <Box display={"flex"} xs={12} sm={12} md={6}> */}
                  <Typography style={{ marinLeft: 12, marginTop: 46 }}>
                    Hediye Ölcü:{" "}
                  </Typography>
                  <GridItem xs={12} sm={6} md={2}>
                    <TextForm
                      type="number"
                      label="En"
                      id="size3"
                      fullWidth
                      value={myState.size3}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setMyState({ ...myState, size3: e.target.value })
                      }
                    />
                  </GridItem>
                  <Typography style={{ marginTop: 40 }}>x</Typography>
                  <GridItem xs={12} sm={6} md={2}>
                    <TextForm
                      type="number"
                      label="Boy"
                      id="size4"
                      fullWidth
                      value={myState.size4}
                      size={"small"}
                      variant={"outlined"}
                      onChange={(e) =>
                        setMyState({ ...myState, size4: e.target.value })
                      }
                    />
                  </GridItem>
                  {/* </Box> */}
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextForm
                      type={"number"}
                      label="Maliyet"
                      id="cost"
                      fullWidth
                      onChange={(e) =>
                        setMyState({ ...myState, cost: e.target.value })
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
                        setMyState({
                          ...myState,
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
                        setMyState({ ...myState, shippingCost: e.target.value })
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
                        setMyState({ ...myState, price: e.target.value })
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
                        setMyState({ ...myState, description: e.target.value })
                      }
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA", marginTop: 48 }}>
                      Dosya Ekle
                    </InputLabel>
                    {/* <Button variant="contained" component="label">
                    Upload File
                    <input type="file" hidden />
                  </Button> */}
                    <FileUpload
                      id={"file"}
                      onChange={(e) =>
                        setMyState({ ...myState, file: e.target.value })
                      }
                      {...fileUploadProp}
                    />
                    {/* <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  /> */}
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
          {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem> */}
        </GridContainer>
      </form>
    </div>
  );
}

OrderForm.layout = Admin;

export default OrderForm;
