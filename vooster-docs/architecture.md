# Technical Requirements Document (TRD)

## 1. Executive Technical Summary
- **프로젝트 개요**  
  초등학교 1·2학년 대상의 정적 웹 기반 다국어 인사말 학습 서비스. Next.js의 Static Generation을 활용하여 로그인·DB 없이 Netlify/Vercel에 무설치 배포. JSON 데이터 기반으로 간단한 클릭 UI, 원어민 음성, 일러스트를 제공.

- **핵심 기술 스택**  
  Next.js, React, Styled-Components, i18next, react-howler, Netlify/Vercel, greetings.json, CDN(음성·일러스트)

- **주요 기술 목표**  
  • 최초 로드 ≤ 2초(Lighthouse ≥ 90)  
  • WCAG 2.1 AA 준수(접근성 ≥ 95점)  
  • 음성 재생 클릭률 ≥ 70% 충족  
  • 세션 체류 시간 ≥ 3분 달성

- **핵심 기술 가정**  
  • 모든 콘텐츠(음성·이미지)는 빌드 단계에 CDN에 업로드  
  • 클라이언트 측 API 호출 최소화(정적 JSON 사용)  
  • 마이크 녹음 기능은 브라우저 Web API로 충분

## 2. Tech Stack

| Category           | Technology / Library        | Reasoning                                                      |
| ------------------ | --------------------------- | -------------------------------------------------------------- |
| 프레임워크         | Next.js                     | Static Generation, SEO, 빌드 타임 데이터 연동 간편              |
| UI 라이브러리      | React                       | 컴포넌트 기반 구조, 학습 커뮤니티 활발                          |
| 스타일링           | styled-components           | CSS-in-JS, 테마(dark/light) 관리 용이                           |
| 다국어 지원        | i18next                     | JSON 기반 언어 리소스, 코드 변경 없이 언어 확장 가능            |
| 오디오 재생        | react-howler                | 간단한 오디오 API, preload/playing 제어 가능                   |
| 배포               | Netlify / Vercel            | 무서버리스 정적 호스팅, CI/CD 자동화                           |
| 데이터 저장        | greetings.json              | 정적 JSON, 빌드 시점에 로드, 언어 추가 시 파일만 갱신           |
| 일러스트·음성 CDN  | AWS S3 + CloudFront 등      | 글로벌 캐싱, 빠른 전송 보장                                     |
| 접근성             | axe-core (개발 도구)        | WCAG 검사 자동화                                              |
| 빌드 도구           | Esbuild (내장)              | 빠른 번들링                                                    |

## 3. System Architecture Design

### Top-Level building blocks
- Frontend (Next.js)  
  • Static Generation 및 Client-Side Hydration  
  • 페이지 라우팅 (언어 선택, 카드, 연습, 퀴즈, 설정)
- Data Layer  
  • greetings.json (언어·인사말 메타데이터)  
  • CDN 호스팅 음성·일러스트 파일
- UI Components  
  • 언어 선택 드롭다운/플래그  
  • 인사말 카드, 연습 모드, 퀴즈 모듈, 설정 패널
- 접근성 & 테마 관리  
  • WCAG 준수 스타일, dark/light 자동 전환

### Top-Level Component Interaction Diagram
```mermaid
graph TD
    A[User Browser] --> B[Next.js Static Page]
    B --> C[greetings.json]
    B --> D[CDN(Audio/Illustration)]
    B --> E[i18next 번역 리소스]
    A --> F[Web Audio API (마이크)]
```

- 사용자가 브라우저에서 Next.js로 빌드된 페이지 요청  
- 클라이언트에서 greetings.json·i18next 로드 후 렌더링  
- 음성·일러스트는 CDN에서 직접 스트리밍  
- 마이크 녹음은 Web Audio API로 처리

### Code Organization & Convention

**도메인 기반 구조**  
- 언어 선택, 카드, 연습 모드, 퀴즈, 설정 등 기능별 도메인 분리  
- 프레젠테이션·비즈니스 로직·데이터 접근 계층 분리

**폴더 구조 예시**
```
/
├── public/
│   ├── locale/              # i18next JSON 리소스
│   ├── audio/               # CDN 동기화 폴더
│   └── images/              # 일러스트
├── src/
│   ├── components/          # 재사용 UI 컴포넌트
│   │   ├── LanguagePicker/
│   │   ├── GreetingCard/
│   │   └── ...
│   ├── domains/             # 도메인별 기능 모듈
│   │   ├── practice/        # 발음 연습 모드
│   │   ├── quiz/            # 퀴즈 모드
│   │   └── settings/
│   ├── pages/               # Next.js 페이지
│   ├── lib/                 # 데이터 로딩, 유틸리티
│   ├── styles/              # 글로벌 스타일, 테마
│   └── types/               # 공통 타입 정의
├── greetings.json           # 정적 데이터
└── next.config.js
```

### Data Flow & Communication Patterns
- **클라이언트-서버 통신**: 빌드 시점 정적 로드, 클라이언트에서 fetch 없이 import  
- **데이터베이스 상호작용**: 없음(정적 JSON)  
- **외부 서비스 통합**: 음성 생성은 빌드 파이프라인에서 One-time 처리 (ElevenLabs)  
- **실시간 통신**: Web Audio API를 통한 마이크 입력 → 로컬 메모리 처리  
- **데이터 동기화**: 도메인별 JSON 변경 시 빌드 재실행

## 4. Performance & Optimization Strategy
- 코드 스플리팅 및 SSR/SSG 활용으로 초기 번들 크기 최소화  
- 이미지·오디오 최적화(압축, CDNs) 및 preload 설정  
- Lighthouse CI 도입해 지속적 성능 모니터링  
- 사용자 인터랙션 중심 지연 로딩(lazy load) 적용  

## 5. Implementation Roadmap & Milestones

### Phase 1: Foundation (MVP Implementation)  
- **Core Infrastructure**: Next.js 프로젝트 초기화, CI/CD 설정  
- **Essential Features**: 언어 선택, 인사말 카드, 원어민 재생, 접근성 기본  
- **Basic Security**: HTTPS 설정, CORS 제한  
- **Development Setup**: ESLint, Prettier, Lighthouse CI  
- **Timeline**: 4주

### Phase 2: Feature Enhancement  
- **Advanced Features**: 발음 연습 모드, 다크모드, 워크시트 다운로드  
- **Performance Optimization**: 코드 스플리팅, 이미지·오디오 캐싱  
- **Enhanced Security**: CSP 적용, 외부 스크립트 제한  
- **Monitoring Implementation**: Sentry 통합  
- **Timeline**: +2주

### Phase 3: Scaling & Optimization  
- **Scalability Implementation**: CDN 글로벌 분산, 빌드 파이프라인 최적화  
- **Advanced Integrations**: 오프라인 PWA, S3 Pre-signed URL  
- **Enterprise Features**: 통계 대시보드(내부 사용)  
- **Compliance & Auditing**: WCAG 2.1 재검증, 보안 감사  
- **Timeline**: +4주

## 6. Risk Assessment & Mitigation Strategies

### Technical Risk Analysis
- **Technology Risks**: Static JSON 확장 한계 → 모듈화 구조, 코드 자동화  
- **Performance Risks**: 초기 로드 지연 → 코드 스플리팅, CDN 활용  
- **Security Risks**: XSS, CORS 오남용 → CSP, 엄격한 CORS 정책  
- **Integration Risks**: TTS 서비스 장애 → 로컬 캐싱, 오픈소스 대체 TTS

### Project Delivery Risks
- **Timeline Risks**: 디자인 피드백 지연 → 디자인 시스템 조기 확정  
- **Resource Risks**: 프론트엔드 전문 인력 부족 → 기술 스터디, 가이드 제공  
- **Quality Risks**: 테스트 커버리지 미비 → 유닛·E2E 테스트 최소 80% 확보  
- **Deployment Risks**: 호스팅 환경 설정 오류 → 스테이징 환경 사전 검증  
- **Contingency Plans**:  
  • 음성 미리 녹음 파일 사용  
  • 정적 HTML 빌드로 롤백 가능

---

**END OF DOCUMENT**