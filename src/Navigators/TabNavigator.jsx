// import React from 'react';
// import HomeScreen from '../screens/HomeScreen';
// import LocationScreen from '../screens/LocationScreen';
// import NotificationScreen from '../screens/NotificationScreen';
// import UserAccountScreen from '../screens/UserAccountScreen';
// import DiscoveryIcon from '../screens/DiscoveryIcon';
// import {View, StyleSheet} from 'react-native';
// import {COLORS, FONTSIZE, SPACING} from '../Themes/Theme';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const Tab = createBottomTabNavigator();
// const tabs = [
//   {
//     name: 'Home',
//     component: HomeScreen,
//     iconName: 'home',
//   },
//   {
//     name: 'Location',
//     component: LocationScreen,
//     iconName: 'location-on',
//   },
//   {
//     name: 'Notification',
//     component: NotificationScreen,
//     iconName: 'notifications',
//   },
//   {
//     name: 'Discovery',
//     component: DiscoveryIcon,
//     iconName: 'explore',
//   },
//   {
//     name: 'Accounts',
//     component: UserAccountScreen,
//     iconName: 'account-circle',
//   },
// ];
// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: {height: SPACING.space_10 * 7},
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = 'home';
//           } else if (route.name === 'Location') {
//             iconName = 'location-on';
//           } else if (route.name === 'Notification') {
//             iconName = 'notifications';
//           } else if (route.name === 'Discovery') {
//             iconName = 'search';
//           } else if (route.name === 'Accounts') {
//             iconName = 'person';
//           }

//           const iconColor = focused ? 'red' : 'gray';

//           return (
//             <Icon name={iconName} size={FONTSIZE.size_30} color={iconColor} />
//           );
//         },
//       })}>
//       {tabs.map((tab, index) => (
//         <Tab.Screen
//           key={index}
//           name={tab.name}
//           component={tab.component}
//           options={{
//             tabBarLabel: tab.name,
//             tabBarLabelStyle: {
//               color: COLORS.Grey, // Replace with your inactive tab label color
//             },
//             tabBarActiveTintColor: '#FE372F', // Color for active tab label and icon
//             tabBarInactiveTintColor: 'gray', // Color for inactive tab label and icon
//           }}
//         />
//       ))}
//     </Tab.Navigator>
//   );
// };


// export default TabNavigator;


// import React, {useContext} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import HomeStackScreen from './HomeStackScreen/HomeStackScreen';
// import LocationStackScreen from './LocationStackScreen/LocationStackScreen';
// import NotificationStackScreen from './NotificationScreen/NotificationStackScreen';
// import DiscoveryScreen from './DiscoveryStackScreen/DiscoveryScreen';
// import UserAccountStackScreen from './UserAccountScreen/UserAccountStackScreen';
// import {AuthContext} from '../context/Authcontext';
// import TabBarIcon from './TabbarIcon';
// import {COLORS, FONTSIZE, SPACING} from '../Themes/Theme';

// const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//   const {notifications} = useContext(AuthContext);
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: {height: SPACING.space_10 * 5.2},
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;
//           let badgeCount = 0;
//           switch (route.name) {
//             case 'Home':
//               iconName = 'home';
//               break;
//             case 'Location':
//               iconName = 'location-on';
//               break;
//             case 'Notification':
//               iconName = 'notifications';
//               badgeCount = notifications.length;
//               break;
//             case 'Discovery':
//               iconName = 'explore';
//               break;
//             case 'Accounts':
//               iconName = 'account-circle';
//               break;
//           }
//           return (
//             <TabBarIcon
//               name={iconName}
//               color={focused ? 'red' : 'gray'}
//               size={30}
//               badgeCount={badgeCount}
//             />
//           );
//         },
//         tabBarActiveTintColor: 'red',
//         tabBarInactiveTintColor: 'gray',
//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: 'bold',
//         },
//       })}>
//       <Tab.Screen
//         name="Home"
//         component={HomeStackScreen}
//         listeners={({navigation, route}) => ({
//           tabPress: e => {
//             // Prevent default action
//             e.preventDefault();
//             // Navigate to new stack resetting the navigation history
//             navigation.navigate('HomeMain');
//           },
//         })}
//       />
//       <Tab.Screen
//         name="Location"
//         component={LocationStackScreen}
//         options={{
//           unmountOnBlur: true,
//         }}
//       />
//       <Tab.Screen
//         name="Notification"
//         component={NotificationStackScreen}
//         options={{
//           unmountOnBlur: true,
//         }}
//       />
//       <Tab.Screen
//         name="Discovery"
//         component={DiscoveryScreen}
//         options={{
//           unmountOnBlur: true,
//         }}
//       />
//     </Tab.Navigator>
//   );
// };
// export default TabNavigator;



import React, {useContext, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeStackScreen from './HomeStackScreen/HomeStackScreen';
import LocationStackScreen from './LocationStackScreen/LocationStackScreen';
import NotificationStackScreen from './NotificationScreen/NotificationStackScreen';
import DiscoveryScreen from './DiscoveryStackScreen/DiscoveryScreen';
import UserAccountStackScreen from './UserAccountScreen/UserAccountStackScreen';
import {AuthContext} from '../context/Authcontext';
import TabBarIcon from './TabbarIcon';
import {COLORS, FONTSIZE, SPACING} from '../Themes/Theme';
import {View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();
  const {notifications} = useContext(AuthContext);
  const [isCameraVisible, setCameraVisible] = useState(false);

  const handleScanMePress = () => {
    setCameraVisible(true);
  };

  const handleBarCodeScanned = ({data}) => {
    setCameraVisible(false);
    navigation.navigate('PodDetailPage', {slug: data});
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {height: SPACING.space_10 * 5.2},
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let badgeCount = 0;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Location':
                iconName = 'location-on';
                break;
              case 'Notification':
                iconName = 'notifications';
                badgeCount = notifications.length;
                break;
              case 'Discovery':
                iconName = 'explore';
                break;
              case 'Accounts':
                iconName = 'account-circle';
                break;
            }
            return (
              <TabBarIcon
                name={iconName}
                color={focused ? 'red' : 'gray'}
                size={30}
                badgeCount={badgeCount}
              />
            );
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: 'bold',
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('HomeMain');
            },
          })}
        />
        <Tab.Screen
          name="Location"
          component={LocationStackScreen}
          options={{
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Scan"
          component={() => null} // Empty component to prevent navigation
          options={{
            tabBarButton: props => (
              <TouchableOpacity {...props} onPress={handleScanMePress} style={{paddingBottom:10}}>
                <Icon name="qr-code" size={50} color={"#FE372E"} />
               
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationStackScreen}
          options={{
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Discovery"
          component={DiscoveryScreen}
          options={{
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>

      {/* Camera Modal */}
      <Modal visible={isCameraVisible} animationType="slide">
        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead={handleBarCodeScanned}
          captureAudio={false}>
          <TouchableOpacity
            onPress={() => setCameraVisible(false)}
            style={styles.backButton}>
            <Icon name={'close'} size={FONTSIZE.size_30} color={'#fff'} />
          </TouchableOpacity>
          <View style={styles.cameraOverlay}>
            <Text style={styles.cameraText}>
              Point your camera at a QR code
            </Text>
          </View>
        </RNCamera>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  backButton: {
    padding: 20,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 40,
  },
  cameraText: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
});

export default TabNavigator;
