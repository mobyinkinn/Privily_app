
// import * as React from 'react';
// import { AuthProvider } from './context/Authcontext';
// import AppNavi from './Navigators/AppNavi';

// const App = () => {
//   return (
//     <AuthProvider>
//      <AppNavi/>
//     </AuthProvider>
//   );
// };

// export default App;


// import * as React from 'react';
// import {AuthProvider} from './context/Authcontext';
// import AppNavi from './Navigators/AppNavi';
// import {NavigationContainer} from '@react-navigation/native';

// const App = () => {
//   const prefix = 'myapp://';
//   const linking = {
//     prefixes: [prefix],
//     config: {
//       screens: {
//         // Map your deep links to screen names
//         Cancel: 'Cancel',
//         Success: 'Success',
//         Failure: 'Failure',
//       },
//     },
//   };

//   return (
//     <AuthProvider>
//       {/* Wrap your navigation container with deep linking configuration */}
//       <NavigationContainer linking={linking}>
//         <AppNavi />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// };

// export default App;




// import * as React from 'react';
// import {AuthProvider} from './context/Authcontext';
// import AppNavi from './Navigators/AppNavi';
// import {NavigationContainer} from '@react-navigation/native';
// import {Linking, Alert} from 'react-native';

// const App = () => {
//   const prefix = 'myapp://';
//   const linking = {
//     prefixes: [prefix],
//     config: {
//       screens: {
//         Cancel: 'Cancel',
//         Success: 'Success',
//         Failure: 'Failure',
//       },
//     },
//   };

//   // Listen for deep link URL changes
//   React.useEffect(() => {
//     const handleDeepLink = event => {
//       const url = event.url;
//       console.log('Deep link URL:', url);
//     };

//     Linking.addEventListener('url', handleDeepLink);

//     // Cleanup the event listener
//     return () => {
//       Linking.removeEventListener('url', handleDeepLink);
//     };
//   }, []);

//   return (
//     <AuthProvider>
//       <NavigationContainer linking={linking}>
//         <AppNavi />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// };

// export default App;

import * as React from 'react';
import {AuthProvider} from './context/Authcontext';
import AppNavi from './Navigators/AppNavi';
import {NavigationContainer} from '@react-navigation/native';
import {Linking, Alert} from 'react-native';

const App = () => {
  const prefix = 'myapp://';
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Cancel: 'Cancel',
        Success: 'Success',
        Failure: 'Failure',
      },
    },
  };

  // Listen for deep link URL changes
  React.useEffect(() => {
    const handleDeepLink = event => {
      const url = event.url;
      console.log('Deep link URL:', url);
    };

    // Add event listener for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Cleanup the event listener
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer linking={linking}>
        <AppNavi />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
