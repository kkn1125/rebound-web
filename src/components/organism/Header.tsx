import Logo from "@components/atom/Logo";
import CallToAction from "@components/molecular/CallToAction";
import MenuList from "@components/molecular/MenuList";
import { Stack, Toolbar } from "@mui/material";

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  return (
    <Toolbar
      component={Stack}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      top={0}
      left={0}
      sx={{
        background: (theme) => theme.palette.background.default + 56,
        backdropFilter: "blur(10px)",
        position: "sticky",
        zIndex: 999,
        borderBottom: (theme) => `1px solid ${theme.palette.background.paper}`,
      }}
    >
      <Logo />
      <MenuList />
      <CallToAction />
    </Toolbar>
  );
};

export default Header;
