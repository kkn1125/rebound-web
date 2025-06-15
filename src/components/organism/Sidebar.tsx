"use client";

import type React from "react";
import { NotoTypography } from "@components/atom/NotoTypography";
import { SerifTypography } from "@components/atom/SerifTypography";
import CTButton from "@components/atom/CTButton";
import NotificationBadge from "@components/atom/NotificationBadge";
import NotificationPanel from "@components/organism/NotificationPanel";
import ThemeAwareIcon from "@components/atom/ThemeAwareIcon";
import {
  Stack,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { FiBookOpen, FiSettings, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navigationItems = [
  { name: "이야기 보기", icon: <FiBookOpen />, to: "/stories" },
];

const accountItems = [
  { name: "프로필", icon: <FiUser />, to: "/profile" },
  { name: "설정", icon: <FiSettings />, to: "/settings" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLButtonElement>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount] = useState(2); // Mock count

  useGSAP(() => {
    if (open) {
      // Animate sidebar in
      gsap.fromTo(
        sidebarRef.current,
        { x: -320 },
        { x: 0, duration: 0.3, ease: "power2.out" }
      );
      // Animate overlay in
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [open]);

  const handleClose = () => {
    // Close notification panel first if open
    if (notificationOpen) {
      setNotificationOpen(false);
    }

    // Animate out
    gsap.to(sidebarRef.current, {
      x: -320,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  const handleNotificationToggle = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <Box
        ref={overlayRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1200,
          opacity: 0,
        }}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <Box
        ref={sidebarRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 320,
          height: "100vh",
          backgroundColor: "background.default",
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          zIndex: 1300,
          transform: "translateX(-320px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header with notification */}
        <Stack direction="row" justifyContent="flex-end" p={2}>
          <Box ref={notificationRef}>
            <NotificationBadge
              count={notificationCount}
              onClick={handleNotificationToggle}
            />
          </Box>
        </Stack>

        {/* User Profile Section */}
        <Stack alignItems="center" gap={2} px={3} pb={3}>
          <Avatar
            src="/placeholder.svg?height=80&width=80"
            sx={{ width: 80, height: 80 }}
          />
          <SerifTypography variant="h6" fontWeight={600}>
            UserName
          </SerifTypography>
          <Stack direction="row" gap={1}>
            <CTButton
              size="small"
              variant="outlined"
              color="dark"
              component={Link}
              to="/write"
              onClick={handleClose}
              sx={{ borderRadius: 20, fontSize: "0.75rem" }}
            >
              조각 작성
            </CTButton>
            <CTButton
              size="small"
              variant="outlined"
              color="dark"
              component={Link}
              to="/my-pieces"
              onClick={handleClose}
              sx={{ borderRadius: 20, fontSize: "0.75rem" }}
            >
              내 조각들
            </CTButton>
          </Stack>
        </Stack>

        <Divider />

        {/* Navigation Menu */}
        <Stack flex={1} py={2}>
          <List>
            {navigationItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  onClick={handleClose}
                  sx={{
                    px: 3,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                    <ThemeAwareIcon size={20}>{item.icon}</ThemeAwareIcon>
                  </Box>
                  <ListItemText
                    primary={
                      <NotoTypography variant="body1" fontWeight={500}>
                        {item.name}
                      </NotoTypography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Account Section */}
          <Stack px={3} pb={2}>
            <NotoTypography
              variant="subtitle2"
              color="textSecondary"
              fontWeight={600}
              mb={1}
            >
              계정
            </NotoTypography>
          </Stack>

          <List>
            {accountItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  onClick={handleClose}
                  sx={{
                    px: 3,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                    <ThemeAwareIcon size={20}>{item.icon}</ThemeAwareIcon>
                  </Box>
                  <ListItemText
                    primary={
                      <NotoTypography variant="body1" fontWeight={500}>
                        {item.name}
                      </NotoTypography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>

        {/* Bottom Actions */}
        <Stack
          direction="row"
          gap={1}
          p={3}
          borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        >
          <CTButton
            variant="outlined"
            color="dark"
            size="small"
            sx={{ borderRadius: 20, flex: 1 }}
            component={Link}
            to="/settings"
            onClick={handleClose}
          >
            설정
          </CTButton>
          <CTButton
            variant="outlined"
            color="dark"
            size="small"
            sx={{ borderRadius: 20, flex: 1 }}
            component={Link}
            to="/login"
            onClick={handleClose}
          >
            로그아웃
          </CTButton>
        </Stack>
      </Box>

      {/* Notification Panel */}
      <NotificationPanel
        open={notificationOpen}
        onClose={handleNotificationClose}
        anchorEl={notificationRef.current}
      />
    </>
  );
};

export default Sidebar;
