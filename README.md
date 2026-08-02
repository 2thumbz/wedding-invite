# 모바일 청첩장 💒

Next.js로 제작된 모바일 웨딩 청첩장입니다.

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📝 커스터마이징 가이드

### 신랑신부 정보 수정
- `components/Greeting.tsx` - 인사말 및 이름
- `components/Contact.tsx` - 연락처 정보

### 예식 정보 수정
- `components/WeddingInfo.tsx` - 날짜, 시간, 장소

### 오시는 길 수정
- `components/Location.tsx` - 주소, 교통편, 지도 링크

### 갤러리 이미지 추가
- `components/Gallery.tsx` - 현재는 이모지로 표시
- `public` 폴더에 이미지 추가 후 경로 수정

### 색상 테마 변경
- `tailwind.config.js`의 `colors` 섹션 수정

## 📱 Vercel 배포하기

### 방법 1: Vercel CLI 사용

1. Vercel CLI 설치:
```bash
npm install -g vercel
```

2. 프로젝트 배포:
```bash
vercel
```

3. 프로덕션 배포:
```bash
vercel --prod
```

### 방법 2: GitHub 연동 (추천)

1. GitHub에 코드 푸시:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. [Vercel](https://vercel.com)에 로그인
3. "New Project" 클릭
4. GitHub 저장소 연결
5. 프로젝트 설정:
   - Framework Preset: **Next.js** (자동 감지됨)
   - Build Command: `npm run build` (기본값)
   - Output Directory: `.next` (기본값)
6. "Deploy" 클릭

배포 후 자동으로 생성된 URL로 접속 가능합니다!

## 🎨 주요 기능

- ✅ 반응형 모바일 디자인
- ✅ 예식 정보 안내
- ✅ 오시는 길 (지도 연동)
- ✅ 연락처 (전화 연결)
- ✅ 갤러리
- ✅ 축의금 계좌 안내
- ✅ Next.js 14 App Router
- ✅ Tailwind CSS
- ✅ TypeScript

## 🛠️ 기술 스택

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## 📂 프로젝트 구조

```
wedding_invite/
├── app/
│   ├── globals.css          # 글로벌 스타일
│   ├── layout.tsx            # 레이아웃
│   └── page.tsx              # 메인 페이지
├── components/
│   ├── Header.tsx            # 헤더
│   ├── Greeting.tsx          # 인사말
│   ├── WeddingInfo.tsx       # 예식 정보
│   ├── Gallery.tsx           # 갤러리
│   ├── Location.tsx          # 오시는 길
│   └── Contact.tsx           # 연락처
├── public/                   # 정적 파일 (이미지 등)
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 💡 팁

- 실제 이미지를 사용하려면 `public` 폴더에 이미지를 추가하고 `Gallery.tsx`를 수정하세요
- 카카오맵 API를 사용하려면 [Kakao Developers](https://developers.kakao.com/)에서 API 키를 발급받으세요
- 축의금 계좌 정보를 추가하려면 `Contact.tsx`의 버튼 클릭 이벤트를 구현하세요

## 📄 라이선스

MIT License - 자유롭게 사용하세요!
