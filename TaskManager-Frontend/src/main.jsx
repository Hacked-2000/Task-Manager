import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import App from "./App.jsx";
import theme from "./theme/theme";
import "./assets/common.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
);
