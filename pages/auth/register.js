import React from "react";
import { v4 as uuidv4 } from "uuid";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";

import Auth from "layouts/Auth.js";
import TextForm from "../../components/TextForm/TextForm";
import { useRouter } from "next/router";

const theme = createTheme();

const root = {
  color: "green",
  "&.Mui-focused": {
    border: "2px solid red",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
};
const useStyles = makeStyles(root);

export default function Register() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    var users = JSON.parse(localStorage.getItem("users"));

    if (users === null) {
      users = [];
    } else {
      users;
    }

    const formData = new FormData(event.currentTarget);

    const usersState = {
      id: uuidv4(),
      email: formData.get("email"),
      password: formData.get("password"),
      store: formData.get("store"),
      username: formData.get("username"),
      createdDate: new Date(),
      role: formData.get("username") === "fk2534" ? "admin" : "user",
    };

    localStorage.setItem("users", JSON.stringify([...users, usersState]));

    router.push("/auth/signin", {}, { shallow: true });
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{ backgroundColor: "#fff" }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#3b609c",
            position: "relative",
            borderRadius: 6,
            paddingLeft: 6,
            paddingRight: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", marginTop: 6 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ position: "relative", color: "#ffff", marginBottom: 12 }}
          >
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              // margin="normal"
              required
              fullWidth
              id="email"
              label="Email Adresi"
              name="email"
              // autoComplete="email"
              autoFocus
              // InputProps={{ className: classes.root }}
              style={{ marginBottom: 48 }}
            />
            {/* <TextForm
              type="email"
              label="Email"
              id="email"
              fullWidth
              value={orderState.gift2SizeHeight}
              size={"small"}
              variant={"outlined"}
              // onChange={(e) =>
              //   setOrderState({
              //     ...orderState,
              //     gift2SizeHeight: e.target.value,
              //   })
              // }
            /> */}
            <TextField
              // margin="normal"
              required
              fullWidth
              name="password"
              label="Parola"
              type="password"
              id="password"
              // autoComplete="current-password"
              style={{ marginBottom: 24 }}
            />
            <TextField
              // margin="normal"
              required
              fullWidth
              name="store"
              label="Magaza"
              type="text"
              id="store"
              style={{ marginBottom: 24 }}
            />
            <TextField
              // margin="normal"
              required
              fullWidth
              name="username"
              label="Kullanici adi"
              type="text"
              id="username"
              style={{ marginBottom: 24 }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={`Güvenlik sözlesmesini okudum`}
              style={{ marginTop: 12, marginLeft: 0 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: 48, marginBottom: 24 }}
              sx={{ mt: 12, mb: 2 }}
            >
              Kayit Ol
            </Button>
            {/* <Grid container>
              <Grid item xs style={{ marginTop: 12, marginBottom: 24 }}>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: "black",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item style={{ marginTop: 12, marginBottom: 24 }}>
                <Link
                  href="auth/register"
                  variant="body2"
                  sx={{
                    color: "black",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    // <>
    //   <div className="container mx-auto px-4 h-full">
    //     <div className="flex content-center items-center justify-center h-full">
    //       <div className="w-full lg:w-6/12 px-4">
    //         <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
    //           <div className="rounded-t mb-0 px-6 py-6">
    //             <div className="text-center mb-3">
    //               <h6 className="text-blueGray-500 text-sm font-bold">
    //                 Sign up with
    //               </h6>
    //             </div>
    //             <div className="btn-wrapper text-center">
    //               <button
    //                 className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
    //                 type="button"
    //               >
    //                 <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
    //                 Github
    //               </button>
    //               <button
    //                 className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
    //                 type="button"
    //               >
    //                 <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
    //                 Google
    //               </button>
    //             </div>
    //             <hr className="mt-6 border-b-1 border-blueGray-300" />
    //           </div>
    //           <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
    //             <div className="text-blueGray-400 text-center mb-3 font-bold">
    //               <small>Or sign up with credentials</small>
    //             </div>
    //             <form>
    //               <div className="relative w-full mb-3">
    //                 <label
    //                   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                   htmlFor="grid-password"
    //                 >
    //                   Name
    //                 </label>
    //                 <input
    //                   type="email"
    //                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                   placeholder="Name"
    //                 />
    //               </div>

    //               <div className="relative w-full mb-3">
    //                 <label
    //                   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                   htmlFor="grid-password"
    //                 >
    //                   Email
    //                 </label>
    //                 <input
    //                   type="email"
    //                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                   placeholder="Email"
    //                 />
    //               </div>

    //               <div className="relative w-full mb-3">
    //                 <label
    //                   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                   htmlFor="grid-password"
    //                 >
    //                   Password
    //                 </label>
    //                 <input
    //                   type="password"
    //                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                   placeholder="Password"
    //                 />
    //               </div>

    //               <div>
    //                 <label className="inline-flex items-center cursor-pointer">
    //                   <input
    //                     id="customCheckLogin"
    //                     type="checkbox"
    //                     className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
    //                   />
    //                   <span className="ml-2 text-sm font-semibold text-blueGray-600">
    //                     I agree with the{" "}
    //                     <a
    //                       href="#pablo"
    //                       className="text-lightBlue-500"
    //                       onClick={(e) => e.preventDefault()}
    //                     >
    //                       Privacy Policy
    //                     </a>
    //                   </span>
    //                 </label>
    //               </div>

    //               <div className="text-center mt-6">
    //                 <button
    //                   className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
    //                   type="button"
    //                 >
    //                   Create Account
    //                 </button>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

Register.layout = Auth;
