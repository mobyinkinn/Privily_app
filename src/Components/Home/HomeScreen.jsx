
// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
// import {useNavigation} from '@react-navigation/native';
// import Slider from './ProductSlider';
// import SearchBar from './SearchBar';
// import OfficePodsModal from './OfficePods';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [userLocation, setUserLocation] = useState(null);
// const [isModalVisible, setModalVisible] = useState(false);
//   const handleSearchChange = query => {
//     setSearchQuery(query);
//     // Add the logic to filter your data based on the search query
//   };

//   const onBannerPress = () => {
//     navigation.navigate('15MinutesFree');
//   };
//   // const onCorpoPress = () => {
//   //   navigation.navigate('SplashScreen');
//   // };
// const onCorpoPress = () => {
//   setModalVisible(true); // Show the modal when the corporate banner is pressed
// };
//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setUserLocation({latitude, longitude});
//         console.log('Current position:', position);
//       },
//       error => {
//         console.warn(error);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('You can use the location');
//           getLocation();
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else {
//       check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//         .then(result => {
//           switch (result) {
//             case RESULTS.UNAVAILABLE:
//               console.log(
//                 'This feature is not available (on this device / in this context)',
//               );
//               break;
//             case RESULTS.DENIED:
//               console.log(
//                 'The permission has not been requested / is denied but requestable',
//               );
//               request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
//                 if (result === RESULTS.GRANTED) {
//                   getLocation();
//                 }
//               });
//               break;
//             case RESULTS.GRANTED:
//               console.log('The permission is granted');
//               getLocation();
//               break;
//             case RESULTS.BLOCKED:
//               console.log(
//                 'The permission is denied and not requestable anymore',
//               );
//               break;
//           }
//         })
//         .catch(error => {
//           console.warn(error);
//         });
//     }
//   };

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   return (
//     <ScrollView removeClippedSubviews={true}>
//       <SafeAreaView style={{position: 'relative'}}>
//         <SearchBar
//           placeholder="Search in Johannesburg"
//           onChangeText={handleSearchChange}
//         />
//         {/* {userLocation && (
//           <Text>
//             Location: Latitude: {userLocation.latitude}, Longitude:{' '}
//             {userLocation.longitude}
//           </Text>
//         )} */}
//         <TouchableOpacity
//           onPress={onBannerPress}
//           style={styles.bannerContainer}>
//           <Image
//             style={{padding: '0 10px 0 10px'}}
//             source={require('../../assests/Banner.png')} // Replace with the correct path to your image
//             resizeMode="cover" // or "contain" depending on your layout needs
//           />
//         </TouchableOpacity>
//         <Slider />
//         <View
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             position: 'absolute',
//             bottom: '25%',
//             left:"35%",
//             zIndex:11,
//           }}>
//           <Text
//             style={{
//               color: 'red',
//               fontSize: 20,
//               padding:10,
//               backgroundColor: '#000',
//             }}>
//             ScanMe
//           </Text>
//         </View>
//         <TouchableOpacity
//           onPress={onCorpoPress}
//           style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
//           <Image
//             source={require('../../assests/CorporatePods.png')} // Replace with the correct path to your image
//             resizeMode="cover" // or "contain" depending on your layout needs
//           />
//           <Text
//             style={{
//               position: 'absolute',
//               fontSize: 17,
//               color: '#fff',
//               backgroundColor: '#FE372F',
//               padding: 7,
//               borderRadius: 10,
//               top: '45%',
//             }}>
//             Corporate Pods
//           </Text>
//         </TouchableOpacity>
//         <View>
//           <Text
//             style={{
//               height: '200px',
//               width: '200px',
//             }}></Text>
//         </View>
//         <OfficePodsModal
//           visible={isModalVisible}
//           onClose={() => setModalVisible(false)}
//         />
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   bannerContainer: {
//     display: 'flex',
//     padding: 12,
//     alignItems: 'center',
//   },
// });

// export default HomeScreen;





// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
// import {useNavigation} from '@react-navigation/native';
// import Slider from './ProductSlider';
// import SearchBar from './SearchBar';
// import OfficePodsModal from './OfficePods';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [userLocation, setUserLocation] = useState(null);
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleSearchChange = query => {
//     setSearchQuery(query);
//   };

//   const onBannerPress = () => {
//     navigation.navigate('15MinutesFree');
//   };

//   const onCorpoPress = () => {
//     setModalVisible(true);
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setUserLocation({latitude, longitude});
//         console.log('Current position:', position);
//       },
//       error => {
//         console.warn(error);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('You can use the location');
//           getLocation();
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else {
//       check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//         .then(result => {
//           switch (result) {
//             case RESULTS.UNAVAILABLE:
//               console.log(
//                 'This feature is not available (on this device / in this context)',
//               );
//               break;
//             case RESULTS.DENIED:
//               console.log(
//                 'The permission has not been requested / is denied but requestable',
//               );
//               request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
//                 if (result === RESULTS.GRANTED) {
//                   getLocation();
//                 }
//               });
//               break;
//             case RESULTS.GRANTED:
//               console.log('The permission is granted');
//               getLocation();
//               break;
//             case RESULTS.BLOCKED:
//               console.log(
//                 'The permission is denied and not requestable anymore',
//               );
//               break;
//           }
//         })
//         .catch(error => {
//           console.warn(error);
//         });
//     }
//   };

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   return (
//     <ScrollView removeClippedSubviews={true}>
//       <SafeAreaView style={{position: 'relative'}}>
//         <SearchBar
//           placeholder="Search in Johannesburg"
//           onChangeText={handleSearchChange}
//         />
//         <TouchableOpacity
//           onPress={onBannerPress}
//           style={styles.bannerContainer}>
//           <Image
//             style={{padding: '0 10px 0 10px'}}
//             source={require('../../assests/Banner.png')} // Replace with the correct path to your image
//             resizeMode="cover" // or "contain" depending on your layout needs
//           />
//         </TouchableOpacity>
//         <Slider />
//         <View
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             position: 'absolute',
//             bottom: '25%',
//             left: '35%',
//             zIndex: 11,
//           }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('QRCodeScanner')}>
//             <Text
//               style={{
//                 color: 'red',
//                 fontSize: 20,
//                 padding: 10,
//                 backgroundColor: '#000',
//               }}>
//               ScanMe
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity
//           onPress={onCorpoPress}
//           style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
//           <Image
//             source={require('../../assests/CorporatePods.png')} // Replace with the correct path to your image
//             resizeMode="cover" // or "contain" depending on your layout needs
//           />
//           <Text
//             style={{
//               position: 'absolute',
//               fontSize: 17,
//               color: '#fff',
//               backgroundColor: '#FE372F',
//               padding: 7,
//               borderRadius: 10,
//               top: '45%',
//             }}>
//             Corporate Pods
//           </Text>
//         </TouchableOpacity>
//         <View>
//           <Text
//             style={{
//               height: '200px',
//               width: '200px',
//             }}></Text>
//         </View>
//         <OfficePodsModal
//           visible={isModalVisible}
//           onClose={() => setModalVisible(false)}
//         />
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   bannerContainer: {
//     display: 'flex',
//     padding: 12,
//     alignItems: 'center',
//   },
// });
// // 
// export default HomeScreen;





// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   Modal,
//   Button,
// } from 'react-native';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
// import {useNavigation} from '@react-navigation/native';
// import Slider from './ProductSlider';
// import SearchBar from './SearchBar';
// import OfficePodsModal from './OfficePods';
// import {RNCamera} from 'react-native-camera';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
// import Slider2 from './ProductSlider2';
// import axios from 'axios';
// import { RequestType, geocode } from 'react-geocode';
// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [userLocation, setUserLocation] = useState(null);
//   const [address, setaddress] = useState(null)
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isCameraVisible, setCameraVisible] = useState(false);
//   const [carouselData, setCarouselData] = useState([]);
//   const [scannedCode, setScannedCode] = useState(null);
//  const [corporateData, setCorporateData] = useState(null);
//   const handleSearchChange = query => {
//     setSearchQuery(query);
//   };

//   const onBannerPress = () => {
//     navigation.navigate('15MinutesFree');
//   };

  

//   const onCorpoPress = () => {
//     setModalVisible(true);
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setUserLocation({latitude, longitude});
//       },
//       error => {
//         console.warn(error);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };
//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('You can use the location');
//           getLocation();
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else {
//       check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//         .then(result => {
//           switch (result) {
//             case RESULTS.UNAVAILABLE:
//               console.log(
//                 'This feature is not available (on this device / in this context)',
//               );
//               break;
//             case RESULTS.DENIED:
//               console.log(
//                 'The permission has not been requested / is denied but requestable',
//               );
//               request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
//                 if (result === RESULTS.GRANTED) {
//                   getLocation();
//                 }
//               });
//               break;
//             case RESULTS.GRANTED:
//               console.log('The permission is granted');
//               getLocation();
//               break;
//             case RESULTS.BLOCKED:
//               console.log(
//                 'The permission is denied and not requestable anymore',
//               );
//               break;
//           }
//         })
//         .catch(error => {
//           console.warn(error);
//         });
//     }
//   };

// const fetchBannerData = async () => {
//   try {
//     const response = await axios.get('http://10.0.2.2:4000/api/pages/banner');
//     const data = response.data;
//     setCarouselData(data.carousel);
//     setCorporateData(data.corporate[0]); // Assuming index 1 exists10
//     console.log('corporateData', corporateData);
//   } catch (error) {
//     console.error('Error fetching banner data:', error);
//   }
// };

// useEffect(() => {
//   requestLocationPermission();
//   fetchBannerData();
// }, []);
//   const handleBarCodeScanned = ({data}) => {
//     setScannedCode(data);
//     setCameraVisible(false);
//     alert(`QR Code scanned: ${data}`);
//   };

//   const handleScanMePress = () => {
//     setCameraVisible(true);
//   };
//   const handleBackHome = () => {
//     navigation.goBack();
//   };
//   return (
//     <>
//       <ScrollView removeClippedSubviews={true}>
//         <SafeAreaView>
//           {/* <SearchBar
//             placeholder="Search in Johannesburg"
//             onChangeText={handleSearchChange}
//           /> */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => {}}>
//               <Icon name="menu" size={30} color="#000" />
//             </TouchableOpacity>
//             <Image
//               source={require('../../assests/Logo.png')}
//               style={styles.logo}
//             />
//             <View style={styles.headerRight}>
//               <TouchableOpacity onPress={() => {}}>
//                 <Icon name="search" size={30} color="#000" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => {}}>
//                 <Icon name="phone" size={30} color="#000" />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <Slider2 data={carouselData} />
//           <Slider />
//           <TouchableOpacity
//             onPress={onCorpoPress}
//             style={{display: 'flex', alignItems: 'center'}}>
//             <Image
//               source={require('../../assests/CorporatePods.png')}
//               resizeMode="cover"
//               style={styles.corporateImage}
//             />
//             <Text style={styles.corporatePodsText}>Corporate Pods</Text>
//           </TouchableOpacity>
//           <View>
//             <Text style={{height: '200px', width: '200px'}}></Text>
//           </View>
//           <OfficePodsModal
//             visible={isModalVisible}
//             onClose={() => setModalVisible(false)}
//           />
//           <Modal visible={isCameraVisible} animationType="slide">
//             <RNCamera
//               style={styles.camera}
//               type={RNCamera.Constants.Type.back}
//               flashMode={RNCamera.Constants.FlashMode.on}
//               onBarCodeRead={handleBarCodeScanned}
//               captureAudio={false}>
//               <TouchableOpacity
//                 onPress={() => setCameraVisible(false)}
//                 style={styles.backButton}>
//                 <Icon name={'close'} size={FONTSIZE.size_30} color={'#fff'} />
//               </TouchableOpacity>
//               <View style={styles.cameraOverlay}>
//                 <Text style={styles.cameraText}>
//                   Point your camera at a QR code
//                 </Text>
//                 {/* <TouchableOpacity
//                   onPress={() => setCameraVisible(false)}
//                   style={styles.closeButton}>
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity> */}
//               </View>
//             </RNCamera>
//           </Modal>
//         </SafeAreaView>
//       </ScrollView>
//       <View style={styles.scanMeContainer}>
//         <TouchableOpacity onPress={handleScanMePress} style={styles.scanMeText}>
//           <Icon name="qr-code" size={35} color="#fff" />
//           {/* <Text style={styles.scanMeText2}>Scan Me</Text> */}
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   backButton: {
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: SPACING.padding_10,
//   },
//   logo: {
//     width: 100,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   bannerContainer: {
//     display: 'flex',
//     padding: 12,
//     alignItems: 'center',
//   },
//   scanMeContainer: {
//     position: 'absolute',
//     bottom: 10,
//     left: 0,
//     right: 0,
//     display: 'flex',
//     alignItems: 'center',
//   },
//   scanMeText: {
//     padding: 6,
//     backgroundColor: '#FE372F',
//     borderRadius: 10,
//     display: 'flex',
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 6,
//   },
//   scanMeText2: {
//     color: '#fff',
//     fontSize: 17,
//   },
//   corporatePodsText: {
//     position: 'absolute',
//     fontSize: 17,
//     color: '#fff',
//     backgroundColor: '#FE372F',
//     padding: 7,
//     borderRadius: 10,
//     top: '45%',
//   },
//   camera: {
//     flex: 1,
//   },
//   cameraOverlay: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     margin: 40,
//   },
//   cameraText: {
//     flex: 1,
//     color: 'white',
//     fontSize: 18,
//     alignSelf: 'flex-end',
//     textAlign: 'center',
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default HomeScreen;



// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   Modal,
//   Button,
//   Animated,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
// import {useNavigation} from '@react-navigation/native';
// import Slider from './ProductSlider';
// import OfficePodsModal from './OfficePods';
// import {RNCamera} from 'react-native-camera';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
// import Slider2 from './ProductSlider2';
// import axios from 'axios';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [userLocation, setUserLocation] = useState(null);
//   const [address, setaddress] = useState(null);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isCameraVisible, setCameraVisible] = useState(false);
//   const [carouselData, setCarouselData] = useState([]);
//   const [scannedCode, setScannedCode] = useState(null);
//   const [corporateData, setCorporateData] = useState(null);
//   const [isSidebarVisible, setSidebarVisible] = useState(false);
//   const slideAnim = useState(new Animated.Value(-250))[0]; // Sidebar hidden initially

//   const handleSearchChange = query => {
//     setSearchQuery(query);
//   };

//   const onBannerPress = () => {
//     navigation.navigate('15MinutesFree');
//   };

//   const onCorpoPress = () => {
//     setModalVisible(true);
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setUserLocation({latitude, longitude});
//       },
//       error => {
//         console.warn(error);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('You can use the location');
//           getLocation();
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else {
//       check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//         .then(result => {
//           switch (result) {
//             case RESULTS.UNAVAILABLE:
//               console.log(
//                 'This feature is not available (on this device / in this context)',
//               );
//               break;
//             case RESULTS.DENIED:
//               console.log(
//                 'The permission has not been requested / is denied but requestable',
//               );
//               request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
//                 if (result === RESULTS.GRANTED) {
//                   getLocation();
//                 }
//               });
//               break;
//             case RESULTS.GRANTED:
//               console.log('The permission is granted');
//               getLocation();
//               break;
//             case RESULTS.BLOCKED:
//               console.log(
//                 'The permission is denied and not requestable anymore',
//               );
//               break;
//           }
//         })
//         .catch(error => {
//           console.warn(error);
//         });
//     }
//   };

//   const fetchBannerData = async () => {
//     try {
//       const response = await axios.get(
//         'http://10.0.2.2:4000/api/pages/banner',
//       );
//       const data = response.data;
//       setCarouselData(data.carousel);
//       setCorporateData(data.corporate[0]); // Assuming index 1 exists
//       console.log('corporateData', corporateData);
//     } catch (error) {
//       console.error('Error fetching banner data:', error);
//     }
//   };

//   useEffect(() => {
//     requestLocationPermission();
//     fetchBannerData();
//   }, []);

//   const handleBarCodeScanned = ({data}) => {
//     setScannedCode(data);
//     setCameraVisible(false);
//     alert(`QR Code scanned: ${data}`);
//   };

//   const handleScanMePress = () => {
//     setCameraVisible(true);
//   };

//   const toggleSidebar = () => {
//     setSidebarVisible(!isSidebarVisible);
//     Animated.timing(slideAnim, {
//       toValue: isSidebarVisible ? -250 : 0, // Slide in or out
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };
//     const closeSidebar = () => {
//       setSidebarVisible(false);
//       Animated.timing(slideAnim, {
//         toValue: -250, // Slide out
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     };
//   return (
//     <>
//       <ScrollView removeClippedSubviews={true}>
//         <SafeAreaView>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={toggleSidebar}>
//               <Icon name="menu" size={30} color="#000" />
//             </TouchableOpacity>
//             <Image
//               source={require('../../assests/Logo.png')}
//               style={styles.logo}
//             />
//             <View style={styles.headerRight}>
//               <TouchableOpacity onPress={() => {}}>
//                 <Icon name="search" size={30} color="#000" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => {}}>
//                 <Icon name="phone" size={30} color="#000" />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <Slider2 data={carouselData} />
//           <Slider />
//           <TouchableOpacity
//             onPress={onCorpoPress}
//             style={{display: 'flex', alignItems: 'center'}}>
//             <Image
//               source={require('../../assests/CorporatePods.png')}
//               resizeMode="cover"
//               style={styles.corporateImage}
//             />
//             <Text style={styles.corporatePodsText}>Corporate Pods</Text>
//           </TouchableOpacity>
//           <View>
//             <Text style={{height: '200px', width: '200px'}}></Text>
//           </View>
//           <OfficePodsModal
//             visible={isModalVisible}
//             onClose={() => setModalVisible(false)}
//           />
//           <Modal visible={isCameraVisible} animationType="slide">
//             <RNCamera
//               style={styles.camera}
//               type={RNCamera.Constants.Type.back}
//               flashMode={RNCamera.Constants.FlashMode.on}
//               onBarCodeRead={handleBarCodeScanned}
//               captureAudio={false}>
//               <TouchableOpacity
//                 onPress={() => setCameraVisible(false)}
//                 style={styles.backButton}>
//                 <Icon name={'close'} size={FONTSIZE.size_30} color={'#fff'} />
//               </TouchableOpacity>
//               <View style={styles.cameraOverlay}>
//                 <Text style={styles.cameraText}>
//                   Point your camera at a QR code
//                 </Text>
//               </View>
//             </RNCamera>
//           </Modal>
//         </SafeAreaView>
//       </ScrollView>
//       <View style={styles.scanMeContainer}>
//         <TouchableOpacity onPress={handleScanMePress} style={styles.scanMeText}>
//           <Icon name="qr-code" size={35} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       {/* <Animated.View
//         style={[styles.sidebar, {transform: [{translateX: slideAnim}]}]}>
//         <Text style={styles.sidebarText}>Sidebar Content Here</Text>
//       </Animated.View> */}
//        {isSidebarVisible && (
//         <TouchableWithoutFeedback onPress={closeSidebar}>
//           <View style={styles.overlay}>
//             <Animated.View
//               style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
//             >
//               <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
//                 <Icon name="close" size={30} color="#000" />
//               </TouchableOpacity>
//               <Text style={styles.sidebarText}>Sidebar Content Here</Text>
//               {/* Add more sidebar content as needed */}
//             </Animated.View>
//           </View>
//         </TouchableWithoutFeedback>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   backButton: {
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: SPACING.padding_10,
//   },
//   logo: {
//     width: 100,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   bannerContainer: {
//     display: 'flex',
//     padding: 12,
//     alignItems: 'center',
//   },
//   scanMeContainer: {
//     position: 'absolute',
//     bottom: 10,
//     left: 0,
//     right: 0,
//     display: 'flex',
//     alignItems: 'center',
//   },
//   scanMeText: {
//     padding: 6,
//     backgroundColor: '#FE372F',
//     borderRadius: 10,
//     display: 'flex',
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 6,
//   },
//   scanMeText2: {
//     color: '#fff',
//     fontSize: 17,
//   },
//   corporatePodsText: {
//     position: 'absolute',
//     fontSize: 17,
//     color: '#fff',
//     backgroundColor: '#FE372F',
//     padding: 7,
//     borderRadius: 10,
//     top: '45%',
//   },
//   camera: {
//     flex: 1,
//   },
//   cameraOverlay: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     margin: 40,
//   },
//   cameraText: {
//     flex: 1,
//     color: 'white',
//     fontSize: 18,
//     alignSelf: 'flex-end',
//     textAlign: 'center',
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   sidebar: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     width: 250,
//     backgroundColor: '#fff',
//     padding: 20,
//     zIndex: 1000,
//     shadowColor: '#000',
//     shadowOffset: {width: 2, height: 0},
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   sidebarText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//    overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 999,
//   },
// });

// export default HomeScreen;




// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   Modal,
//   Button,
//   Animated,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
// import {useNavigation} from '@react-navigation/native';
// import Slider from './ProductSlider';
// import OfficePodsModal from './OfficePods';
// import {RNCamera} from 'react-native-camera';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
// import Slider2 from './ProductSlider2';
// import axios from 'axios';
// import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [userLocation, setUserLocation] = useState(null);
//   const [address, setaddress] = useState(null);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isCameraVisible, setCameraVisible] = useState(false);
//   const [carouselData, setCarouselData] = useState([]);
//   const [scannedCode, setScannedCode] = useState(null);
//   const [corporateData, setCorporateData] = useState(null);
//   const [isSidebarVisible, setSidebarVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const slideAnim = useState(new Animated.Value(-250))[0]; // Start off-screen
//   // Sidebar hidden initially

//   const handleSearchChange = query => {
//     setSearchQuery(query);
//   };

//   const onBannerPress = () => {
//     navigation.navigate('15MinutesFree');
//   };

//   const onCorpoPress = () => {
//     setModalVisible(true);
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setUserLocation({latitude, longitude});
//       },
//       error => {
//         console.warn(error);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('You can use the location');
//           getLocation();
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else {
//       check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//         .then(result => {
//           switch (result) {
//             case RESULTS.UNAVAILABLE:
//               console.log(
//                 'This feature is not available (on this device / in this context)',
//               );
//               break;
//             case RESULTS.DENIED:
//               console.log(
//                 'The permission has not been requested / is denied but requestable',
//               );
//               request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
//                 if (result === RESULTS.GRANTED) {
//                   getLocation();
//                 }
//               });
//               break;
//             case RESULTS.GRANTED:
//               console.log('The permission is granted');
//               getLocation();
//               break;
//             case RESULTS.BLOCKED:
//               console.log(
//                 'The permission is denied and not requestable anymore',
//               );
//               break;
//           }
//         })
//         .catch(error => {
//           console.warn(error);
//         });
//     }
//   };

//  const fetchBannerData = async () => {
//    try {
//      const response = await axios.get(
//        'http://10.0.2.2:4000/api/pages/banner',
//      );
//      const data = response.data;
//      setCarouselData(data.carousel);
//      setCorporateData(data.corporate[0]); // Assuming index 1 exists
//      console.log('corporateData', corporateData);
//    } catch (error) {
//      console.error('Error fetching banner data:', error);
//    } finally {
//      setIsLoading(false); // Stop loading once data is fetched
//    }
//  };

//   useEffect(() => {
//     requestLocationPermission();
//     fetchBannerData();
//   }, []);

//   const handleBarCodeScanned = ({data}) => {
//     setScannedCode(data);
//     setCameraVisible(false);
//     alert(`QR Code scanned: ${data}`);
//   };

//   const handleScanMePress = () => {
//     setCameraVisible(true);
//   };

//   const toggleSidebar = () => {
//     const toValue = isSidebarVisible ? -250 : 0; 
//     Animated.timing(slideAnim, {
//       toValue, 
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setSidebarVisible(!isSidebarVisible); 
//     });
//   };

//   const closeSidebar = () => {
//     Animated.timing(slideAnim, {
//       toValue: -250, // Slide out
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setSidebarVisible(false);
//     });
//   };
//   return (
//     <>
//       <ScrollView removeClippedSubviews={true}>
//         <SafeAreaView>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={toggleSidebar}>
//               <Icon name="menu" size={40} color="#FE372F" />
//             </TouchableOpacity>
//             <Image
//               source={require('../../assests/Logo.png')}
//               style={styles.logo}
//             />
//             <View style={styles.headerRight}>
//               <TouchableOpacity onPress={() => {}}>
//                 <Icon name="email" size={30} color="grey" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => {}}>
//                 <Icon name="phone" size={30} color="grey" />
//               </TouchableOpacity>
//             </View>
//           </View>
//           {isLoading ? (
//             <ShimmerPlaceholder
//               style={{width: '100%', height: 200, marginBottom: 20}}
//             />
//           ) : (
//             <>
//               <Slider2 data={carouselData} />
//               <Slider />
//             </>
//           )}
//           <TouchableOpacity
//             onPress={onCorpoPress}
//             style={{display: 'flex', alignItems: 'center'}}>
//             {isLoading ? (
//               <ShimmerPlaceholder
//                 style={{width: '90%', height: 200, borderRadius: 10}}
//               />
//             ) : (
//               <Image
//                 source={require('../../assests/CorporatePods.png')}
//                 resizeMode="cover"
//                 style={styles.corporateImage}
//               />
//             )}
//             {!isLoading && (
//               <Text style={styles.corporatePodsText}>Corporate Pods</Text>
//             )}
//           </TouchableOpacity>
//           <View>
//             <Text style={{height: '200px', width: '200px'}}></Text>
//           </View>
//           <OfficePodsModal
//             visible={isModalVisible}
//             onClose={() => setModalVisible(false)}
//           />
//           <Modal visible={isCameraVisible} animationType="slide">
//             <RNCamera
//               style={styles.camera}
//               type={RNCamera.Constants.Type.back}
//               flashMode={RNCamera.Constants.FlashMode.on}
//               onBarCodeRead={handleBarCodeScanned}
//               captureAudio={false}>
//               <TouchableOpacity
//                 onPress={() => setCameraVisible(false)}
//                 style={styles.backButton}>
//                 <Icon name={'close'} size={FONTSIZE.size_30} color={'#fff'} />
//               </TouchableOpacity>
//               <View style={styles.cameraOverlay}>
//                 <Text style={styles.cameraText}>
//                   Point your camera at a QR code
//                 </Text>
//               </View>
//             </RNCamera>
//           </Modal>
//         </SafeAreaView>
//       </ScrollView>

//       {isSidebarVisible && (
//         <TouchableWithoutFeedback onPress={closeSidebar}>
//           <View style={styles.overlay}>
//             <Animated.View
//               style={[styles.sidebar, {transform: [{translateX: slideAnim}]}]}>
//               <TouchableOpacity
//                 onPress={closeSidebar}
//                 style={styles.closeButton}>
//                 <Icon name="close" size={30} color="#000" />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate('UserScreenMain')}>
//                 <Text style={styles.sidebarText}>User Account</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate('ProfilePage')}>
//                 <Text style={styles.sidebarText}>Profile</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate('AllBookings')}>
//                 <Text style={styles.sidebarText}>All Bookings</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate('PrivacyPolicy')}>
//                 <Text style={styles.sidebarText}>Privacy Policy</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate('TermsandService')}>
//                 <Text style={styles.sidebarText}>Terms and Conditions</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           </View>
//         </TouchableWithoutFeedback>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   backButton: {
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     paddingTop:10,
//     paddingBottom:0
//   },
//   logo: {
//     width: 200,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     gap: 15,
//   },
//   bannerContainer: {
//     display: 'flex',
//     padding: 12,
//     alignItems: 'center',
//   },
//   scanMeContainer: {
//     position: 'absolute',
//     bottom: 10,
//     left: 0,
//     right: 0,
//     display: 'flex',
//     alignItems: 'center',
//   },
//   scanMeText: {
//     padding: 6,
//     backgroundColor: '#FE372F',
//     borderRadius: 10,
//     display: 'flex',
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 6,
//   },
//   scanMeText2: {
//     color: '#fff',
//     fontSize: 17,
//   },
//   corporatePodsText: {
//     position: 'absolute',
//     fontSize: 17,
//     color: '#fff',
//     backgroundColor: '#FE372F',
//     padding: 7,
//     borderRadius: 10,
//     top: '45%',
//   },
//   camera: {
//     flex: 1,
//   },
//   cameraOverlay: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     margin: 40,
//   },
//   cameraText: {
//     flex: 1,
//     color: 'white',
//     fontSize: 18,
//     alignSelf: 'flex-end',
//     textAlign: 'center',
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     padding: 10,
//   },
//   sidebar: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     width: 250,
//     backgroundColor: '#fff',
//     padding: 20,
//     zIndex: 1000,
//     shadowColor: '#000',
//     shadowOffset: {width: 2, height: 0},
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   sidebarText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     padding: 10,
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 999,
//   },
// });

// export default HomeScreen;





// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   Modal,
//   Button,
//   Animated,
//   TouchableWithoutFeedback,
//   Easing, // Import Easing for smooth animations
// } from 'react-native';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
// import {useNavigation} from '@react-navigation/native';
// import Slider from './ProductSlider';
// import OfficePodsModal from './OfficePods';
// import {RNCamera} from 'react-native-camera';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
// import Slider2 from './ProductSlider2';
// import axios from 'axios';
// import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [userLocation, setUserLocation] = useState(null);
//   const [address, setaddress] = useState(null);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isCameraVisible, setCameraVisible] = useState(false);
//   const [carouselData, setCarouselData] = useState([]);
//   const [scannedCode, setScannedCode] = useState(null);
//   const [corporateData, setCorporateData] = useState(null);
//   const [isSidebarVisible, setSidebarVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const slideAnim = useState(new Animated.Value(-250))[0]; // Start off-screen

//   const handleSearchChange = query => {
//     setSearchQuery(query);
//   };

//   const onBannerPress = () => {
//     navigation.navigate('15MinutesFree');
//   };

//   const onCorpoPress = () => {
//     setModalVisible(true);
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setUserLocation({latitude, longitude});
//       },
//       error => {
//         console.warn(error);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('You can use the location');
//           getLocation();
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else {
//       check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//         .then(result => {
//           switch (result) {
//             case RESULTS.UNAVAILABLE:
//               console.log(
//                 'This feature is not available (on this device / in this context)',
//               );
//               break;
//             case RESULTS.DENIED:
//               console.log(
//                 'The permission has not been requested / is denied but requestable',
//               );
//               request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
//                 if (result === RESULTS.GRANTED) {
//                   getLocation();
//                 }
//               });
//               break;
//             case RESULTS.GRANTED:
//               console.log('The permission is granted');
//               getLocation();
//               break;
//             case RESULTS.BLOCKED:
//               console.log(
//                 'The permission is denied and not requestable anymore',
//               );
//               break;
//           }
//         })
//         .catch(error => {
//           console.warn(error);
//         });
//     }
//   };

//   const fetchBannerData = async () => {
//     try {
//       const response = await axios.get(
//         'http://10.0.2.2:4000/api/pages/banner',
//       );
//       const data = response.data;
//       setCarouselData(data.carousel);
//       setCorporateData(data.corporate[0]); // Assuming index 1 exists
//       console.log('corporateData', corporateData);
//     } catch (error) {
//       console.error('Error fetching banner data:', error);
//     } finally {
//       setIsLoading(false); // Stop loading once data is fetched
//     }
//   };

//   useEffect(() => {
//     requestLocationPermission();
//     fetchBannerData();
//   }, []);

//   const handleBarCodeScanned = ({data}) => {
//     setScannedCode(data);
//     setCameraVisible(false);
//     alert(`QR Code scanned: ${data}`);
//   };

//   const handleScanMePress = () => {
//     setCameraVisible(true);
//   };

//   const toggleSidebar = () => {
//     const toValue = isSidebarVisible ? -250 : 0;
//     Animated.timing(slideAnim, {
//       toValue,
//       duration: 300,
//       easing: Easing.inOut(Easing.ease), // Use easing for smooth animation
//       useNativeDriver: true,
//     }).start(() => {
//       setSidebarVisible(!isSidebarVisible);
//     });
//   };

//   const closeSidebar = () => {
//     Animated.timing(slideAnim, {
//       toValue: -250, // Slide out
//       duration: 300,
//       easing: Easing.inOut(Easing.ease), // Use easing for smooth animation
//       useNativeDriver: true,
//     }).start(() => {
//       setSidebarVisible(false);
//     });
//   };

import React, {useEffect, useState} from 'react';
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
  Button,
  Animated,
  TouchableWithoutFeedback,
  Easing, // Import Easing for smooth animations
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
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Sidebar starts off-screen

  const handleSearchChange = query => {
    setSearchQuery(query);
  };

  const onBannerPress = () => {
    navigation.navigate('15MinutesFree');
  };

  const onCorpoPress = () => {
    setModalVisible(true);
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude});
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
          console.log('You can use the location');
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
      const response = await axios.get(
        'http://10.0.2.2:4000/api/pages/banner',
      );
      const data = response.data;
      setCarouselData(data.carousel);
      setCorporateData(data.corporate[0]); // Assuming index 1 exists
      console.log('corporateData', corporateData);
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
    alert(`QR Code scanned: ${data}`);
  };

  const handleScanMePress = () => {
    setCameraVisible(true);
  };

   const toggleSidebar = () => {
     const toValue = isSidebarVisible ? -250 : 0;
     Animated.timing(slideAnim, {
       toValue,
       duration: isSidebarVisible ? 300 : 500, // Increase duration for opening, shorter for closing
       easing: isSidebarVisible
         ? Easing.in(Easing.ease)
         : Easing.out(Easing.ease), // Different easing for open/close
       useNativeDriver: true,
     }).start(() => {
       setSidebarVisible(!isSidebarVisible);
     });
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
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleSidebar}>
              <Icon name="menu" size={40} color="#FE372F" />
            </TouchableOpacity>
            <Image
              source={require('../../assests/Logo.png')}
              style={styles.logo}
            />
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => {}}>
                <Icon name="email" size={30} color="grey" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Icon name="phone" size={30} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
          {isLoading ? (
            <ShimmerPlaceholder
              style={{width: '100%', height: 200, marginBottom: 20}}
            />
          ) : (
            <>
              <Slider2 data={carouselData} />
              <Slider />
            </>
          )}
          <TouchableOpacity
            onPress={onCorpoPress}
            style={{display: 'flex', alignItems: 'center'}}>
            {isLoading ? (
              <ShimmerPlaceholder
                style={{width: '90%', height: 200, borderRadius: 10}}
              />
            ) : (
              <Image
                source={require('../../assests/CorporatePods.png')}
                style={{width:"95%", borderRadius:10}}
              />
            )}
            {!isLoading && (
              <Text style={styles.corporatePodsText}>Corporate Pods</Text>
            )}
          </TouchableOpacity>
          <View>
            <Text style={{height: '200px', width: '200px'}}></Text>
          </View>
          <OfficePodsModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
          />
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
        </SafeAreaView>
      </ScrollView>

      {isSidebarVisible && (
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={styles.overlay}>
            <Animated.View
              style={[styles.sidebar, {transform: [{translateX: slideAnim}]}]}>
              <TouchableOpacity
                onPress={closeSidebar}
                style={styles.closeButton}>
                <Icon name="close" size={30} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('UserScreenMain')}>
                <Text style={styles.sidebarText}>User Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ProfilePage')}>
                <Text style={styles.sidebarText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('AllBookings')}>
                <Text style={styles.sidebarText}>All Bookings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text style={styles.sidebarText}>Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('TermsandService')}>
                <Text style={styles.sidebarText}>Terms and Conditions</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
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
  bannerContainer: {
    display: 'flex',
    padding: 12,
    alignItems: 'center',
  },
  scanMeContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
  },
  scanMeText: {
    padding: 6,
    backgroundColor: '#FE372F',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  scanMeText2: {
    color: '#fff',
    fontSize: 17,
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
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 1000,
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
    color:"#000",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default HomeScreen;
