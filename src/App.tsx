import React from 'react';
import GlobalStyle from './styles/global';
import Signin from './pages/Signin';
// import Signup from './pages/Signup';

import AppProvider from './hooks';

const App: React.FunctionComponent = () => {
  return (
    <>
      <AppProvider>
        <Signin />
        {/* <Signup /> */}
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
