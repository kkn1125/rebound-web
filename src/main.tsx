import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/index.css";
import AppRouter from "./routes/AppRouter";
import GlobalThemeProvider from "@provider/GlobalThemeProvider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/">
    <GlobalThemeProvider>
      <AppRouter />
    </GlobalThemeProvider>
  </BrowserRouter>
);
