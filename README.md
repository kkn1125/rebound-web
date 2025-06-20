리바운드는 실패 경험을 짧게 기록하고 조립하여 공유할 수 있는 브런치 스타일의 감정 기반 커뮤니티 서비스다.

---

## 📌 서비스 개요

**서비스명**: 리바운드 (Rebound)
**목적**: 실패를 경험한 사용자가 짧은 기록("조각")을 통해 감정을 정리하고, 그것을 기반으로 글("조립")을 만들어 공유함으로써 공감과 위로를 나누는 감정 기반 SNS 구축

**벤치마크 모델**: 브런치스토리 (Brunch Story)

* 콘텐츠 중심의 UI/UX
* 텍스트 기반 글쓰기 강화
* 사용자 프로필 기반 피드 제공

**핵심 개념**:

* **조각(Piece)**: 사용자가 실패 경험을 간단하게 메모하는 단위 콘텐츠. 2\~3줄 단위, 감정 태그, 실패 유형, 공개 설정 포함
* **조립(Build)**: 여러 조각을 조합해 하나의 글로 구성하는 방식. 정렬, 편집, 미리보기 후 게시 가능

**MVP 플랫폼**: 웹 (모바일 대응 포함)

---

## 🧱 MVP 핵심 기능 정의

### 1. 조각(Piece) 생성 및 관리

**pl**

* 사용자는 2\~3줄 정도의 실패 기록을 감정태그와 함께 작성하여 저장
* 조각은 감정 정리와 경험 분할 기록을 위한 개인 콘텐츠로 활용

**de**

* 입력창 UI, 감정 태그 토글, 실패 유형 드롭다운
* 조각 리스트 뷰 (카드형)

**fe**

* 조각 작성 컴포넌트 및 저장 기능
* 조각 리스트 조회 및 정렬 렌더링

**be**

* 조각 CRUD API (생성/조회/수정/삭제)

**db**

* 조각 테이블: id, 내용, 감정태그\[], 실패유형, 작성자ID, 공개여부, createdAt, updatedAt

---

### 2. 글(Build) 작성 (조각 조합)

**pl**

* 사용자는 여러 조각을 선택하여 글로 조립 가능
* 조각은 순서 변경(Drag & Drop), 감정 태그 요약, 썸네일 포함 가능
* 최종 글은 브런치 스타일 피드에 공개됨

**de**

* 조각 선택 화면, 순서 변경(드래그), 미리보기, 게시하기 UI

**fe**

* 조각 선택 및 정렬 기능
* 최종 글 구성 및 게시 요청 처리

**be**

* 글 생성 API, 조회 API

**db**

* 글 테이블: id, 조각ID\[], 썸네일, 대표 감정, 작성자ID, createdAt, updatedAt

---

### 3. 피드 및 마이페이지

**pl**

* 브런치처럼 리스트 + 썸네일 중심 구성
* 마이페이지에서 조각, 작성 글 목록, 작성 히스토리 확인 가능

**de**

* 피드 화면, 글 카드, 마이페이지 레이아웃

**fe**

* 글 리스트 조회 및 카드 렌더링
* 마이페이지 탭 전환

**be**

* 글 목록 API, 마이 콘텐츠 API

---

## 🖥 화면 구성 (MVP 기준)

### 1. 메인 피드 화면

* **상단 내비게이션 바**: 좌측에 리바운드 로고, 우측에 "글쓰기" 버튼, "내 조각함", "마이페이지" 아이콘
* **본문 영역**: 최신 글 리스트 (리스트 + 썸네일)

  * 글 카드 구성: 대표 감정 아이콘, 썸네일 이미지, 미리보기 텍스트 (최대 2줄), 작성자 닉네임, 작성일
* **하단 영역 (모바일용)**: 고정 하단 탭으로 글쓰기, 조각함, 피드로 빠르게 이동 가능

### 2. 조각 작성 화면

* **상단 바**: 뒤로가기 버튼, 제목 없음 (간단 입력 화면)
* **입력 영역**: 본문 텍스트박스 (최대 300자 입력 제한), 자동 높이 조정
* **감정 태그 선택 영역**: 아이콘 형태의 다중 선택 가능 토글 버튼 (예: 분노, 슬픔, 후회 등)
* **실패 유형 드롭다운**: 카테고리 선택 (예: 인간관계, 일, 돈, 건강 등)
* **공개 여부 토글**: 공개 / 비공개 전환 스위치
* **하단 버튼**: 저장 버튼 (클릭 시 자동 저장 후 알림)

### 3. 조각 리스트 화면 (내 조각함)

* **상단 바**: "내 조각함" 타이틀 + 조각 수 표시
* **조각 카드 리스트**:

  * 각 카드: 조각 미리보기 본문 (2줄), 감정 태그, 실패 유형, 작성일자
  * 각 조각 우측 상단: 편집, 삭제 아이콘 버튼
* **필터 영역 (선택적)**: 감정 태그, 유형별 필터 (추후 확장용)

### 4. 글 작성 화면

* **상단 바**: "새 글 쓰기" 타이틀 + 임시저장 알림 가능
* **조각 선택 영역**: 내 조각 리스트에서 다중 선택 (체크박스 + 조각 미리보기)
* **조각 조립 영역**: 선택된 조각을 순서대로 나열 + Drag & Drop 가능

  * 조각 사이에 연결 문장 입력 필드 선택적으로 표시 가능
* **대표 감정 선택**: 대표 감정 태그 1개 지정
* **썸네일 이미지 선택**: 이미지 첨부 혹은 조각 중 하나의 이미지 자동 지정
* **하단 버튼**: 미리보기 / 게시하기

### 5. 마이페이지

* **상단 사용자 정보**: 프로필 이미지, 닉네임, 자기소개 (선택)
* **통계 영역**: 작성한 글 수, 저장된 조각 수 요약
* **탭 영역**:

  * \[작성한 글] 탭: 카드형 리스트 (피드 동일)
  * \[조각함] 탭: 조각 카드 리스트 (조각 리스트 화면과 동일)

1. **메인 피드 화면**

   * 최신 글 리스트 (리스트 + 썸네일 형식)
   * 글 카드: 대표 감정, 썸네일, 미리보기 텍스트
   * 상단: "글쓰기", "내 조각함", 마이페이지 메뉴

2. **조각 작성 화면**

   * 본문 입력창
   * 감정 태그 선택 (토글 방식)
   * 실패 유형 선택 드롭다운
   * 공개 여부 토글 + 저장 버튼

3. **조각 리스트 화면 (내 조각함)**

   * 저장된 조각 카드 목록
   * 감정 태그/유형/작성일 표시
   * 편집, 삭제 기능

4. **글 작성 화면**

   * 조각 선택 영역 (리스트에서 다중 선택)
   * 조각 순서 변경 (Drag & Drop 또는 ↑↓ 버튼)
   * 미리보기 및 게시하기 버튼

5. **마이페이지**

   * 내가 쓴 글 리스트
   * 조각 목록
   * 작성 히스토리 요약 (글 수, 조각 수)

---

## 🧩 백로그 (후순위 기능들)

* 댓글 기능 (글 단위)
* 공감, 스크랩 등 상호작용 요소
* 조각 검색/필터 기능 (감정/유형 기반)
* 조각 기반 AI 추천 및 자동 조립
* 마일리지 시스템
* 모바일 앱 (React Native)
* 소셜 로그인

---

## 📱 사용자 흐름 요약 (MVP)

1. 조각 작성: 메인 or 마이페이지 → 짧은 메모 작성 → 감정 태그 선택 → 저장
2. 글 작성: 글쓰기 클릭 → 조각 선택 및 정렬 → 미리보기 → 게시
3. 피드 열람: 최신 글 리스트 확인 → 글 상세 보기

---

이 문서는 리바운드 MVP의 기획 구조를 중심으로 작성되었으며, 실제 구현에 필요한 정보는 각 태스크별 세부 항목으로 연결될 수 있도록 구성함.
