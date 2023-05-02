import React from "react";
import { v4 as uuidv4 } from "uuid";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";

import Auth from "layouts/Auth.js";
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

    const userState = {
      id: uuidv4(),
      email: formData.get("email"),
      password: formData.get("password"),
      store: formData.get("store"),
      username: formData.get("username"),
      requestForAdmin: formData.get("requestForAdmin"),
      createdDate: new Date(),
      role: formData.get("username") === "fk2534" ? "admin" : "user",
    };

    localStorage.setItem("users", JSON.stringify([...users, userState]));

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
              control={<Checkbox id={"requestForAdmin"} color="primary" />}
              label={`Admin rolü icin istek gönder`}
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

Register.layout = Auth;
