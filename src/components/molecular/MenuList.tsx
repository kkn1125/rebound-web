import { Stack, Typography } from "@mui/material";

const menuList = [
  { name: "리바운드 소개", to: "#intro" },
  { name: "실패 공유", to: "#failgram" },
  { name: "성장 과정", to: "#growth" },
  { name: "커뮤니티", to: "#community" },
];

interface MenuListProps {}
const MenuList: React.FC<MenuListProps> = () => {
  return (
    <Stack direction="row" gap={3} alignItems="center">
      {menuList.map((menu) => (
        <Typography
          key={menu.name}
          color="textPrimary"
          component="a"
          href={menu.to}
          sx={{ textDecoration: "none" }}
        >
          {menu.name}
        </Typography>
      ))}
    </Stack>
  );
};

export default MenuList;
