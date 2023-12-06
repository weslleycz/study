import { Box, Divider, Paper, Typography } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { theme } from "../../theme";

export const Lesson = () => {
  return (
    <>
      <Box p={1} display={"flex"}>
        <Box p={0.7} >
        <PlayCircleIcon sx={{color:theme.palette.primary.main}}/>
        </Box>
        <Typography color={"#ADB0B6"}  variant="subtitle2" gutterBottom>
          Explorando os Fundamentos Essenciais do Java
        </Typography>
        <Typography color={"#ADB0B6"} variant="subtitle2" gutterBottom>
          10:00
        </Typography>
      </Box>
    </>
  );
};
