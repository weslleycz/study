"use client";

import SchoolIcon from "@mui/icons-material/School";
import { Avatar, Box, Button, Stack } from "@mui/material";
import {
  getCookie
} from "cookies-next";
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
            <Link href={"/auth"}>
              <Button color="info" variant="contained">
                Entrar
              </Button>
            </Link>
          ) : <Avatar>H</Avatar>}
        </Box>
      </Box>
    </div>
    </>
  ) : (
    <></>
  );
};

export default Head