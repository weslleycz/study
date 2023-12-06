"use client";

import { api } from "@/app/services/api";
import { theme } from "@/app/theme";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import styles from "./styles.module.scss";

const Perfil = () => {
  const params = useParams();
  const router = useRouter();
  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader() as any;
      reader.onloadend = async () => {
        const base64Content = reader.result.split(",")[1];

        try {
          await api.post(`/users/upload/${params?.id}`, {
            data: base64Content,
          });
          window.location.reload();
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      <Container
        sx={{ display: "flex", justifyContent: "center" }}
        maxWidth="lg"
      >
        <Paper className={styles.container}>
          <Box display={"flex"} justifyContent={"center"}>
            <Avatar
              sx={{
                background: theme.palette.info.main,
                width: 160,
                height: 160,
              }}
              alt={""}
              src={process.env.API_Url + `/users/avatar/${params?.id}`}
            />
          </Box>
          <Box justifyContent={"center"} marginTop={-2} display={"flex"}>
            <Box
              sx={{
                width: "25%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <label htmlFor="fileInput" className={styles["file-label"]}>
                <EditIcon sx={{ color: "white" }} />
              </label>
              <input
                type="file"
                id="fileInput"
                className={styles["input-file"]}
                onChange={handleFileChange}
              />
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Box alignItems={"center"} display={"flex"}>
              <Typography sx={{ marginTop: 2 }} variant="h4" gutterBottom>
                Weslley
              </Typography>
              <Chip color="primary" label="Aluno" />
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Tabs aria-label="basic tabs example">
              <Tab label="Minhas disciplinas" />
              <Tab label="Mensagens" />
            </Tabs>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Perfil;
