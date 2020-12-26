# Frontend

## 폴더 구조

- public
  - index.html : 최종 html 파일
- src
  - components
    - Shared : 여러 Sub Component에서 함께 쓰는 Component
    - Sub : View Component를 구성하는 요소 Component
    - View : 페이지를 구성하는 요소 Component
    - Model.tsx : 서버와 데이터를 주고받으며, source data를 유지하는 파일
    - Provider.tsx : App.tsx로 전달되는 Components 파일의 최상위 컴포넌트
    - ViewModel.tsx :  View Component의 최상위 컴포넌트
  - scss
    - base : 폰트, 색상 등 처음 정할 컴포넌트의 스타일
    - components : 컴포넌트 별 스타일
    - layout : 전체 레이아웃
    - main.scss : 모든 scss를 묶어서 App.tsx로 한번에 내보냄 