"use client";

import type React from "react";
import { Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const menuList = [
  { name: "글쓰기", to: "/assemble" },
  { name: "내 조각함", to: "/my-pieces" },
  { name: "피드", to: "/stories" },
  { name: "마이페이지", to: "/profile" },
];

type MenuListProps = {};
const MenuList: React.FC<MenuListProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (to: string) => {
    if (to.startsWith("#")) {
      // 앵커 링크인 경우
      const isMainPage = location.pathname === "/";
      if (isMainPage) {
        const targetElement = document.querySelector(to);
        if (targetElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 80,
            },
            ease: "power2.out",
          });
        }
      } else {
        navigate("/", { state: { scrollTo: to } });
      }
    } else {
      // 일반 페이지 링크
      navigate(to);
    }
  };

  return (
    <Stack
      display={{ xs: "none", md: "flex" }}
      direction="row"
      gap={3}
      alignItems="center"
    >
      {menuList.map((menu) => (
        <Typography
          key={menu.name}
          color="textPrimary"
          component="button"
          onClick={() => handleMenuClick(menu.to)}
          sx={{
            textDecoration: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "inherit",
            "&:hover": {
              color: "primary.main",
            },
            transition: "color 0.2s ease",
          }}
        >
          {menu.name}
        </Typography>
      ))}
    </Stack>
  );
};

export default MenuList;
