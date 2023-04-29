import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { Store, Update } from "@material-ui/icons";

import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import DataTable from "components/DataTable/DataTable.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [item, setItem] = React.useState([]);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const ISSERVER = typeof window === "undefined";

    if (!ISSERVER) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      if (orders) {
        setItem(orders);
      }

      const userData = JSON.parse(localStorage.getItem("userData"));

      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  const quantityCardInfo =
    item !== null && item.length > 0
      ? user !== null || user !== undefined
        ? user.role === "admin"
          ? item.length
          : item.filter((x) => x.createdBy === user.username).length
        : 0
      : 0;

  const salesCardInfo =
    item !== null && item.length > 0
      ? user !== null || user !== undefined
        ? user.role === "admin"
          ? item
              .map((x) => (x.price !== undefined ? x.price : null))
              .reduce((acc, val) => acc + Math.round(val), 0)
          : item
              .filter((x) => x.createdBy === user.username)
              .map((x) => (x.price !== undefined ? x.price : null))
              .reduce((acc, val) => acc + Math.round(val), 0)
        : 0
      : 0;

  const ruloSalesInfo =
    item !== null && item.length > 0
      ? user !== null || user !== undefined
        ? user.role === "admin"
          ? item.filter((x) => x.productMainType === "Rulo").length
          : item
              .filter((x) => x.createdBy === user.username)
              .filter((x) => x.productMainType === "Rulo").length
        : 0
      : 0;

  const panelSalesInfo =
    item !== null && item.length > 0
      ? user !== null || user !== undefined
        ? user.role === "admin"
          ? item.filter((x) => x.productMainType === "Panel").length
          : item
              .filter((x) => x.createdBy === user.username)
              .filter((x) => x.productMainType === "Panel").length
        : 0
      : 0;

  function onChangeDashboard() {
    setItem(JSON.parse(localStorage.getItem("orders")));
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Satis Adedi</p>
              <h3 className={classes.cardTitle}>
                {quantityCardInfo} <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger>
                  <Warning />
                </Danger> */}
                <Update />
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Son 1 ay
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Kazanc</p>
              <h3 className={classes.cardTitle}>${salesCardInfo}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <DateRange /> */}
                <Update />
                Son 1 ay
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Toplam Rulo Satis</p>
              <h3 className={classes.cardTitle}>{ruloSalesInfo}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <LocalOffer /> */}
                <Update />
                Son 1 ay
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                {/* <Accessibility /> */}
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Toplam Panel Satis</p>
              <h3 className={classes.cardTitle}>{panelSalesInfo}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Son 1 ay
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Genel Siparis Tablosu</h4>
              <p className={classes.cardCategoryWhite}>
                Tüm siparislerinizi organize edin
              </p>
            </CardHeader>
            <CardBody>
              <DataTable
                data={item}
                userData={user}
                onChangeDataTable={onChangeDashboard}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
