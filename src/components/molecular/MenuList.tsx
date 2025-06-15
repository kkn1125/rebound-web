"use client";

import type React from "react";
import { Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const menuList = [
  { name: "리바운드 소개", to: "#intro" },
  { name: "실패 공유", to: "#failgram" },
  { name: "성장 과정", to: "#growth" },
  { name: "커뮤니티", to: "#community" },
];

type MenuListProps = {};
const MenuList: React.FC<MenuListProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { contextSafe } = useGSAP();

  const handleMenuClick = contextSafe((sectionId: string) => {
    const isMainPage = location.pathname === "/";

    if (isMainPage) {
      // 메인페이지에 있을 때 - 해당 섹션으로 스크롤
      const targetElement = document.querySelector(sectionId);
      if (targetElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement,
            offsetY: 80, // 헤더 높이만큼 오프셋
          },
          ease: "power2.out",
        });
      }
    } else {
      // 다른 페이지에 있을 때 - 메인페이지로 이동 후 스크롤
      navigate("/", { state: { scrollTo: sectionId } });
    }
  });

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
