
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import Slider from './ProductSlider';
import OfficePodsModal from './OfficePods';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
import Slider2 from './ProductSlider2';
import axios from 'axios';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {AuthContext} from '../../context/Authcontext';
import {Linking} from 'react-native';
import moment from 'moment-timezone';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [address, setaddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [carouselData, setCarouselData] = useState([]);
  const [scannedCode, setScannedCode] = useState(null);
  const [corporateData, setCorporateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; // Sidebar starts off-screen
  const {logout} = useContext(AuthContext);

  const toggleSidebar = () => {
    const toValue = isSidebarVisible ? -250 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setSidebarVisible(!isSidebarVisible);
    });
  };

  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setUserLocation({latitude, longitude});
  //     },
  //     error => {
  //       console.warn(error);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // };
  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {
  //         latitude,
  //         longitude,
  //         altitude,
  //         accuracy,
  //         altitudeAccuracy,
  //         heading,
  //         speed,
  //       } = position.coords;

  //       console.log('Latitude:', latitude);
  //       console.log('Longitude:', longitude);
  //       console.log('Altitude:', altitude);
  //       console.log('Accuracy:', accuracy);
  //       console.log('Altitude Accuracy:', altitudeAccuracy);
  //       console.log('Heading:', heading);
  //       console.log('Speed:', speed);

  //       setUserLocation({latitude, longitude});
  //     },
  //     error => {
  //       console.warn(error);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // };
const getTimezone = () => {
  const timeZone = moment.tz.guess();
  console.log('Detected Timezone:', timeZone);
};

// Function to get the user's location
const getLocation = () => {
  Geolocation.getCurrentPosition(
    position => {
      const {
        latitude,
        longitude,
        altitude,
        accuracy,
        altitudeAccuracy,
        heading,
        speed,
      } = position.coords;

      // Log location data
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
      console.log('Altitude:', altitude);
      console.log('Accuracy:', accuracy);
      console.log('Altitude Accuracy:', altitudeAccuracy);
      console.log('Heading:', heading);
      console.log('Speed:', speed);

      // Set the user location (if you need this for state management)
      setUserLocation({latitude, longitude});

      // Call the timezone function with latitude and longitude
      getTimezone(latitude, longitude);
    },
    error => {
      console.warn(error);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Yoxu can use the location');
          getLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
                if (result === RESULTS.GRANTED) {
                  getLocation();
                }
              });
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              getLocation();
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          console.warn(error);
        });
    }
  };

  const fetchBannerData = async () => {
    try {
      const response = await axios.get('https://privily.co/api/pages/banner');
      const data = response.data;
      setCarouselData(data.carousel);
      setCorporateData(data.corporate[0]); // Assuming index 1 exists
      console.log('corporateData', data.carousel);
    } catch (error) {
      console.error('Error fetching banner data:', error);
    } finally {
      setIsLoading(false); // Stop loading once data is fetched
    }
  };

  useEffect(() => {
    requestLocationPermission();
    fetchBannerData();
  }, []);

  const handleBarCodeScanned = ({data}) => {
    setScannedCode(data);
    setCameraVisible(false);
    navigation.navigate('PodDetailPage', {
      slug: data, // Assuming the QR code contains the pod ID
      origin: 'HomeMain',
    });
    // alert(`QR Code scanned: ${data}`);
  };

  const handleScanMePress = () => {
    setCameraVisible(true);
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -250, // Slide out to the left
      duration: 300, // Shorter duration for closing
      easing: Easing.in(Easing.ease), // Easing for closing
      useNativeDriver: true,
    }).start(() => {
      setSidebarVisible(false);
    });
  };

  return (
    <>
      <ScrollView removeClippedSubviews={true}>
        <SafeAreaView>
          {/* Header with hamburger menu */}
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleSidebar}>
              <Icon name="menu" size={40} color="#FE372F" />
            </TouchableOpacity>
            <Image
              source={require('../../assests/Logo.png')}
              style={styles.logo}
            />
            <View style={styles.headerRight}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('mailto:prasenjit.sinha@bebolddigital.co.za')
                }>
                <Icon name="email" size={30} color="grey" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Linking.openURL('tel:+27832128647')}>
                <Icon name="phone" size={30} color="grey" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main content */}
          {isLoading ? (
            <ShimmerPlaceholder style={{width: '100%', height: 200}} />
          ) : (
            <>
              <Slider2 data={carouselData} />
              <Slider />
            </>
          )}

          {/* Corporate Pods */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: 20,
              marginTop: -10,
            }}>
            {isLoading ? (
              <ShimmerPlaceholder
                style={{width: '90%', height: 250, borderRadius: 10}}
              />
            ) : (
              <Image
                source={require('../../assests/CorporatePods.png')}
                style={{width: '95%', borderRadius: 10}}
              />
            )}
            {/* {!isLoading && (
              <Text style={styles.corporatePodsText}>Corporate Pods</Text>
            )} */}
          </TouchableOpacity>

          <OfficePodsModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
          />
          <Modal visible={isCameraVisible} animationType="slide">
            {/* <RNCamera
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
              
            </RNCamera> */}
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

              <View style={styles.overlay}>
                <View style={styles.topOverlay}></View>
                <View style={styles.middleOverlay}>
                  <View style={styles.sideOverlay}></View>
                  <View style={styles.scannerFrame}></View>
                  <View style={styles.sideOverlay}></View>
                </View>
                <View style={styles.bottomOverlay}></View>
              </View>

            </RNCamera>
          </Modal>
        </SafeAreaView>
      </ScrollView>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          bottom: '2%',
          left: '44%',
          zIndex: 11,
        }}>
        <TouchableOpacity
          onPress={handleScanMePress}
          style={{
            alignItems: 'center',
            backgroundColor: '#FE372E',
            borderRadius: 10,
            padding: 5,
            justifyContent: 'center',
            direction:"row"
          }}>
          <Icon name="qr-code" size={45} color={'white'} />
          {/* <Text style={{color: 'white', width: 120, textAlign: 'center'}}>
            Scan to Use Pod
          </Text> */}
        </TouchableOpacity>
      </View>
      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {transform: [{translateX: slideAnim}]}, // Apply the animated transform

        ]}>
        <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
          <Icon name="close" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
          <Text style={styles.sidebarText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AllBookings')}>
          <Text style={styles.sidebarText}>All Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.sidebarText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TermsandService')}>
          <Text style={styles.sidebarText}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Overlay to close the sidebar when clicking outside */}
      {isSidebarVisible && (
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 0,
    zIndex: 1001, // Ensure the header is above other content
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 1002, // Ensure the sidebar is above other content
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 10,
    color: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000, // Ensure the overlay is behind the sidebar
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
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
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    paddingTop:50
  },
  corporatePodsText: {
    position: 'absolute',
    fontSize: 17,
    color: '#fff',
    backgroundColor: '#FE372F',
    padding: 7,
    borderRadius: 10,
    top: '45%',
  },
  camera: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay on top
    width: '100%',
  },
  middleOverlay: {
    flexDirection: 'row',
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay on sides
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay on bottom
    width: '100%',
  },
  scannerFrame: {
    width: 250, // Scanner frame width
    height: 250, // Scanner frame height
    borderWidth: 2,
    borderColor: 'white', // White border for the scanner frame
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent center
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
