"use client"

import type React from "react"
import Logo from "@components/atom/Logo"
import CallToAction from "@components/molecular/CallToAction"
import MenuList from "@components/molecular/MenuList"
import HamburgerButton from "@components/atom/HamburgerButton"
import Sidebar from "@components/organism/Sidebar"
import { Stack, Toolbar } from "@mui/material"
import { useState } from "react"

type HeaderProps = {}
const Header: React.FC<HeaderProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      <Toolbar
        component={Stack}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        top={0}
        left={0}
        sx={{
          background: (theme) => theme.palette.background.default + 56,
          backdropFilter: "blur(10px)",
          position: "sticky",
          zIndex: 999,
          borderBottom: (theme) => `1px solid ${theme.palette.background.paper}`,
        }}
      >
        {/* Left side with hamburger and logo */}
        <Stack direction="row" alignItems="center" gap={1}>
          <HamburgerButton onClick={handleSidebarToggle} />
          <Logo />
        </Stack>

        {/* Center menu (hidden on mobile) */}
        <MenuList />

        {/* Right side actions */}
        <CallToAction />
      </Toolbar>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
    </>
  )
}

export default Header
