import * as React from "react";
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

import Auth from "layouts/Auth.js";
import { useRouter } from "next/router";
import TextForm from "../../components/TextForm/TextForm";

const theme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const [loginState, setLoginState] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users"));
    const user =
      users !== null ? users.find((x) => x.email === loginState.email) : {};

    if (
      user !== undefined &&
      user.email === loginState.email &&
      user.password === loginState.password
    ) {
      router.push("/admin/dashboard");
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: user.id,
          username: user.username,
          store: user.store,
          email: user.email,
          logged: true,
          role: user.role,
          profilePhoto: null,
        })
      );
    } else {
      router.push("/auth/signin");
    }
  };

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
            Login
          </Typography>
          <form id="form" onSubmit={handleSubmit}>
            {/* <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            > */}
            <TextForm
              // margin="normal"
              required
              fullWidth
              id="email"
              label="Email Adresi"
              name="email"
              // autoComplete="email"
              //autoFocus
              style={{ marginBottom: 48 }}
              onChange={(e) =>
                setLoginState({
                  ...loginState,
                  email: e.target.value,
                })
              }
            />
            <TextForm
              // margin="normal"
              required
              fullWidth
              name="password"
              label="Parola"
              type="password"
              id="password"
              // autoComplete="current-password"
              style={{ marginBottom: 24 }}
              onChange={(e) =>
                setLoginState({
                  ...loginState,
                  password: e.target.value,
                })
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Beni hatirla"
              style={{ marginTop: 12, marginLeft: 0 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: 48, marginBottom: 24 }}
              sx={{ mt: 12, mb: 2 }}
            >
              Giris Yap
            </Button>
            <Grid container>
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
                  href="/auth/register"
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
            </Grid>
            {/* </Box> */}
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

SignIn.layout = Auth;
