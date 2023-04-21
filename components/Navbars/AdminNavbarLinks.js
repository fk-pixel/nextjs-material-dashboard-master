import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import DateRange from "@material-ui/icons/DateRange";
import Search from "@material-ui/icons/Search";
// core components
import TextInput from "components/TextInput/TextInput.js";
import Button from "components/CustomButtons/Button.js";
import useWindowSize from "components/Hooks/useWindowSize.js";

import styles from "assets/jss/nextjs-material-dashboard/components/headerLinksStyle.js";
import { useRouter } from "next/router";

export default function AdminNavbarLinks(props) {
  const { isDashboard } = props;
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const router = useRouter();

  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openDateRange, setOpenDateRange] = React.useState(null);

  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const handleProfile = () => {
    router.push("/admin/user-profile");
  };

  const handleLogout = () => {
    router.push("/auth/signin");
  };

  const handleClickDateRange = (event) => {
    if (openDateRange && openDateRange.contains(event.target)) {
      setOpenDateRange(null);
    } else {
      setOpenDateRange(event.currentTarget);
    }
  };

  const handleCloseDateRange = () => {
    setOpenDateRange(null);
  };

  return (
    <div>
      <div className={classes.searchWrapper}>
        <TextInput
          formControlProps={{
            className: classes.margin + " " + classes.search,
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
            },
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
      {isDashboard && (
        <div className={classes.manager}>
          <Button
            color={size.width > 959 ? "transparent" : "white"}
            justIcon={size.width > 959}
            simple={!(size.width > 959)}
            aria-label="DateRange"
            onClick={handleClickDateRange}
            className={classes.buttonLink}
          >
            <DateRange className={classes.icons} />
            {/* <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden> */}
          </Button>
          <Poppers
            open={Boolean(openDateRange)}
            anchorEl={openDateRange}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !openDateRange }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="date-reange-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseDateRange}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={handleCloseDateRange}
                        className={classes.dropdownItem}
                      >
                        Son 24 Saat
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseDateRange}
                        className={classes.dropdownItem}
                      >
                        Son 1 Hafta
                      </MenuItem>
                      <Divider light />
                      <MenuItem
                        onClick={handleCloseDateRange}
                        className={classes.dropdownItem}
                      >
                        Son 1 Ay
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseDateRange}
                        className={classes.dropdownItem}
                      >
                        Son 1 Yil
                      </MenuItem>
                      <Divider light />
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      )}
      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? "transparent" : "white"}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You{"'"}re now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? "transparent" : "white"}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleProfile}
                      className={classes.dropdownItem}
                    >
                      Profil
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Ayarlar
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleLogout}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
