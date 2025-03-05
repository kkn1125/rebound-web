import { ThemeContext } from "@providers/GlobalThemeProvider";
import { Button } from "@mui/material";
import { useContext } from "react";

interface DarkModeButtonProps {}
const DarkModeButton: React.FC<DarkModeButtonProps> = () => {
  const { mode, toggleColorMode } = useContext(ThemeContext);
  const handleToggleDarkMode = () => {
    toggleColorMode();
  };
  return (
    <Button variant="contained" color="dark" onClick={handleToggleDarkMode}>
      {mode()}
    </Button>
  );
};

export default DarkModeButton;
