import React from "react";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";

const styles = {
  mainDiv: {
    width: "100%",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    marginLeft: "auto",
    marginRight: "auto",
    height: "100%",
  },
  mainDiv2: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: "100%",
  },
  mainDiv3: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    width: "100%",
    // @media (minWidth: "1024px) {
    //   width",
  },
  container: {
    display: "flex",
    position: "relative",
    marginBottom: "1.5rem",
    overflowWrap: "break-word",
    flexDirection: "column",
    width: "100%",
    minWidth: "0",
    borderRadius: "0.5rem",
    borderWidth: "0",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#ffffff",
  },
  container2: {
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    marginBottom: "0",
    borderTopLeftRadius: "0.25rem",
    borderTopRightRadius: "0.25rem",
  },
  container3: {
    marginBottom: "0.75rem",
    textAlign: "center",
  },
  signInText: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: "700",
    color: "rgb(23 37 84)",
  },
  imageSignin: {
    textAlign: "center",
  },
  buttonGithub: {
    display: "inline-flex",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    marginBottom: "0.25rem",
    marginRight: "0.5rem",
    backgroundColor: "#ffffff",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "linear",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    fontWeight: "400",
    fontWeight: "700",
    textTransform: "uppercase",
    alignItems: "center",
    borderRadius: "0.25rem",
    outline: "0",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  buttonGoogle: {
    display: "inline-flex",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    marginRight: "0.25rem",
    marginBottom: "0.25rem",
    backgroundColor: "#ffffff",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "linear",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    fontWeight: "400",
    fontWeight: "700",
    textTransform: "uppercase",
    alignItems: "center",
    borderRadius: "0.25rem",
    outline: "0",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  imageSiginIcon: {
    marginRight: "0.25rem",
    width: "1.25rem",
  },
  underLine: {
    marginTop: "1.5rem",
  },
  contentDiv: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "2.5rem",
    paddingBottom: "2.5rem",
    paddingTop: "0",
    flex: "1 1 auto",
    // @media (minWidth: "1024px) {
    //   padding-left",
    // paddingRight: "2.5rem",
  },
  contentText: {
    marginBottom: "0.75rem",
    fontWeight: "700",
    textAlign: "center",
  },
  contentDiv: {
    position: "relative",
    marginBottom: "0.75rem",
    width: "100%",
  },
  contentLabel: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  contentInput: {
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    backgroundColor: "#ffffff",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "linear",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    width: "100%",
    borderRadius: "0.25rem",
    borderWidth: "0",
    // boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  rememberLabel: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
  },
  rememberInput: {
    marginLeft: "0.25rem",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "linear",
    width: "1.25rem",
    height: "1.25rem",
    borderRadius: "0.25rem",
    borderWidth: "0",
    backgroundColor: "rgb(23 37 84)",
  },
  rememberText: {
    marginLeft: "0.5rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: "600",
    color: "rgb(23 37 84)",
  },
  signInButtonDiv: {
    marginTop: "1.5rem",
    textAlign: "center",
  },
  signInButton: {
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    marginRight: "0.25rem",
    marginBottom: "0.25rem",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "linear",
    color: "#ffffff",
    backgroundColor: "rgb(23 37 84)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: "700",
    textTransform: "uppercase",
    width: "100%",
    borderRadius: "0.25rem",
    outline: "0",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  formFooter: {
    display: "flex",
    position: "relative",
    marginTop: "1.5rem",
    flexWrap: "wrap",
  },
  forgotPasswordDiv: {
    width: "50%",
  },
  forgotPasswordLink: {
    color: "rgb(219 234 254)",
  },
  createNewAccountDiv: {
    textAlign: "right",
    width: "50%",
  },
  createNewAccountLink: {
    color: "rgb(219 234 254)",
  },
};

const useStyles = makeStyles(styles);

import Auth from "layouts/Auth.js";

export default function Login() {
  const classes = useStyles();

  return (
    <>
      <div
        //   className="container mx-auto px-4 h-full"
        className={classes.mainDiv}
      >
        <div
          //   className="flex content-center items-center justify-center h-full"
          className={classes.mainDiv2}
        >
          <div
            //   className="w-full lg:w-4/12 px-4"
            className={classes.mainDiv3}
          >
            <div
              //   className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
              className={classes.container}
            >
              <div
                //   className="rounded-t mb-0 px-6 py-6"
                className={classes.container2}
              >
                <div
                  // className="text-center mb-3"
                  className={classes.container3}
                >
                  <h6
                    //   className="text-blueGray-500 text-sm font-bold"
                    className={classes.signInText}
                  >
                    Sign in with
                  </h6>
                </div>
                <div
                  // className="btn-wrapper text-center"
                  className={classes.imageSignin}
                >
                  <button
                    // className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    className={classes.buttonGithub}
                    type="button"
                  >
                    <img
                      alt="..."
                      // className="w-5 mr-1"
                      className={classes.imageSiginIcon}
                      src="assets/img/github.svg"
                    />
                    Github
                  </button>
                  <button
                    // className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    className={classes.buttonGoogle}
                    type="button"
                  >
                    <img
                      alt="..."
                      // className="w-5 mr-1"
                      className={classes.imageSiginIcon}
                      src="/img/google.png"
                    />
                    Google
                  </button>
                </div>
                <hr
                  // className="mt-6 border-b-1 border-blueGray-300"
                  className={classes.underLine}
                />
              </div>
              <div
                //   className="flex-auto px-4 lg:px-10 py-10 pt-0"
                className={classes.contentDiv}
              >
                <div
                  // className="text-blueGray-400 text-center mb-3 font-bold"
                  className={classes.contentText}
                >
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <div
                    //   className="relative w-full mb-3"
                    className={classes.contentDiv}
                  >
                    <label
                      //   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      className={classes.contentLabel}
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      //   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      className={classes.contentInput}
                      placeholder="Email"
                    />
                  </div>

                  <div
                    //   className="relative w-full mb-3"
                    className={classes.contentDiv}
                  >
                    <label
                      //   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      className={classes.contentLabel}
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      //   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      className={classes.contentInput}
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label
                      // className="inline-flex items-center cursor-pointer"
                      className={classes.rememberLabel}
                    >
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        // className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        className={classes.rememberInput}
                      />
                      <span
                        //   className="ml-2 text-sm font-semibold text-blueGray-600"
                        className={classes.rememberText}
                      >
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div
                    //   className="text-center mt-6"
                    className={classes.signInButtonDiv}
                  >
                    <button
                      //   className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      className={classes.signInButton}
                      type="button"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              // className="flex flex-wrap mt-6 relative"
              className={classes.formFooter}
            >
              <div
                //   className="w-1/2"
                className={classes.forgotPasswordDiv}
              >
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  //   className="text-blueGray-200"
                  className={classes.forgotPasswordLink}
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div
                // className="w-1/2 text-right"
                className={classes.createNewAccountDiv}
              >
                <Link href="/auth/register">
                  <a
                    href="#pablo"
                    // className="text-blueGray-200"
                    className={classes.createNewAccountLink}
                  >
                    <small>Create new account</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
