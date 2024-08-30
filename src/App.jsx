
import * as React from 'react';
import { AuthProvider } from './context/Authcontext';
import AppNavi from './Navigators/AppNavi';

const App = () => {
  return (
    <AuthProvider>
     <AppNavi/>
    </AuthProvider>
  );
};

export default App;
