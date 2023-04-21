import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";

import routes from "routes.js";
import Navbar from "components/Navbars/Navbar.js";
// import FooterSmall from "components/Footer/FooterSmall.js";
import imagine4 from "assets/img/bgNew.svg";

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

export default function Auth({ children, ...rest }) {
  // const router = useRouter();

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* <Navbar
        transparent
        routes={routes}
        handleDrawerToggle={handleDrawerToggle}
        {...rest}
      /> */}
      <main>
        <section className={classes.section}>
          <div
            className={classes.loginDiv}
            style={{
              backgroundImage: `url(${imagine4})`,
              backgroundSize: "cover" /* <------ */,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
          ></div>
          {children}
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
