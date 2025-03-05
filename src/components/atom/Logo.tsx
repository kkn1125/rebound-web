import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface LogoProps {}
const Logo: React.FC<LogoProps> = () => {
  return (
    <Typography
      component={Link}
      className="playfair-display-bold"
      to="/"
      variant="h5"
      fontWeight={700}
      sx={{ textDecoration: "none" }}
    >
      Rebound
    </Typography>
  );
};

export default Logo;
