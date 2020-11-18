import React from 'react';
import GlobalStyle from './styles/global';
import Signin from './pages/Signin';
// import Signup from './pages/Signup';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FunctionComponent = () => {
  return (
    <>
      <AuthProvider>
        <Signin />
        {/* <Signup /> */}
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
