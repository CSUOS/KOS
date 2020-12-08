# Frontend

### 폴더 구조

- src
  - components
    - Model : 속성, 변경 메소드를 담고 있음 / State 관리
    - UI : View에서 사용할 컴포넌트 UI 관리
    - View
    - Provider.js : ViewModel가 Model의 Context를 사용할 수 있도록 해줌
    - ViewModel.js : Model의 Context를 이용해서 View의 요청 처리
  - scss
    - base : 변수 정의, mixin 정의, reset 등
    - components : 컴포넌트별 css
    - layout : 레이아웃 관련 css
    - main.scss : App.js로 나가는 최종 css 생성
  - App.js



### MVVM 구조 구현

1. UI에서 공통적으로 사용할 UI 컴포넌트를 구현한다.
2. View에서 크게 사용할 하나의 View를 구현한다.
3. ViewModel.js에서 View를 적절한 위치에서 렌더링하고, 필요로 하는 속성과 메소드를 넘겨준다.
4. ViewModel.js에서의 속성과 메소드는 Model의 Context를 가져와 구독한다.
5. Model은 모든 컴포넌트의 공통 State를 관리하며, Context 형식으로 내보낸다.
6. Provider로 Model과 ViewModel를 연결해준다.
7. App.js에서 Provider를 렌더링한다.

