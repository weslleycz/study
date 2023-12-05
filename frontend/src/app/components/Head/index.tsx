"use client";

import InsertCommentIcon from "@mui/icons-material/InsertComment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SchoolIcon from "@mui/icons-material/School";
import { Avatar, Badge, Box, Button, Stack, Typography } from "@mui/material";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";

const Head = () => {
  const pathname = usePathname();
  return pathname != "/auth" ? (
    <>
      <div>
        <Box className={styles.container}>
          <Box>
            <Stack direction="row" spacing={2}>
              <Link href={"/"}>
                {" "}
                <SchoolIcon color="primary" />
              </Link>

              <Box sx={{ ml: 1 }}>
                <Link href={"/"}>
                  <Button variant="text">Home</Button>
                </Link>
                <Button variant="text">Cursos</Button>
              </Box>
            </Stack>
          </Box>
          <Box>
            {getCookie("token") === undefined ? (
              <>
                <Link href={"/auth"}>
                  <Button color="info" variant="contained">
                    Entrar
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Box className={styles["container-avatar"]}>
                  <Stack direction="row" spacing={3}>
                    <Badge badgeContent={1} color="info">
                      <InsertCommentIcon color="primary" />
                    </Badge>
                    <Badge badgeContent={2} color="info">
                      <NotificationsIcon color="primary" />
                    </Badge>
                  </Stack>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Head;
