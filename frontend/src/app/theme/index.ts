import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#8956DF",
      contrastText: "#FFFFFF",
    },
    info:{
      main: "#BB93FF",
      contrastText: "#FFFFFF",
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});