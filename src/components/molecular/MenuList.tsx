import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface MenuListProps {}
const MenuList: React.FC<MenuListProps> = () => {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Typography
        color="textPrimary"
        component={Link}
        to="/"
        sx={{ textDecoration: "none" }}
      >
        경험공유
      </Typography>
      <Typography
        color="textPrimary"
        component={Link}
        to="/"
        sx={{ textDecoration: "none" }}
      >
        통계
      </Typography>
    </Stack>
  );
};

export default MenuList;
