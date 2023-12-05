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
} from "@mui/material";
import styles from "./styles.module.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { setCookie } from "cookies-next";

export const Login = () => {
  const handlesubmit = async () => {
    setCookie('token', 'value',);
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
                  />
                  <TextField
                    sx={{ background: "#F4F8F7" }}
                    label="E-mail"
                    variant="filled"
                    type="email"
                    required
                  />
                  <TextField
                    sx={{ background: "#F4F8F7", width: "100%" }}
                    type="password"
                    label="Senha"
                    variant="filled"
                    required
                    InputProps={{
                      endAdornment: (
                        <IconButton color="primary">
                          <VisibilityOffIcon color="primary" />
                        </IconButton>
                      ),
                    }}
                  />
                  <TextField
                    sx={{ background: "#F4F8F7", width: "100%" }}
                    type="password"
                    label="Confirmar senha"
                    variant="filled"
                    required
                    InputProps={{
                      endAdornment: (
                        <IconButton color="primary">
                          <VisibilityOffIcon color="primary" />
                        </IconButton>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={()=>handlesubmit()}
                  >
                    Entrar
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
