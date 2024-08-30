import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LocationScreen from '../../Components/Location/LocationScreen';
import NotificationScreen from '../../Components/Notification/NotificationScreen';
const NotificationStack = createNativeStackNavigator();

export default function NotificationStackScreen() {
  return (
    <NotificationStack.Navigator screenOptions={{headerShown: false}}>
      <NotificationStack.Screen
        name="NotificationMain"
        component={NotificationScreen}
      />
    </NotificationStack.Navigator>
  );
}
