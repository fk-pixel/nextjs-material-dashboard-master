import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import {
  Store,
  Update,
  Warning,
  DateRange,
  LocalOffer,
  ArrowUpward,
  AccessTime,
  Accessibility,
  BugReport,
  Code,
  Cloud,
} from "@material-ui/icons";

import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import DataTable from "components/DataTable/DataTable.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// import ChartistGraph from "react-chartist";
// import Table from "components/Table/Table.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
// import Danger from "components/Typography/Danger.js";
// import { bugs, website, server } from "variables/general.js";
// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from "variables/charts.js";

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
              <h3 className={classes.cardTitle}>
                ${salesCardInfo}
                {/* {item
                  .filter((x) => x === "price")
                  .reduce((acc, val) => (acc + val, {}))} */}
              </h3>
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
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="dark">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
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

      {/* Alt Kart Blogu */}
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="danger"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    // checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    // checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    // checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="gray"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
