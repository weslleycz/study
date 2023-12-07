"use client";

import { api } from "@/app/services/api";
import { theme } from "@/app/theme";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Chip, Container, Paper, Typography } from "@mui/material";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
const MensagemBtn = dynamic(() => import("../../components/MensagemBtn"), {
  ssr: false,
});

const Perfil = () => {
  const params = useParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Student");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/users/byId/${params?.id}`);
        setRole(res.data.role);
        setName(res.data.name);
        setUserId(res.data.id);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
          {userId === (getCookie("id") as string) ? (
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
          ) : (
            <></>
          )}

          <Box display={"flex"} justifyContent={"center"}>
            <Box alignItems={"center"} display={"flex"}>
              <Typography sx={{ marginTop: 2 }} variant="h5" gutterBottom>
                {name}
              </Typography>
              {role === "Student" ? (
                <Chip color="primary" label="Aluno" />
              ) : (
                <Chip color="primary" label="Professor" />
              )}
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <MensagemBtn
              id={getCookie("id") as string}
              userID={params?.id as string}
            />
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Perfil;
