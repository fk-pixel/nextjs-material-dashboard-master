import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footer/FooterSmall.js";

const styles = {
  section: {
    position: "relative",
    paddingTop: "10rem",
    paddingBottom: "10rem",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
  },
  loginDiv: {
    position: "absolute",
    top: "0",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
  },
};
const useStyles = makeStyles(styles);

export default function Auth({ children }) {
  const classes = useStyles();

  return (
    <>
      <Navbar transparent />
      <main>
        <section
          // className="relative w-full h-full py-40 min-h-screen"
          className={classes.section}
        >
          <div
            // className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            className={classes.loginDiv}
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
