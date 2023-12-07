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
import { LoadingButton } from "@mui/lab";
import { theme } from "../../theme";

type Props = {
  setIsLogin: any;
};

export const Login = ({ setIsLogin }: Props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [isVisibilityPassword, setIsVisibilityPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handlesubmit = async () => {
    setIsLoading(true);
    if (!email) {
      setIsLoading(false);
      setErro("Você precisa preencher o seu E-mail.");
      return;
    }
    if (!password) {
      setIsLoading(false);
      setErro("Você precisa preencher a senha.");
      return;
    }
    try {
      const res = await api.post("/users/login",{
        email,
        password,
      })
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 72 * 60 * 60 * 1000);
      setCookie("token", res.data.token, {
        expires: expirationDate,
        secure: true,
        sameSite: "lax",
      });
      setCookie("id", res.data.id, {
        expires: expirationDate,
        secure: true,
        sameSite: "lax",
      });
      router.push("/");
      setIsLoading(false);
    } catch (error:any) {
      if (typeof error.response.data.message !== "string") {
        setErro(error.response.data.message.message[0]);
        setIsLoading(false);
      } else {
        setErro(error.response.data.message);
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid className={styles["continer-right"]} item xs={7}>
          <Box className={styles.cont} height={"100vh"}>
            <Container maxWidth="sm">
              <Box>
                <Typography
                  color={theme.palette.primary.main}
                  sx={{ fontWeight: 900 }}
                  variant="h4"
                  gutterBottom
                >
                  Login
                </Typography>
                <Stack spacing={2}>
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
                  {erro === "" ? null : <Alert severity="error">{erro}</Alert>}
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    loading={isLoading}
                    onClick={() => handlesubmit()}
                  >
                    Entrar
                  </LoadingButton>
                </Stack>
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid
          sx={{
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
                  Não tem uma conta?
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Para realizar sua inscrição nos cursos desejados, é necessário
                  criar uma conta.
                </Typography>
                <Button
                  fullWidth
                  color="inherit"
                  variant="outlined"
                  size="large"
                  sx={{ marginTop: 2 }}
                  onClick={() => setIsLogin(false)}
                >
                  Cadastre-se
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
