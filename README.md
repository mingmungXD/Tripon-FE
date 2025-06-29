## 🚀 프로젝트 소개

Trip:On은 사용자가 여행 사진을 업로드하면 AI가 사진 속 장소를 예측하고, 그 경험을 바탕으로 나만의 여행 캐릭터를 해석해 제공하는 서비스입니다. 이 MVP 버전은 **React**와 **OpenAI API**를 중심으로 구현된 모노리식 애플리케이션입니다.

---

## ⚙️ 기술 스택

* **프론트엔드**: React (JSX, CRA), CSS
* **AI 서비스**: OpenAI API (텍스트 분석)
* **이미지 처리**: HTML5 Canvas (클라이언트)
* **테스트**: Jest, React Testing Library
* **공통**: JavaScript, ESLint, Prettier

---

## 🔄 시퀀스 다이어그램

---

## 📦 파일 구조

```bash
tripon/
├── public/                  # 정적 파일
│   ├── index.html          # HTML 템플릿
│   ├── favicon.ico         # 파비콘
│   └── manifest.json       # 웹 앱 매니페스트
├── src/                    # 소스 코드
│   ├── components/         # React 컴포넌트
│   │   ├── common/        # 공통 컴포넌트
│   │   ├── layout/        # 레이아웃 컴포넌트
│   │   ├── upload/        # 업로드 관련 컴포넌트
│   │   ├── analysis/      # 분석 관련 컴포넌트
│   │   └── collage/       # 콜라주 관련 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── context/           # React Context
│   ├── services/          # API 서비스
│   ├── utils/             # 유틸리티 함수
│   ├── App.js             # 메인 App 컴포넌트
│   ├── App.css            # App 스타일
│   ├── index.js           # 진입점
│   ├── index.css          # 전역 스타일
│   └── reportWebVitals.js # 성능 측정
├── package.json           # 프로젝트 설정
└── README.md             # 프로젝트 문서
```

---

## 🚀 시작하기

1. 저장소 클론
    ```bash
    git clone <리포지토리_URL>
    cd tripon
    ```

2. 의존성 설치
    ```bash
    npm install
    ```

3. 환경 변수 설정
    ```bash
    # .env 파일 생성
    REACT_APP_OPENAI_API_KEY=your_api_key_here
    ```

4. 개발 서버 실행
    ```bash
    npm start
    ```

5. 테스트 실행
    ```bash
    npm test
    ```

---

## 💎 코드 품질 관리

### 이슈 생성 규칙

#### 1. 제목 형식
```
[태그] 간단한 설명
```

#### 예시
```
[BUG] 로그인 시 서버 에러 발생
[FEAT] 습관 생성 모달 추가
[DOCS] README.md 수정
[UI] BUTTON 그림자 추가
```

#### 2. 본문 형식
```
## 📌 설명
- 어떤 기능/버그인지 명확히 설명

## ✅ 해야 할 일
- [ ] 작업 1
- [ ] 작업 2

## 📎 참고사항 (Optional)
- 관련 링크나 에러 메시지 등
```

### 커밋 메시지 규칙

#### 1. 기본 형식
```
타입: 커밋 내용
ex) Feat: 로딩 페이지 추가
```

#### 2. 타입 종류

| 타입 | 설명 |
| --- | --- |
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 포맷팅 |
| refactor | 리팩토링 |
| test | 테스트 코드 |
| chore | 빌드, 패키지 매니저 설정 등 |

---

## 📊 주요 기능

1. **사진 업로드 및 크롭**
   - 모바일 친화적인 이미지 업로드
   - 4:3 비율 크롭 인터페이스
   - 이미지 최적화

2. **여행 캐릭터 분석**
   - OpenAI API를 활용한 캐릭터 분석 생성
   - 분석 결과에 따른 맞춤형 아이콘/일러스트 제공
   - 다양한 성격 유형에 따른 여행 스타일 제안

3. **네컷 콜라주**
   - 커스터마이즈 가능한 네컷 템플릿
   - 분석 결과와 사진을 조합한 공유용 이미지 생성
   - 소셜 미디어 공유 기능

---

## 🧪 테스트 전략

1. **단위 테스트**:
   - React 컴포넌트 테스트 (React Testing Library)
   - 유틸리티 함수 테스트 (Jest)

2. **통합 테스트**:
   - API 호출 테스트
   - 사용자 흐름 테스트
