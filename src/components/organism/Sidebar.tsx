"use client";

import { useLogout } from "@/hooks/queries/auth";
import CTButton from "@components/atom/CTButton";
import NotificationBadge from "@components/atom/NotificationBadge";
import { NotoTypography } from "@components/atom/NotoTypography";
import { SerifTypography } from "@components/atom/SerifTypography";
import ThemeAwareIcon from "@components/atom/ThemeAwareIcon";
import NotificationPanel from "@components/organism/NotificationPanel";
import { useGSAP } from "@gsap/react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useAuth } from "@provider/AppStateProvider";
import gsap from "gsap";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  FiBookOpen,
  FiEdit3,
  FiHome,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const navigationItems = [
  { name: "피드", icon: <FiHome />, to: "/stories" },
  { name: "글쓰기", icon: <FiEdit3 />, to: "/assemble" },
  { name: "내 조각함", icon: <FiBookOpen />, to: "/my-pieces" },
];

const accountItems = [
  { name: "마이페이지", icon: <FiUser />, to: "/profile" },
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

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const logoutMutation = useLogout();

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

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      handleClose();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
        {isAuthenticated && user ? (
          <Stack alignItems="center" gap={2} px={3} pb={3}>
            <Avatar sx={{ width: 80, height: 80 }}>
              {user.nickname.charAt(0)}
            </Avatar>
            <SerifTypography variant="h6" fontWeight={600}>
              {user.nickname}
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
                조각 기록
              </CTButton>
              <CTButton
                size="small"
                variant="outlined"
                color="dark"
                component={Link}
                to="/assemble"
                onClick={handleClose}
                sx={{ borderRadius: 20, fontSize: "0.75rem" }}
              >
                글쓰기
              </CTButton>
            </Stack>
          </Stack>
        ) : (
          <Stack alignItems="center" gap={2} px={3} pb={3}>
            <Avatar sx={{ width: 80, height: 80 }}>?</Avatar>
            <SerifTypography variant="h6" fontWeight={600}>
              Guest
            </SerifTypography>
            <Stack direction="row" gap={1}>
              <CTButton
                size="small"
                variant="outlined"
                color="dark"
                component={Link}
                to="/login"
                onClick={handleClose}
                sx={{ borderRadius: 20, fontSize: "0.75rem" }}
              >
                로그인
              </CTButton>
              <CTButton
                size="small"
                variant="outlined"
                color="dark"
                component={Link}
                to="/signup"
                onClick={handleClose}
                sx={{ borderRadius: 20, fontSize: "0.75rem" }}
              >
                회원가입
              </CTButton>
            </Stack>
          </Stack>
        )}

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
          {isAuthenticated && (
            <>
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
                      <Box
                        sx={{ mr: 2, display: "flex", alignItems: "center" }}
                      >
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
            </>
          )}
        </Stack>

        {/* Bottom Actions */}
        <Stack
          direction="row"
          gap={1}
          p={3}
          borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        >
          {isAuthenticated ? (
            <>
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
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
              </CTButton>
            </>
          ) : (
            <>
              <CTButton
                variant="outlined"
                color="dark"
                size="small"
                sx={{ borderRadius: 20, flex: 1 }}
                component={Link}
                to="/login"
                onClick={handleClose}
              >
                로그인
              </CTButton>
              <CTButton
                variant="outlined"
                color="dark"
                size="small"
                sx={{ borderRadius: 20, flex: 1 }}
                component={Link}
                to="/signup"
                onClick={handleClose}
              >
                회원가입
              </CTButton>
            </>
          )}
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
