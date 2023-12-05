"use client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import styles from "./styles.module.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { api } from "@/app/services/api";
import { useRouter } from "next/navigation";

export const Register = () => {
  const [isVisibilityPassword, setIsVisibilityPassword] = useState(false);
  const [isVisibilityPasswordConfirm, setIsVisibilityPasswordConfirm] =
    useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();
  const handlesubmit = async () => {
    setErro("");
    if (!name) {
      setErro("Você precisa preencher o seu nome.");
      return;
    }
    if (!email) {
      setErro("Você precisa preencher o seu E-mail.");
      return;
    }
    if (!password) {
      setErro("Você precisa preencher a senha.");
      return;
    }
    if (password != passwordConfirm) {
      setErro("As senhas não correspondem");
      return;
    }
    try {
      const res = await api.post("/users?role=Student", {
        email,
        name,
        password,
      });
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 72 * 60 * 60 * 1000);
      setCookie("token", res.data, {
        expires: expirationDate,
        secure: true,
        sameSite: "lax",
      });
      router.push("/");
    } catch (error: any) {
      if (typeof error.response.data.message !== "string") {
        setErro(error.response.data.message.message[0]);
      } else {
        setErro(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Grid marginTop={0.1} container spacing={2}>
        <Grid
          sx={{
            height: "100vh",
            color: "white",
            p: 2,
          }}
          className={styles["continer-left"]}
          item
          xs={5}
        >
          <Box>
            <Link href={"/"}>
              <IconButton color="inherit">
                <ArrowBackIosNewIcon />
              </IconButton>
            </Link>
            <Box
              height={"80vh"}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                display: "flex",
              }}
              p={2}
              textAlign="left"
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
                  Bem-vindo de volta!
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Para manter-se conectado conosco, por favor, faça o login em
                  sua conta.
                </Typography>
                <Button
                  fullWidth
                  color="inherit"
                  variant="outlined"
                  size="large"
                  sx={{ marginTop: 2 }}
                >
                  Entrar
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid className={styles["continer-right"]} item xs={7}>
          <Box className={styles.cont} height={"100%"}>
            <Container maxWidth="sm">
              <Box>
                <Typography
                  color={"#8956df"}
                  sx={{ fontWeight: 900 }}
                  variant="h4"
                  gutterBottom
                >
                  Criar uma conta
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    sx={{ background: "#F4F8F7", width: "100%" }}
                    label="Nome"
                    variant="filled"
                    required
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                  />
                  <TextField
                    sx={{ background: "#F4F8F7" }}
                    label="E-mail"
                    variant="filled"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                  />
                  <TextField
                    sx={{ background: "#F4F8F7", width: "100%" }}
                    type={isVisibilityPassword ? "text" : "password"}
                    label="Senha"
                    variant="filled"
                    required
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() =>
                            setIsVisibilityPassword(!isVisibilityPassword)
                          }
                          color="primary"
                        >
                          {isVisibilityPassword ? (
                            <VisibilityIcon color="primary" />
                          ) : (
                            <VisibilityOffIcon color="primary" />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                  <TextField
                    sx={{ background: "#F4F8F7", width: "100%" }}
                    type={isVisibilityPasswordConfirm ? "text" : "password"}
                    label="Confirmar senha"
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                    value={passwordConfirm}
                    variant="filled"
                    required
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() =>
                            setIsVisibilityPasswordConfirm(
                              !isVisibilityPasswordConfirm
                            )
                          }
                          color="primary"
                        >
                          {isVisibilityPasswordConfirm ? (
                            <VisibilityIcon color="primary" />
                          ) : (
                            <VisibilityOffIcon color="primary" />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                  {erro === "" ? null : <Alert severity="error">{erro}</Alert>}

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => handlesubmit()}
                  >
                    cadastre-se
                  </Button>
                </Stack>
              </Box>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
