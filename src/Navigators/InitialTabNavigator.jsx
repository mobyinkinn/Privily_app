import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator'; // Import the TabNavigator
import SplashScr from '../Components/Home/SplashScr';
import SplashScr2 from '../Components/Home/SplashScr2';
import Register from '../Components/Home/Register';

const InitialStack = createNativeStackNavigator();

const InitialTabNavigator = () => {
  return (
    <InitialStack.Navigator screenOptions={{headerShown: false}}>
      <InitialStack.Screen name="SplashScreen" component={SplashScr} />
      <InitialStack.Screen name="SplashScreen2" component={SplashScr2} />
      <InitialStack.Screen name="Register" component={Register} />
      {/* <InitialStack.Screen name="Main" component={TabNavigator} /> */}
    </InitialStack.Navigator>
  );
};

export default InitialTabNavigator;
