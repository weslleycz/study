import { Box, Paper, Typography } from "@mui/material";
import { Lesson } from "../Lesson";

export const Section = () => {
  return (
    <>
      <Box marginTop={1} marginRight={2}>
        <Paper
          sx={{
            boxShadow: "none",
            border: "1px solid #F6F5F5",
          }}
          elevation={1}
        >
          {" "}
          <Box display={"flex"} p={1}>
            <Typography
              sx={{ fontWeight: 600 }}
              variant="subtitle1"
              gutterBottom
            >
              Uma Jornada de Aprendizado para Iniciantes
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              10:00
            </Typography>
          </Box>
          <Lesson />
          <Lesson />
          <Lesson />
          <Lesson />
        </Paper>
      </Box>
    </>
  );
};
