# 업데이트 내역

- 2024-06-17
  - 조각 작성 화면 UI 개선: 감정 태그 다중 선택, 실패 유형 드롭다운, 공개/비공개 토글 등 UX 강화
  - 내 조각함(마이피스) 필터 기능 추가: 감정/유형별 필터, 조각 카드형 리스트, 편집/삭제 기능
  - 마이페이지에서 작성한 조각/글 수 통계 및 탭 전환 UI 구현
  - 글(스토리) 조립 및 게시 기능 추가: 조각 선택, 순서 변경(드래그&드롭/↑↓), 연결 문장 입력, 썸네일 이미지 첨부, 대표 감정 선택, 미리보기 및 게시하기 UI 구현
  - 메인 피드/스토리 리스트 개선: 최신 글 리스트, 썸네일, 대표 감정, 미리보기 텍스트, 작성자/작성일 표시, 인기순/최신순 정렬 옵션 추가
  - 마이페이지 개선: 프로필, 자기소개, 통계(작성 글/조각 수), 작성 글/조각 탭 전환 등 UI/UX 개선
  - 완전한 타입 정의: Swagger 스펙 기반 TypeScript 타입 정의, API 요청/응답 인터페이스, 에러 처리 타입 적용
  - 모듈화된 API 클라이언트: apis/ 디렉토리로 기능별 분리, Axios 인터셉터 통한 토큰 자동 관리, 에러 처리 및 토큰 갱신 로직 구현
  - TanStack Query 통합: 각 API별 커스텀 훅 제공, 캐시 무효화 및 최적화, 에러 처리 및 로딩 상태 관리
  - Recoil 상태 관리: 인증 상태, 조각/조립 필터 상태, localStorage 동기화
  - 프로바이더 설정: QueryProvider와 RecoilProvider, 개발 도구 통합
  - 타입 안전성 강화: 모든 API 호출에 타입 적용, 컴파일 타임 에러 방지, IntelliSense 지원
