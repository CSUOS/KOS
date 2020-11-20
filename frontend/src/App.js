import React from 'react';
import Paper from '@material-ui/core/Paper';
import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="debug-root">
      <Paper>
        <h1>SCSS와 Material UI가 잘 설치되었는지 테스트합니다.</h1>
        <h2>이 글이 붉은 색이고, 위 글이 남색이라면 성공입니다.</h2>
      </Paper>
    </div>
  );
}

export default App;
