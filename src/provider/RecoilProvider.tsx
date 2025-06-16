import type React from "react"
/**
 * Recoil 프로바이더 설정
 */

import { RecoilRoot } from "recoil"

interface RecoilProviderProps {
  children: React.ReactNode
}

export const RecoilProvider: React.FC<RecoilProviderProps> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}
