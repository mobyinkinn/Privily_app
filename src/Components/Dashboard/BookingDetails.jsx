// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollVie,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
// import { useNavigation } from '@react-navigation/native';
// import QRCode from 'react-native-qrcode-svg';

// const BookingDetailsScreen = ({route}) => {
//   const {booking} = route.params;
// console.log('booking', booking);
//   if (!booking) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Booking details not available</Text>
//       </View>
//     );
//   }
// const navigation = useNavigation();

// const handleBackHome = () => {
//   navigation.goBack();
// };

//   return (
//     <ScrollView style={styles.container}>
//       {/* <Text style={styles.title}>{booking.title} Pods Details</Text> */}
//       <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.header}>{booking.title} Pods Details</Text>
//       </View>
//       <View style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
//         <QRCode value={booking.qrCodeData} size={200} />
//       </View>
//       <View style={{paddingTop:50}}>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Booking Id:</Text>
//           <Text style={styles.detailValue}>#{booking._id}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Purpose:</Text>
//           <Text style={styles.detailValue}>{booking.bookingPurpose}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Booking Date:</Text>
//           <Text style={styles.detailValue}>{booking.bookingDate}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Start Time:</Text>
//           <Text style={styles.detailValue}>{booking.startTime}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>end Time:</Text>
//           <Text style={styles.detailValue}>{booking.endTime}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Status:</Text>
//           <Text style={styles.detailValue}>{booking.status}</Text>
//         </View>
//       </View>
//       {/* <Image source={{uri: booking.image}} style={styles.image} />
//       <Text style={styles.subTitle}>{booking.placeName}</Text>
//       <Text style={styles.address}>{booking.address}</Text>
//       <View style={styles.ratingRow}>
//         <Icon name="place" size={20} color="#000" />
//         <Text style={styles.rating}>{booking.rating}</Text>
//       </View> */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 16,
//   },
//   header: {
//     color: '#000',
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 16,
//   },
//   errorText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'red',
//     marginTop: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     color:"#000"

//   },
//   detailLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#000',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//     marginVertical: 16,
//   },
//   subTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   address: {
//     fontSize: 16,
//     color: '#757575',
//   },
//   ratingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 8,
//   },
//   rating: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
// });

// export default BookingDetailsScreen;


// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation} from '@react-navigation/native';
// import QRCode from 'react-native-qrcode-svg';

// const BookingDetailsScreen = ({route}) => {
//   const {booking} = route.params;
//   console.log('booking', booking);

//   if (!booking) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Booking details not available</Text>
//       </View>
//     );
//   }

//   const navigation = useNavigation();

//   const handleBackHome = () => {
//     navigation.goBack();
//   };

//   // Time formatting function
//   const formatTime = dateTime => {
//     const date = new Date(dateTime);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true, // Use true if you want a 12-hour format
//     });
//   };
// const formatDate = dateTime => {
//   const date = new Date(dateTime);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   });
// };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.header}>{booking.title} Pods Details</Text>
//       </View>
//       <View style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
//         <QRCode value={booking.qrCodeData} size={200} />
//       </View>
//       <View style={{paddingTop: 50}}>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Booking Id:</Text>
//           <Text style={styles.detailValue}>#{booking._id}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Purpose:</Text>
//           <Text style={styles.detailValue}>{booking.bookingPurpose}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Booking Date:</Text>
//           <Text style={styles.detailValue}>
//             {formatDate(booking.bookingDate)}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Start Time:</Text>
//           <Text style={styles.detailValue}>
//             {formatDate(booking.bookingDate)} {formatTime(booking.startTime)}
//           </Text>
//           {/* Format startTime */}
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>End Time:</Text>
//           <Text style={styles.detailValue}>
//             {formatDate(booking.bookingDate)} {formatTime(booking.endTime)}
//           </Text>
//           {/* Format endTime */}
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Status:</Text>
//           <Text style={styles.detailValue}>{booking.status}</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 16,
//   },
//   header: {
//     color: '#000',
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   errorText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'red',
//     marginTop: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     color: '#000',
//   },
//   detailLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#000',
//   },
// });

// export default BookingDetailsScreen;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Button,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation} from '@react-navigation/native';
// import QRCode from 'react-native-qrcode-svg';

// const BookingDetailsScreen = ({route}) => {
//   const {booking} = route.params;
//   console.log('booking', booking);
//   const navigation = useNavigation();
//   const [showCancelButton, setShowCancelButton] = useState(false);

//   // Time formatting function
//   const formatTime = dateTime => {
//     const date = new Date(dateTime);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//       timeZone: 'UTC',
//     });
//   };

//   const formatDate = dateTime => {
//     const date = new Date(dateTime);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//     });
//   };

//   // Calculate if the cancel button should be shown
//   useEffect(() => {
//     const checkCancelTime = () => {
//       // const currentTime = new Date();
//       // const startTime = new Date(booking.startTime);
//       // const fiveMinutesBeforeStart = new Date(
//       //   startTime.getTime() - 12 * 60 * 1000,
//       // );
//       const currentTime = new Date().getTime(); // Get current time in milliseconds
//       const startTime = new Date(booking.startTime); // Convert booking start time to UTC timestamp
//       console.log('startTime', startTime);
//       const fiveMinutesBeforeStart = startTime - 7 * 60 * 1000; // 5 minutes before start time

//       // Check if current time is within 5 minutes of the start time
//       if (currentTime >= fiveMinutesBeforeStart && currentTime < startTime) {
//         setShowCancelButton(true);
//       } else {
//         setShowCancelButton(false);
//       }
//     };

//     // Run the check when the component mounts
//     checkCancelTime();

//     // Optionally, set up a timer to update every minute until the button should be shown
//     const interval = setInterval(checkCancelTime, 1 * 1000); // Check every minute

//     // Clean up interval when component unmounts
//     return () => clearInterval(interval);
//   }, [booking.startTime]);

//   const handleBackHome = () => {
//     navigation.goBack();
//   };

//   const handleCancelBooking = () => {
//     // Add your cancel booking logic here
//     console.log('Cancel booking', booking._id);
//   };

//   if (!booking) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Booking details not available</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.header}>{booking.title} Pods Details</Text>
//       </View>
//       <View style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
//         <QRCode value={booking.qrCodeData} size={200} />
//       </View>
//       <View style={{paddingTop: 50}}>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Booking Id:</Text>
//           <Text style={styles.detailValue}>#{booking._id}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Purpose:</Text>
//           <Text style={styles.detailValue}>{booking.bookingPurpose}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Booking Date:</Text>
//           <Text style={styles.detailValue}>
//             {booking.bookingDate}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Start Time:</Text>
//           <Text style={styles.detailValue}>
//             {booking.bookingDate} {formatTime(booking.startTime)}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>End Time:</Text>
//           <Text style={styles.detailValue}>
//             {formatDate(booking.bookingDate)} {formatTime(booking.endTime)}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Status:</Text>
//           <Text style={styles.detailValue}>{booking.status}</Text>
//         </View>
//       </View>

//       {/* Conditionally render the cancel button */}
//       {showCancelButton && (
//         <View style={styles.cancelButtonContainer}>
//           <Button title="Cancel Booking" onPress={handleCancelBooking} />
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 16,
//   },
//   header: {
//     color: '#000',
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   errorText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'red',
//     marginTop: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     color: '#000',
//   },
//   detailLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#000',
//   },
//   cancelButtonContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
// });

// export default BookingDetailsScreen;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Button,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation} from '@react-navigation/native';
// import QRCode from 'react-native-qrcode-svg';

// const BookingDetailsScreen = ({route}) => {
//   const {booking} = route.params;
//   console.log('booking', booking);
//   const navigation = useNavigation();
//   const [showCancelButton, setShowCancelButton] = useState(true);

//   // Time formatting function
//   const formatTime = dateTime => {
//     const date = new Date(dateTime);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//       timeZone:"UTC"
//     });
//   };

//   // Date formatting function
//   const formatDate = dateTime => {
//     const date = new Date(dateTime);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',

//     });
//   };

//   // Calculate if the cancel button should be shown
//   useEffect(() => {
//     const checkCancelTime = () => {
//       const currentTime = new Date(); // Get current time
//       const startTime = new Date(booking.startTime); // Booking start time
// const updatedTime = new Date(currentTime.setHours(currentTime.getHours() + 2));

//       // Calculate 5 minutes before the start time
//       const fiveMinutesBeforeStart = new Date(
//         startTime.getTime() - 5 * 60 * 1000,
//       );
// console.log('currentTime', updatedTime);

// console.log('fiveMinutesBeforeStart', fiveMinutesBeforeStart);
//       // Check if current time is within the allowed cancellation window
//       if (currentTime <= fiveMinutesBeforeStart ) {
//         setShowCancelButton(true);
//       } else {
//         setShowCancelButton(false);
//       }
//     };

//     // Run the check when the component mounts
//     checkCancelTime();

//     // Optionally, set up a timer to update every second until the button should be shown
//     const interval = setInterval(checkCancelTime, 100000); // Check every second

//     // Clean up interval when component unmounts
//     return () => clearInterval(interval);
//   }, [booking.startTime]);

//   const handleBackHome = () => {
//     navigation.goBack();
//   };

//   const handleCancelBooking = () => {
//     // Add your cancel booking logic here
//     console.log('Cancel booking', booking._id);
//   };

//   if (!booking) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Booking details not available</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.header}>{booking.title} Pods Details</Text>
//       </View>
//       <View style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
//         <QRCode value={booking.qrCodeData} size={200} />
//       </View>
//       <View style={{paddingTop: 50}}>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Booking Id:</Text>
//           <Text style={styles.detailValue}>#{booking._id}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Purpose:</Text>
//           <Text style={styles.detailValue}>{booking.bookingPurpose}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Booking Date:</Text>
//           <Text style={styles.detailValue}>
//             {formatDate(booking.bookingDate)}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Start Time:</Text>
//           <Text style={styles.detailValue}>
//             {formatDate(booking.bookingDate)} {formatTime(booking.startTime)}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>End Time:</Text>
//           <Text style={styles.detailValue}>
//             {formatDate(booking.bookingDate)} {formatTime(booking.endTime)}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Status:</Text>
//           <Text style={styles.detailValue}>{booking.status}</Text>
//         </View>
//       </View>

//       {/* Conditionally render the cancel button */}
//       {showCancelButton && (
//         <View style={styles.cancelButtonContainer}>
//           <Button title="Cancel Booking" onPress={handleCancelBooking} />
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 16,
//   },
//   header: {
//     color: '#000',
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   errorText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'red',
//     marginTop: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     color: '#000',
//   },
//   detailLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#000',
//   },
//   cancelButtonContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
// });

// export default BookingDetailsScreen;


// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Button,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation} from '@react-navigation/native';
// import QRCode from 'react-native-qrcode-svg';
// import axios from 'axios'; // You can also use fetch instead of axios

// const BookingDetailsScreen = ({route}) => {
//   const {booking} = route.params;
//   const navigation = useNavigation();
//   const [showCancelButton, setShowCancelButton] = useState(true);

//   // Time formatting function
//   const formatTime = dateTime => {
//     const date = new Date(dateTime);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//       timeZone:"UTC"
//     });
//   };

//   // Date formatting function
//   const formatDate = dateTime => {
//     const date = new Date(dateTime);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//     });
//   };

//   // Calculate if the cancel button should be shown
//   // useEffect(() => {
//   //   const checkCancelTime = () => {
//   //     const currentTime = new Date(); // Get current time
//   //     const startTime = new Date(booking.startTime); // Booking start time
//   //     const updatedTime = new Date(
//   //       currentTime.setHours(currentTime.getHours() + 2),
//   //     );

//   //     // Calculate 5 minutes before the start time
//   //     const fiveMinutesBeforeStart = new Date(
//   //       startTime.getTime() - 1 * 60 * 1000,
//   //     );

//   //     console.log('currentTime', updatedTime);
//   //     console.log('fiveMinutesBeforeStart', fiveMinutesBeforeStart);

//   //     // Check if current time is within the allowed cancellation window
//   //     if (currentTime <= fiveMinutesBeforeStart) {
//   //       setShowCancelButton(true);
//   //     } else {
//   //       setShowCancelButton(false);
//   //     }
//   //   };

//   //   // Run the check when the component mounts
//   //   checkCancelTime();

//   //   // Optionally, set up a timer to update every second until the button should be shown
//   //   const interval = setInterval(checkCancelTime, 1000000); // Check every second

//   //   // Clean up interval when component unmounts
//   //   return () => clearInterval(interval);
//   // }, [booking.startTime]);
// useEffect(() => {
//   const checkCancelTime = () => {
//     const currentTime = new Date(); // Get current time
//     const startTime = new Date(booking.startTime); // Booking start time
// const updatedTime = new Date(currentTime.setHours(currentTime.getHours() + 2));
//     // Calculate 5 minutes before the start time
//     const fiveMinutesBeforeStart = new Date(
//       startTime.getTime() - 5* 60 * 1000,
//     );

//     // Check if current time is already beyond 5 minutes before start time
//     if (updatedTime <= fiveMinutesBeforeStart) {
//       setShowCancelButton(true);
//     } else {
//       setShowCancelButton(false);
//     }
//   };

//   // Calculate the delay in milliseconds for setTimeout
//   const currentTime = new Date();
// const updatedTime = new Date(currentTime.setHours(currentTime.getHours() + 2));

//   const startTime = new Date(booking.startTime);
//   const fiveMinutesBeforeStart = new Date(startTime.getTime() - 5 * 60 * 1000);
// console.log('fiveMinutesBeforeStart', fiveMinutesBeforeStart);
// console.log('currentTime', updatedTime);
//   // Calculate the difference between current time and five minutes before start time
//   const difference = fiveMinutesBeforeStart.getTime() - updatedTime.getTime();
// console.log('difference', difference);
//   // If the difference is greater than 0, set the timeout
//   if (difference > 0) {
//     setTimeout(() => {
//       checkCancelTime();
//     }, difference);
//   } else {
//     // If the difference is already negative, run the check immediately
//     checkCancelTime();
//   }
// }, [booking.startTime]);
//   const handleBackHome = () => {
//     navigation.goBack(); // Navigate back to the previous screen
//   };

//   // Function to cancel the booking
//   const handleCancelBooking = async () => {
//     try {
//       // Show a confirmation alert before cancelling
//       Alert.alert(
//         'Cancel Booking',
//         'Are you sure you want to cancel this booking?',
//         [
//           {
//             text: 'No',
//             style: 'cancel',
//           },
//           {
//             text: 'Yes',
//             onPress: async () => {
//               // Send PUT request to cancel booking
//               const response = await axios.put(
//                 `http://10.0.2.2:4000/api/user/cancel-booking/${booking._id}`,
//               );

//               console.log('Cancel booking response:', response.data);

//               // On success, navigate back one screen
//               navigation.goBack();
//             },
//           },
//         ],
//       );
//     } catch (error) {
//       console.error('Error cancelling booking:', error);
//       Alert.alert('Error', 'Failed to cancel the booking. Please try again.');
//     }
//   };

//   if (!booking) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Booking details not available</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.header}>{booking.title} Pods Details</Text>
//       </View>
//       <View style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
//         <QRCode value={booking.qrCodeData} size={200} />
//       </View>
//       <View style={{paddingTop: 50}}>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Booking Id:</Text>
//           <Text style={styles.detailValue}>#{booking._id}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Purpose:</Text>
//           <Text style={styles.detailValue}>{booking.bookingPurpose}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Booking Date:</Text>
//           <Text style={styles.detailValue}>
//             {formatDate(booking.bookingDate)}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Start Time:</Text>
//           <Text style={styles.detailValue}>
//             {formatDate(booking.bookingDate)} {formatTime(booking.startTime)}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>End Time:</Text>
//           <Text style={styles.detailValue}>
//             {formatDate(booking.bookingDate)} {formatTime(booking.endTime)}
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Status:</Text>
//           <Text style={styles.detailValue}>{booking.status}</Text>
//         </View>
//       </View>

//       {/* Conditionally render the cancel button */}
//       {showCancelButton && (
//         <View style={styles.cancelButtonContainer}>
//           <Button title="Cancel Booking" onPress={handleCancelBooking} />
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 16,
//   },
//   header: {
//     color: '#000',
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   errorText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'red',
//     marginTop: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     color: '#000',
//   },
//   detailLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#000',
//   },
//   cancelButtonContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
// });

// export default BookingDetailsScreen;



import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../../context/Authcontext';

const BookingDetailsScreen = ({route}) => {
  const {booking} = route.params;
  const navigation = useNavigation();
  const [showCancelButton, setShowCancelButton] = useState(false);

  const {checkCancelTime, cancelBooking} = useContext(AuthContext);

  // Time formatting function
  const formatTime = dateTime => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });
  };

  // Date formatting function
  const formatDate = dateTime => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  useEffect(() => {
    const shouldShowCancelButton = checkCancelTime(booking.startTime);
    setShowCancelButton(shouldShowCancelButton);
  }, [booking.startTime, checkCancelTime]);

  const handleBackHome = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Booking details not available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
        <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
          <Icon name={'arrow-back'} size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.header}>{booking.title} Pods Details</Text>
      </View>
      <View style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
        <QRCode value={booking.qrCodeData} size={200} />
      </View>
      <View style={{paddingTop: 50}}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking Id:</Text>
          <Text style={styles.detailValue}>#{booking._id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Purpose:</Text>
          <Text style={styles.detailValue}>{booking.bookingPurpose}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking Date:</Text>
          <Text style={styles.detailValue}>
            {formatDate(booking.bookingDate)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Start Time:</Text>
          <Text style={styles.detailValue}>
            {formatDate(booking.bookingDate)} {formatTime(booking.startTime)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>End Time:</Text>
          <Text style={styles.detailValue}>
            {formatDate(booking.bookingDate)} {formatTime(booking.endTime)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={styles.detailValue}>{booking.status}</Text>
        </View>
      </View>

      {/* Conditionally render the cancel button */}
      {showCancelButton && (
        <View style={styles.cancelButtonContainer}>
          <Button
            title="Cancel Booking"
            onPress={() => cancelBooking(booking._id, navigation)}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    color: '#000',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
  },
  cancelButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default BookingDetailsScreen;
