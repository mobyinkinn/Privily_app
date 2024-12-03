

import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../../context/Authcontext';
import axios from 'axios';
import moment from 'moment';

const BookingDetailsScreen = ({route}) => {
  const {booking} = route.params;
  const {checkoutID} = useContext(AuthContext);
  const navigation = useNavigation();
  const [qrValue, setQRValue] = useState(
    'F1/33344/629039/0/1729752300/1729749600',
  ); // Initial dummy QR
  const [isactive, setisactive] = useState(false)
  const [loading, setLoading] = useState(false);
  // const {cancelBooking} = useContext(AuthContext);
  const [showCancelButton, setShowCancelButton] = useState(true);

const refundPayment = async () => {
  console.log('checkoutID', checkoutID);
  try {
    const response = await axios.post(
      `https://payments.yoco.com/api/checkouts/${checkoutID}/refund`,
      {},
      {
        headers: {
          Authorization: 'Bearer sk_live_417b2dd7vKQB93Q0c634b919e3b9', // Replace with your secret key
        },
      },
    );

    if (response.data && response.data.status === 'succeeded') {
      Alert.alert('Success', 'Payment refunded successfully!');
      return true;
    } else {
      Alert.alert('Error', 'Failed to refund the payment');
      return false;
    }
  } catch (error) {
    console.error('Error refunding payment:', error);
    Alert.alert('Error', 'An error occurred while processing the refund');
    return false;
  }
};

const cancelBooking = async () => {
  try {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking and want refund?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, will refund the amount.',
          onPress: async () => {
            // Call the refund API first
            const isRefundSuccessful = await refundPayment();
// const isRefundSuccessful=true
            if (isRefundSuccessful) {
              // If refund is successful, proceed to cancel the booking
              const response = await axios.put(
                `https://privily.co/api/user/cancel-booking/${booking._id}`,
              );

              console.log('Cancel booking response:', response.data);

              if (response.data) {
                // await updateBookingStatus(booking._id, 'Cancelled');
                navigation.goBack();
                navigation.goBack();
              } else {
                Alert.alert('Error', 'Failed to cancel the booking');
              }
            }
          },
        },
      ],
    );
  } catch (error) {
    console.error('Error cancelling booking:', error);
    Alert.alert('Error', 'Failed to cancel the booking. Please try again.');
  } finally {
    setLoading(false);
  }
};

// const cancelBooking = async (bookingId, navigation) => {
//   try {
//     Alert.alert(
//       'Cancel Booking',
//       'Are you sure you want to cancel this booking?',
//       [
//         {
//           text: 'No',
//           style: 'cancel',
//         },
//         {
//           text: 'Yes',
//           onPress: async () => {
//             // Call API to cancel the booking
//             const response = await axios.put(
//               `https://privily.co/api/user/cancel-booking/${bookingId}`,
//             );

//             console.log('Cancel booking response:', response.data);
//             // navigation.goBack();
//             await updateBookingStatus(booking._id, 'Cancelled');
//             navigation.goBack();
//           },
//         },
//       ],
//     );
//   } catch (error) {
//     console.error('Error cancelling booking:', error);
//     Alert.alert('Error', 'Failed to cancel the booking. Please try again.');
//   }
// };
  useEffect(() => {
    const currentTime = moment();
    const newTime = currentTime.add(2, 'hours');
    const bookingStartTime = moment(booking.startTime);
    const targetTime = bookingStartTime.subtract(2, 'minutes'); // 2 minutes before
    const diffInMilliseconds = targetTime.diff(newTime, 'seconds');
    console.log(`Time difference in ms: ${diffInMilliseconds}`);
    setTimeout(() => {
      if(booking.status!=="Cancelled"){
      setQRValue(booking.qrCodeData);
      setisactive(true)
      }
    }, diffInMilliseconds * 1000)
  }, []);
  useEffect(() => {
    const currentTime = moment();
    const newTime = currentTime.add(2, 'hours');
    const bookingStartTime = moment(booking.startTime);
    const targetTime = bookingStartTime.subtract(3, 'minutes'); // 2 minutes before
    const diffInMilliseconds = targetTime.diff(newTime, 'seconds');
    console.log(`Time difference in ms: ${diffInMilliseconds}`);
    setTimeout(() => {
      setShowCancelButton(false)
    }, diffInMilliseconds * 1000);
  }, []);
 
  const handleBackHome = () => navigation.goBack();


  const openDoor = async () => {
     setLoading(true);
     try {
       const response = await axios.post(
         'https://web.fondcard.net/open/mqtt/api.php?method=mqtt.door.open',
         {
           serial: booking.serial,
           password: booking.password,
           userId: booking.Userid,
         },
         {
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded',
           },
         },
       );

       console.log('respo', response.data);
       if (response.data.code === 0) {
         Alert.alert('Success', 'Door opened successfully!');
       } else {
         Alert.alert(
           'Error',
           response.data.message || 'Failed to open the door',
         );
       }
     } catch (error) {
       console.error('Error:', error);
       Alert.alert('Error', 'Something went wrong. Please try again.');
     } finally {
       setLoading(false);
     }
   };
const handleOpenDoorPress = () => {
  if (isactive) {
    openDoor(); // If active, open the door
  } else {
    Alert.alert('Error', 'Time is invalid to open the door.'); // If not active, show alert
  }
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
      <View
        style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
        <TouchableOpacity
          onPress={handleBackHome}
          style={{position: 'absolute', zIndex: 11}}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>{booking.title} Pods Details</Text>
      </View>
      <View style={{display: 'flex', alignItems: 'center', padding: 20}}>
        <QRCode value={qrValue} size={200} />
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
      {booking.status === 'Pending' || booking.status === 'Processing' ? (
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.openButton}
            onPress={handleOpenDoorPress}
            disabled={loading}>
            <Text style={styles.openButtonText}>
              {loading ? 'Opening...' : 'Remote Open'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        ''
      )}
      {booking.status === 'Pending' && showCancelButton ? (
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.cancelButtonContainer}
            onPress={cancelBooking}>
            <Text style={styles.openButtonText}>{'Cancel Booking'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        ''
      )}
    </ScrollView>
  );
};

const formatTime = dateTime =>
  new Date(dateTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });

const formatDate = dateTime =>
  new Date(dateTime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5', padding: 16},
  openButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  header: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  errorText: {fontSize: 18, textAlign: 'center', color: 'red', marginTop: 20},
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  openButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  cancelButtonContainer: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  openButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailLabel: {fontSize: 16, fontWeight: 'bold', color: '#000'},
  detailValue: {fontSize: 16, color: '#000'},
});

export default BookingDetailsScreen;
