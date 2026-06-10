import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6c63ff" },
    secondary: { main: "#00d4aa" },
    background: {
      default: "#0f1117",
      paper: "#1a1d27",
    },
    error: { main: "#ff6b6b" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
