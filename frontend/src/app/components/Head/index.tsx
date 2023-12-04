import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";
import SchoolIcon from "@mui/icons-material/School";

export const Head = () => {
  return (
    <>
      <Box className={styles.container}>
        <SchoolIcon color="primary" />
      </Box>
    </>
  );
};
