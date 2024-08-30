import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PrivacyPiolicy from '../../Components/Dashboard/PrivacyPiolicy';
import TermsAndConditions from '../../Components/Dashboard/TermsofService';
import UserAccountScreen from '../../Components/Dashboard/UserAccountScreen';
import UserProfile from '../../Components/Dashboard/UserProfile';
import AllBookings from '../../Components/Dashboard/AllBookings';
import BookingDetails from '../../Components/Dashboard/BookingDetails';
const UserScreen = createNativeStackNavigator();

export default function UserAccountStackScreen() {
  return (
    <UserScreen.Navigator screenOptions={{headerShown: false}}>
      <UserScreen.Screen name="UserScreenMain" component={UserAccountScreen} />
      <UserScreen.Screen name="ProfilePage" component={UserProfile} />
      <UserScreen.Screen name="AllBookings" component={AllBookings} />
      <UserScreen.Screen name="AllBookingsDetails" component={BookingDetails} />
      <UserScreen.Screen name="PrivacyPolicy" component={PrivacyPiolicy} />
      <UserScreen.Screen
        name="TermsandService"
        component={TermsAndConditions}
      />
    </UserScreen.Navigator>
  );
}
