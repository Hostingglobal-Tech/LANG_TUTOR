# 다국어 인사말 학습 서비스

초등학교 1,2학년 아이들을 위한 다국어 인사말 학습 웹 애플리케이션입니다.

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS, Styled Components
- **Audio**: react-howler, ElevenLabs API
- **Internationalization**: i18next, react-i18next
- **Development**: ESLint, Prettier, Accessibility testing

## 개발 환경 설정

1. 의존성 설치
```bash
npm install
```

2. 환경 변수 설정
```bash
cp .env.example .env.local
# .env.local 파일에서 필요한 API 키 설정
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 `http://localhost:3000` 접속

## 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run start`: 프로덕션 서버 실행
- `npm run lint`: ESLint 검사

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router
├── components/       # React 컴포넌트
├── data/            # 정적 데이터 (greetings.json)
├── hooks/           # 커스텀 React 훅
├── lib/             # 유틸리티 라이브러리
├── types/           # TypeScript 타입 정의
└── utils/           # 헬퍼 함수들

public/
├── audio/           # 음성 파일
├── images/          # 이미지 파일
└── icons/           # 아이콘 파일
```

## 접근성

이 프로젝트는 WCAG 2.1 AA 기준을 준수합니다:
- 키보드 탐색 지원
- 스크린 리더 호환
- 색상 대비 95% 이상
- 대체 텍스트 제공

## 배포

- **Development**: Netlify/Vercel 자동 배포
- **Production**: Static Generation으로 빌드 후 CDN 배포