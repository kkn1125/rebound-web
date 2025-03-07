import { Route, Routes } from "react-router-dom";
import Layout from "../components/template/Layout";
import LandingPage from "../components/page/LandingPage";

interface AppRouterProps {}
const AppRouter: React.FC<AppRouterProps> = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<Layout />}>
          <Route index element={<LandingPage title="Main" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
