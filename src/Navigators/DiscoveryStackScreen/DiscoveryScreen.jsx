import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DiscoverScreen from '../../Components/Discovery/DiscoverScreen';
import BookingScreen from '../../Components/Home/BookingScr';
const DiscovryScreen = createNativeStackNavigator();

export default function DiscoveryStackScreen() {
  return (
    <DiscovryScreen.Navigator screenOptions={{headerShown: false}}>
      <DiscovryScreen.Screen
        name="DiscoveryScreen"
        component={DiscoverScreen}
      />
      <DiscovryScreen.Screen name="BookingScreen" component={BookingScreen} />
    </DiscovryScreen.Navigator>
  );
}
