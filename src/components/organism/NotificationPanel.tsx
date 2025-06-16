"use client";

import type React from "react";
import { NotoTypography } from "@components/atom/NotoTypography";
import { SerifTypography } from "@components/atom/SerifTypography";
import CTButton from "@components/atom/CTButton";
import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Chip,
  Typography,
  Paper,
} from "@mui/material";
import { FiX } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Notification {
  id: string;
  type: "like" | "comment";
  userName: string;
  postTitle: string;
  commentContent?: string;
  createdAt: string;
  isRead: boolean;
}

// Mock data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    userName: "김철수",
    postTitle: "첫 번째 실패 이야기",
    createdAt: "2024-01-15T14:30:00",
    isRead: false,
  },
  {
    id: "2",
    type: "comment",
    userName: "이영희",
    postTitle: "프로젝트 실패 경험",
    commentContent:
      "저도 비슷한 경험이 있어서 공감이 많이 됩니다. 함께 힘내요!",
    createdAt: "2024-01-15T12:15:00",
    isRead: false,
  },
  {
    id: "3",
    type: "like",
    userName: "박민수",
    postTitle: "운동 계획 실패",
    createdAt: "2024-01-14T16:45:00",
    isRead: true,
  },
];

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  open,
  onClose,
  anchorEl,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState(mockNotifications);

  useGSAP(() => {
    if (open && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        {
          opacity: 0,
          scale: 0.95,
          transformOrigin: "top left",
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [open]);

  const handleClose = () => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.15,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getNotificationText = (notification: Notification) => {
    if (notification.type === "like") {
      return `${notification.userName}님이 나의 "${notification.postTitle}" 글에 공감했습니다.`;
    } else {
      return `${notification.userName}님이 댓글을 작성했습니다.`;
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        handleClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        open
      ) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (!open) return null;

  // Calculate position based on anchor element
  const getPosition = () => {
    if (!anchorEl) return { top: 60, left: 20 };

    const rect = anchorEl.getBoundingClientRect();
    return {
      top: rect.bottom + 8,
      left: rect.right,
    };
  };

  const position = getPosition();

  return (
    <Paper
      ref={panelRef}
      elevation={8}
      sx={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: 380,
        maxHeight: 500,
        zIndex: 1400,
        borderRadius: 3,
        overflow: "hidden",
        opacity: 0,
        scale: 0.95,
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        borderBottom={1}
        borderColor="divider"
      >
        <SerifTypography variant="h6" fontWeight={600}>
          알림
        </SerifTypography>
        <IconButton onClick={handleClose} size="small">
          <FiX />
        </IconButton>
      </Stack>

      {/* Mark All as Read Button */}
      <Stack p={2}>
        <CTButton
          size="small"
          variant="outlined"
          color="dark"
          onClick={handleMarkAllAsRead}
          sx={{ borderRadius: 2, alignSelf: "flex-start" }}
        >
          모두 읽음
        </CTButton>
      </Stack>

      {/* Notifications List */}
      <Box sx={{ maxHeight: 350, overflowY: "auto" }}>
        <List sx={{ p: 0 }}>
          {notifications.map((notification, index) => (
            <Box key={notification.id}>
              <ListItem
                sx={{
                  px: 3,
                  py: 2,
                  backgroundColor: notification.isRead
                    ? "transparent"
                    : "action.hover",
                  "&:hover": {
                    backgroundColor: "action.selected",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Stack gap={1}>
                      <NotoTypography variant="body2" fontWeight={500}>
                        {getNotificationText(notification)}
                      </NotoTypography>
                      {notification.type === "comment" &&
                        notification.commentContent && (
                          <NotoTypography
                            variant="caption"
                            color="textSecondary"
                            sx={{ fontStyle: "italic" }}
                          >
                            "
                            {notification.commentContent.length > 10
                              ? notification.commentContent.substring(0, 10) +
                                "..."
                              : notification.commentContent}
                            "
                          </NotoTypography>
                        )}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={1}
                      >
                        <NotoTypography variant="caption" color="textDisabled">
                          {formatDate(notification.createdAt)}
                        </NotoTypography>
                        {!notification.isRead && (
                          <Chip
                            label="읽지 않음"
                            size="small"
                            color="primary"
                            variant="filled"
                            onClick={() => handleMarkAsRead(notification.id)}
                            sx={{
                              fontSize: "0.7rem",
                              height: "20px",
                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: "primary.dark",
                              },
                            }}
                          />
                        )}
                      </Stack>
                    </Stack>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </Box>
          ))}
        </List>

        {notifications.length === 0 && (
          <Stack alignItems="center" justifyContent="center" py={8}>
            <Typography variant="body2" color="textSecondary">
              새로운 알림이 없습니다
            </Typography>
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default NotificationPanel;
