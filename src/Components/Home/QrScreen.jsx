// // import { Text, View } from 'react-native'
// // import React, { Component } from 'react'
// // import QRCode from 'react-native-qrcode-svg';

// // export class QrScreen extends Component {
// //   render() {
// //     return (
// //       <View>
// //         <Text>QrScreen</Text>
// //         <View style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
// //           <QRCode value="F2/33346/629039/0/1716633322/1716631322" size={200} />
// //         </View>
// //       </View>
// //     );
// //   }
// // }

// // export default QrScreen

// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import QRCode from 'react-native-qrcode-svg';

// const QrScreen = () => {
//   const route = useRoute();
//   const {bookingData} = route.params;
//   const navigation = useNavigation();

//   const handleBackHome = () => {
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{display: 'flex', flexDirection: 'row', gap: 70}}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.header}>Booking Preview</Text>
//       </View>
//       <View style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
//         <QRCode value={bookingData.qrCodeData} size={200} />
//       </View>
//       <View style={styles.detailContainer}>
//         <Text style={styles.detailText}>
//           Purpose: {bookingData.bookingPurpose}
//         </Text>
//         <Text style={styles.detailText}>
//           Booking Date: {new Date(bookingData.bookingDate).toLocaleString()}
//         </Text>
//         <Text style={styles.detailText}>
//           Start Time: {new Date(bookingData.startTime).toLocaleString()}
//         </Text>
//         <Text style={styles.detailText}>
//           End Time: {new Date(bookingData.endTime).toLocaleString()}
//         </Text>
//         <Text style={styles.detailText}>
//           Time Slot Number: {bookingData.timeSlotNumber}
//         </Text>
//         <Text style={styles.detailText}>Status: {bookingData.status}</Text>
//         <Text style={styles.detailText}>
//           Booking Active: {bookingData.isBookingActive ? 'Yes' : 'No'}
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   backButton: {
//     padding: 10,
//     paddingTop: 2,
//   },
//   header: {
//     color: '#000',
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   detailContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//   },
//   detailText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });

// export default QrScreen;


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
// import {useNavigation} from '@react-navigation/native';
// import QRCode from 'react-native-qrcode-svg';

// const QrScreen = ({route}) => {
//   const {booking} = route.params;
//   console.log("as",booking)
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

//   return (
//     <ScrollView style={styles.container}>
//       {/* <Text style={styles.title}>{booking.title} Pods Details</Text> */}
//       <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.header}>{booking.title} Booking Preview</Text>
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

// export default QrScreen;



import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

const QrScreen = ({route}) => {
  const {booking} = route.params;
  const navigation = useNavigation();

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Booking details not available</Text>
      </View>
    );
  }

  const handleBackHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeMain'}], // Replace 'HomeScreen' with the name of your home screen route
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
        <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
          <Icon name={'arrow-back'} size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.header}>Booking Preview</Text>
      </View>
      <View style={{display: 'flex', alignItems: 'center', padding: 20}}>
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
          <Text style={styles.detailValue}>{booking.bookingDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Start Time:</Text>
          <Text style={styles.detailValue}>{booking.startTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>End Time:</Text>
          <Text style={styles.detailValue}>{booking.endTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={styles.detailValue}>{booking.status}</Text>
        </View>
      </View>
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
  backButton: {
    padding: 10,
  },
});

export default QrScreen;
