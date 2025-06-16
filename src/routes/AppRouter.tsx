import type React from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "../components/template/Layout"
import LandingPage from "../components/page/LandingPage"
import PieceWritingPage from "../components/page/PieceWritingPage"
import MyPiecesPage from "../components/page/MyPiecesPage"
import StoriesPage from "../components/page/StoriesPage"
import LoginPage from "../components/page/LoginPage"
import SignupPage from "../components/page/SignupPage"
import UserProfilePage from "../components/page/UserProfilePage"
import SettingsPage from "../components/page/SettingsPage"
import PieceAssemblyPage from "../components/page/PieceAssemblyPage"

type AppRouterProps = {}
const AppRouter: React.FC<AppRouterProps> = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<Layout />}>
          <Route index element={<LandingPage title="Main" />} />
          <Route path="write" element={<PieceWritingPage title="조각 작성" />} />
          <Route path="my-pieces" element={<MyPiecesPage title="내 조각들" />} />
          <Route path="stories" element={<StoriesPage title="이야기 보기" />} />
          <Route path="profile" element={<UserProfilePage title="내 프로필" />} />
          <Route path="settings" element={<SettingsPage title="설정" />} />
          <Route path="assemble" element={<PieceAssemblyPage title="조각 조립" />} />
        </Route>
        {/* Auth pages without layout */}
        <Route path="login" element={<LoginPage title="로그인" />} />
        <Route path="signup" element={<SignupPage title="회원가입" />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
