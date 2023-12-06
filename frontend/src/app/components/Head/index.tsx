"use client";

import { api } from "@/app/services/api";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SchoolIcon from "@mui/icons-material/School";
import { Badge, Box, Button, Stack } from "@mui/material";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AvatarMenu } from "../AvatarMenu";
import styles from "./styles.module.scss";

const Head = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");
      if (token) {
        try {
          const userRes = await api.get(`/users/${token}`);
          const userData = userRes.data;

          if (userData.id && typeof userData.id === "string") {
            setName(userData.name);
            setId(userData.id);
          } else {
            console.error("Invalid user ID:", userData.id);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
  }, []);

  const pathname = usePathname();
  return pathname !== "/auth" ? (
    <div>
      <Box className={styles.container}>
        <Box>
          <Stack direction="row" spacing={2}>
            <Link href={"/"}>
              <SchoolIcon color="primary" />
            </Link>
            {getCookie("token") === undefined ? (
              <></>
            ) : (
              <>
                <Box sx={{ ml: 1 }}>
                  <Link href={"/"}>
                    <Button variant="text">Home</Button>
                  </Link>
                  <Button variant="text">Disciplinas</Button>
                </Box>
              </>
            )}
          </Stack>
        </Box>
        <Box>
          {getCookie("token") === undefined ? (
            <Link href={"/auth"}>
              <Button color="info" variant="contained">
                Entrar
              </Button>
            </Link>
          ) : (
            <Box className={styles["container-avatar"]}>
              <Stack direction="row" spacing={3}>
                <Badge badgeContent={0} color="info">
                  <InsertCommentIcon color="primary" />
                </Badge>
                <Badge badgeContent={0} color="info">
                  <NotificationsIcon color="primary" />
                </Badge>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <AvatarMenu name={name} id={id} />
                </Box>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  ) : (
    <></>
  );
};

export default Head;
