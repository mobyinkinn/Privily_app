import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LocationScreen from '../../Components/Location/LocationScreen';
import DiscoverLocation from '../../Components/Location/DiscoverLocation';
const LocationStack = createNativeStackNavigator();

export default function LocationStackScreen() {
  return (
    <LocationStack.Navigator screenOptions={{headerShown: false}}>
      <LocationStack.Screen name="LocationMain" component={LocationScreen} />
      <LocationStack.Screen
        name="DiscoverLocation"
        component={DiscoverLocation}
      />
    </LocationStack.Navigator>
  );
}