import React from "react";
import Link from "next/link";
import { createPopper } from "@popperjs/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  demoLink: {
    display: "flex",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    fontWeight: "700",
    textTransform: "uppercase",
    alignItems: "center",
  },
  adminDiv: {
    float: "left",
    zIndex: "50",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    listStyleType: "none",
    textAlign: "left",
    borderRadius: "0.25rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  highPannelItem: {
    display: "block",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingBottom: "0",
    paddingTop: "0.5rem",
    backgroundColor: "transparent",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: "700",
    whiteSpace: "nowrap",
    width: "100%",
  },
  pannelItem: {
    display: "block",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    backgroundColor: "transparent",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: "400",
    whiteSpace: "nowrap",
    width: "100%",
  },
};
const useStyles = makeStyles(styles);

const PagesDropdown = () => {
  const classes = useStyles();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        // className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        className={classes.demoLink}
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        Demo Pages
      </a>
      <div
        ref={popoverDropdownRef}
        // className={
        //   (dropdownPopoverShow ? "block " : "hidden ") +
        //   "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        // }
        className={classes.adminDiv}
      >
        <span
          //   className={
          //     "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          //   }
          className={classes.highPannelItem}
        >
          Admin Layout
        </span>
        <Link href="/admin/dashboard">
          <a
            href="#pablo"
            // className={
            //   "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            // }
            className={classes.pannelItem}
          >
            Dashboard
          </a>
        </Link>
        <Link href="/admin/settings">
          <a
            href="#pablo"
            // className={
            //   "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            // }
            className={classes.pannelItem}
          >
            Settings
          </a>
        </Link>
        <Link href="/admin/tables">
          <a
            href="#pablo"
            // className={
            //   "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            // }
            className={classes.pannelItem}
          >
            Tables
          </a>
        </Link>
        <Link href="/admin/maps">
          <a
            href="#pablo"
            // className={
            //   "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            // }
            className={classes.pannelItem}
          >
            Maps
          </a>
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
        <span
          //   className={
          //     "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          //   }
          className={classes.highPannelItem}
        >
          Auth Layout
        </span>
        <Link href="/auth/login">
          <a
            href="#pablo"
            // className={
            //   "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            // }
            className={classes.pannelItem}
          >
            Login
          </a>
        </Link>
        <Link href="/auth/register">
          <a
            href="#pablo"
            // className={
            //   "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            // }
            className={classes.pannelItem}
          >
            Register
          </a>
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
        <span
          //   className={
          //     "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          //   }
          className={classes.highPannelItem}
        >
          No Layout
        </span>
        <Link href="/landing">
          <a
            href="#pablo"
            // className={
            //   "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            // }
            className={classes.pannelItem}
          >
            Landing
          </a>
        </Link>
        <Link href="/profile">
          <a
            href="#pablo"
            // className={
            //   "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            // }
            className={classes.pannelItem}
          >
            Profile
          </a>
        </Link>
      </div>
    </>
  );
};

export default PagesDropdown;
