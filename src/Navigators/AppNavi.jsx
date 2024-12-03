// import { View, Text, ActivityIndicator } from 'react-native'
// import React, { useContext } from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import InitialTabNavigator from './InitialTabNavigator';
// import { AuthContext } from '../context/Authcontext';
// import TabNavigator from './TabNavigator';

// const AppNavi = () => {
//     const {isLoading, userToken} = useContext(AuthContext)
//     if(isLoading){
//         return(
//         <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
//             <ActivityIndicator size={'large'}/>
//         </View>
//         )
//     }
//   return (
//     <NavigationContainer>
//         {userToken!==null?<TabNavigator/>:<InitialTabNavigator/>}
//     </NavigationContainer>
//   );
// }

// export default AppNavi


// import React, {useContext} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {View, ActivityIndicator} from 'react-native';
// import InitialTabNavigator from './InitialTabNavigator';
// import TabNavigator from './TabNavigator';
// import Popup from '../Components/Popup';
// import { AuthContext } from '../context/Authcontext';

// const AppNavi = () => {
//   const {isLoading, userToken, showPopup, setShowPopup} =
//     useContext(AuthContext);

//   if (isLoading) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       {userToken !== null ? <TabNavigator /> : <InitialTabNavigator />}
//       <Popup visible={showPopup} onClose={() => setShowPopup(false)} />
//     </NavigationContainer>
//   );
// };

// export default AppNavi;




import TabNavigator from './TabNavigator';
import CancelScreen from '../screens/CancelScreen';
import SuccessScreen from '../screens/SuccessScreen';
import FailureScreen from '../screens/FailureScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import InitialTabNavigator from './InitialTabNavigator';
const Stack = createNativeStackNavigator();

const AppNavi = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {userToken !== null ? (
        <>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cancel"
            component={CancelScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Failure"
            component={FailureScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={InitialTabNavigator}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavi;
