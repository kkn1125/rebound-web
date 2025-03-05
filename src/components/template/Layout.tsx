import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../organism/Header";
import Footer from "../organism/Footer";

interface LayoutProps {}
const Layout: React.FC<LayoutProps> = () => {
  return (
    <Stack sx={{ background: (theme) => theme.palette.background.default }}>
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default Layout;
