import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import InitialTabNavigator from './InitialTabNavigator';
import { AuthContext } from '../context/Authcontext';
import TabNavigator from './TabNavigator';

const AppNavi = () => {
    const {isLoading, userToken} = useContext(AuthContext)
    if(isLoading){
        return(
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <ActivityIndicator size={'large'}/>
        </View>
        )
    }
  return (
    <NavigationContainer>
        {userToken!==null?<TabNavigator/>:<InitialTabNavigator/>}
    </NavigationContainer>
  );
}

export default AppNavi


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
