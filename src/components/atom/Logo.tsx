import { Link } from "react-router-dom";
import { SerifTypography } from "./SerifTypography";

interface LogoProps {}
const Logo: React.FC<LogoProps> = () => {
  return (
    <SerifTypography
      component={Link}
      to="/"
      variant="h5"
      fontWeight={700}
      sx={{ textDecoration: "none" }}
    >
      Rebound
    </SerifTypography>
  );
};

export default Logo;
