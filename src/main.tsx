import { AuthProvider } from "@provider/AppStateProvider";
import GlobalThemeProvider from "@provider/GlobalThemeProvider";
import { QueryProvider } from "@provider/QueryProvider";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/index.css";
import { AppStateProvider } from "./contexts/APpStateContext";
import AppRouter from "./routes/AppRouter";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/">
    <QueryProvider>
      <AuthProvider>
        <AppStateProvider>
          <GlobalThemeProvider>
            <AppRouter />
          </GlobalThemeProvider>
        </AppStateProvider>
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
