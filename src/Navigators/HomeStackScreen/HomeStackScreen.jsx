import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../Components/Home/HomeScreen';
import FreeSessions from '../../Components/Home/FreeSessions';
import PodDetailPage from '../../Components/Home/PodDetailPage';
// import SplashScr from '../../Components/Home/SplashScr';
// import SplashScr2 from '../../Components/Home/SplashScr2';
import BookingScreen from '../../Components/Home/BookingScr';
import QRCodeScannerScreen from '../../Components/Home/QRScanning';
import PaymentScreen from '../../Components/Home/PaymentScreen';
import QrScreen from '../../Components/Home/QrScreen';
import UserProfile from '../../Components/Dashboard/UserProfile';
import AllBookings from '../../Components/Dashboard/AllBookings';
import BookingDetailsScreen from '../../Components/Dashboard/BookingDetails';
import PrivacyPiolicy from '../../Components/Dashboard/PrivacyPiolicy';
import TermsAndConditions from '../../Components/Dashboard/TermsofService';
const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
      <HomeStack.Screen name="15MinutesFree" component={FreeSessions} />
      <HomeStack.Screen name="PodDetailPage" component={PodDetailPage} />
      <HomeStack.Screen name="BookingScreen" component={BookingScreen} />
      <HomeStack.Screen name="QrScreen" component={QrScreen} />
      <HomeStack.Screen name="ProfilePage" component={UserProfile} />
      <HomeStack.Screen name="AllBookings" component={AllBookings} />
      <HomeStack.Screen
        name="AllBookingsDetails"
        component={BookingDetailsScreen}
      />
      <HomeStack.Screen name="PrivacyPolicy" component={PrivacyPiolicy} />
      <HomeStack.Screen name="TermsandService" component={TermsAndConditions} />
      {/* <HomeStack.Screen name="SplashScreen" component={SplashScr} />
      <HomeStack.Screen name="SplashScreen2" component={SplashScr2} /> */}
    </HomeStack.Navigator>
  );
}


