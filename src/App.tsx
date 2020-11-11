import React from 'react';
import GlobalStyle from './styles/global';
import Signin from './pages/Signin';

const App: React.FunctionComponent = () => {
  return (
    <>
      <Signin />
      <GlobalStyle />
    </>
  );
};

export default App;
