import Logo from "@components/atom/Logo";
import CallToAction from "@components/molecular/CallToAction";
import MenuList from "@components/molecular/MenuList";
import { Stack } from "@mui/material";

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p={2.5}
      sx={{
        background: (theme) => theme.palette.background.default,
        backDrop: "blur(5px)",
      }}
    >
      <Logo />
      <MenuList />
      <CallToAction />
    </Stack>
  );
};

export default Header;
