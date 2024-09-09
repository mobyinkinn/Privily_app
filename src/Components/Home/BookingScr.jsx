// import React, {useState, useEffect, useContext, useCallback} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   Modal,
//   TextInput,
//   Alert,
// } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import axios from 'axios';
// import moment from 'moment-timezone';
// import {Skeleton} from '@rneui/themed';
// import {AuthContext} from '../../context/Authcontext';
// import {WebView} from 'react-native-webview';
// import debounce from 'lodash.debounce';

// const BookingScreen = () => {
//   const route = useRoute();
//   const {slugs, origin} = route.params;
//   const [purpose, setPurpose] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [selectedStartTime, setSelectedStartTime] = useState(null);
//   const [selectedEndTime, setSelectedEndTime] = useState(null);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [checkoutUrl, setCheckoutUrl] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const navigation = useNavigation();
//   const {userToken, createBooking} = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [rate, setRate] = useState();
//   const [timeSlotError, setTimeSlotError] = useState('');
//   const [isDoneDisabled, setIsDoneDisabled] = useState(false);
//   const [shortDescription, setShortDescription] = useState('');
//   const [amount, setAmount] = useState('');
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     fetchRate();
//     if (date) {
//       fetchAvailability();
//     }
//   }, [date]);

//   const fetchAvailability = async () => {
//     try {
//       const formattedDate = moment(date).format('YYYY-MM-DD');
//       const response = await axios.get(
//         `http://10.0.2.2:4000/api/product/availability/${slugs}?booking_date=${formattedDate}`,
//       );
//       const {product_availability} = response.data;
//       setBookedSlots(product_availability.slot_bookings);
//       generateTimeSlots();
//     } catch (error) {
//       console.error('Error fetching availability:', error);
//     }
//   };

//   const fetchRate = async () => {
//     try {
//       const response = await axios.get(
//         'http://10.0.2.2:4000/api/transactions/getrate',
//       );
//       setRate(response.data.rate);
//     } catch (error) {
//       console.error('Error fetching rate:', error);
//     }
//   };

//   // const handleBookNow = useCallback(
//   //   debounce(async () => {
//   //     if (loading) return;

//   //     const validationErrors = validateFields();

//   //     if (Object.keys(validationErrors).length > 0) {
//   //       setErrors(validationErrors);
//   //     } else {
//   //       setLoading(true);

//   //       try {
//   //         const response = await axios.post(
//   //           'http://10.0.2.2:4000/api/payments',
//   //           {
//   //             amount: amount * 100,
//   //             currency: 'ZAR',
//   //             cancelUrl: 'https://example.com/cancel',
//   //             successUrl: 'https://example.com/success',
//   //             failureUrl: 'https://example.com/failure',
//   //           },
//   //         );

//   //         if (response.data && response.data.redirectUrl) {
//   //           setCheckoutUrl(response.data.redirectUrl);
//   //           setShowPaymentModal(true);
//   //         } else {
//   //           Alert.alert('Error', 'Failed to create checkout');
//   //         }
//   //       } catch (error) {
//   //         console.error('Error creating checkout:', error);
//   //         Alert.alert('Error', 'An error occurred while creating the checkout');
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     }
//   //   }, 3000),
//   //   [
//   //     date,
//   //     purpose,
//   //     selectedStartTime,
//   //     selectedEndTime,
//   //     shortDescription,
//   //     loading,
//   //     rate,
//   //   ],
//   // );

//   const handleBookNow = useCallback(
//     debounce(async () => {
//       if (loading) return;

//       const validationErrors = validateFields();

//       if (Object.keys(validationErrors).length > 0) {
//         setErrors(validationErrors);
//       } else {
//         setLoading(true);

//         try {
//           // Perform all synchronous computations before setting loading to true
//           const amountToPay = amount * 100;
//           const payload = {
//             amount: amountToPay,
//             currency: 'ZAR',
//             cancelUrl: 'https://example.com/cancel',
//             successUrl: 'https://example.com/success',
//             failureUrl: 'https://example.com/failure',
//           };

//           const response = await axios.post(
//             'http://10.0.2.2:4000/api/payments',
//             payload,
//           );

//           if (response.data && response.data.redirectUrl) {
//             setCheckoutUrl(response.data.redirectUrl);
//             setShowPaymentModal(true);
//           } else {
//             Alert.alert('Error', 'Failed to create checkout');
//           }
//         } catch (error) {
//           console.error('Error creating checkout:', error);
//           Alert.alert('Error', 'An error occurred while creating the checkout');
//         } finally {
//           setLoading(false); // Ensure loading state is reset
//         }
//       }
//     }, 500), // Reduce debounce time to 500ms
//     [
//       date,
//       purpose,
//       selectedStartTime,
//       selectedEndTime,
//       shortDescription,
//       loading,
//       rate,
//     ],
//   );

// const calculateAmountBasedOnCurrentTime = (startTime, endTime) => {
//   if (startTime && endTime) {
//     const currentTime = moment().format('HH:mm');
//     const startMoment = moment(startTime, 'HH:mm').format('HH:mm');
//     console.log('currentTime', currentTime);
//     console.log('startMoment', startMoment);
//     // const endMoment = moment(endTime, 'HH:mm');
//     let duration;

//     if (currentTime>=startMoment) {
//       // Booking is ongoing; calculate from the current time to end time
//       duration = calculateDuration(currentTime, endTime);
//     } else {
//       // Future booking; calculate normally from start to end time
//       duration = calculateDuration(startTime, endTime);
//     }

//     // Calculate amount only if duration is positive and within limits
//     if (duration > 0 && duration <= 180) {
//       const calculatedAmount = duration  * rate; // Assuming rate is per hour
//       setAmount(calculatedAmount);
//     } else {
//       setAmount(0); // Reset amount if duration is invalid
//     }
//   } else {
//     setAmount(0); // Reset amount if times are not fully selected
//   }
// };


//  const handleStartTimeChange = startTime => {
//    setSelectedStartTime(startTime);

//    // Reset end time if it is before or the same as start time
//    if (
//      selectedEndTime &&
//      moment(startTime, 'HH:mm').isSameOrAfter(moment(selectedEndTime, 'HH:mm'))
//    ) {
//      setSelectedEndTime(null);
//    } else {
//      calculateAmountBasedOnCurrentTime(startTime, selectedEndTime);
//    }
//  };

//  const handleEndTimeChange = endTime => {
//    setSelectedEndTime(endTime);
//    calculateAmountBasedOnCurrentTime(selectedStartTime, endTime);
//  };



//  const isSlotDisabled = (slot, type) => {
//    const currentTime = moment(); // Get the current time
//    const slotTime = moment(slot, 'HH:mm'); // Convert slot string to a moment object
//    const slotEndTime = slotTime.clone().add(15, 'minutes'); // Calculate the end time of the slot

//    if (type === 'start') {
//      // Disable slots that are in the past or after the selected end time
//      return (
//        slotEndTime.isBefore(currentTime) ||
//        (selectedEndTime &&
//          slotTime.isSameOrAfter(moment(selectedEndTime, 'HH:mm')))
//      );
//    }

//    if (type === 'end') {
//      // Disable slots before or equal to the selected start time and past slots
//      return (
//        slotTime.isSameOrBefore(moment(selectedStartTime, 'HH:mm')) ||
//        slotEndTime.isBefore(currentTime)
//      );
//    }

//    return false;
//  };




//   const validateFields = () => {
//     const errors = {};
//     if (!purpose) errors.purpose = 'Purpose is required';
//     if (!selectedStartTime || !selectedEndTime) {
//       errors.timeSlots = 'Both start and end times are required';
//     } else {
//       const duration = calculateDuration(selectedStartTime, selectedEndTime);
//       if (duration > 180) {
//         errors.timeSlots = 'Maximum booking time is 3 hours';
//       }
//     }
//     return errors;
//   };

// const calculateDuration = (start, end) => {
//   const [startHours, startMinutes] = start.split(':').map(Number);
//   const [endHours, endMinutes] = end.split(':').map(Number);
//   return endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
// };


//   const onDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(Platform.OS === 'ios');
//     setDate(currentDate);
//   };

//   const showDatepicker = () => {
//     setShowDatePicker(true);
//   };

//   const generateTimeSlots = () => {
//     let startTime = 6 * 60; // 6:00 AM
//     const endTime = 24 * 60; // 12:00 AM
//     const interval = 15;
//     const slots = [];

//     while (startTime <= endTime) {
//       const hours = Math.floor(startTime / 60);
//       const minutes = startTime % 60;
//       slots.push(
//         `${hours.toString().padStart(2, '0')}:${minutes
//           .toString()
//           .padStart(2, '0')}`,
//       );
//       startTime += interval;
//     }

//     setTimeSlots(slots);
//   };

//   const handlePurposeChange = itemValue => {
//     setPurpose(itemValue);
//     if (itemValue) {
//       setErrors(prevErrors => ({...prevErrors, purpose: ''}));
//     }
//   };

//   const handleBackHome = () => {
//     navigation.goBack();
//   };

//   const handlePaymentSuccess = async navState => {
//     if (navState.url.startsWith('https://example.com/success')) {
//       const bookingDate = moment(date).startOf('day').toISOString();
//       const startTime = moment(date)
//         .set({
//           hour: parseInt(selectedStartTime.split(':')[0]),
//           minute: parseInt(selectedStartTime.split(':')[1]),
//         })
//         .toISOString();
//       const endTime = moment(date)
//         .set({
//           hour: parseInt(selectedEndTime.split(':')[0]),
//           minute: parseInt(selectedEndTime.split(':')[1]),
//         })
//         .toISOString();

//       const bookingDetails = {
//         bookingPurpose: purpose,
//         shortDescription: shortDescription, // Include the short description
//         bookingDate,
//         startTime,
//         endTime,
//         timeSlotNumber: '4',
//         status: 'Pending',
//         isBookingActive: true,
//       };

//       try {
//         const bookingResponse = await createBooking(slugs, bookingDetails);
//         if (bookingResponse.message === 'Booking created successfully') {
//           setShowPaymentModal(false);
//           navigation.navigate('QrScreen', {booking: bookingResponse.booking});
//         } else {
//           Alert.alert('Error', 'Failed to create booking');
//         }
//       } catch (error) {
//         console.error('Error creating booking:', error);
//         Alert.alert('Error', 'An error occurred while creating the booking');
//       }
//     } else if (navState.url === 'https://example.com/cancel') {
//       Alert.alert('Cancelled', 'Payment was cancelled');
//       setShowPaymentModal(false);
//     } else if (navState.url === 'https://example.com/failure') {
//       Alert.alert('Failure', 'Payment failed');
//       setShowPaymentModal(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{display: 'flex', flexDirection: 'row', gap: 70}}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.header}>Booking</Text>
//       </View>
//       {/* Purpose Dropdown */}
//       <View style={styles.dropdownContainer}>
//         <Picker
//           selectedValue={purpose}
//           style={styles.picker}
//           onValueChange={handlePurposeChange}>
//           <Picker.Item label="Select Purpose" value="" />
//           <Picker.Item label="Meeting" value="meeting" />
//           <Picker.Item label="Work" value="work" />
//           <Picker.Item label="Personal" value="personal" />
//         </Picker>
//       </View>
//       {errors.purpose && <Text style={styles.errorText}>{errors.purpose}</Text>}
//       {/* Date Picker */}
//       <TouchableOpacity
//         style={styles.dropdownContainer}
//         onPress={showDatepicker}>
//         <Text style={styles.pickerText}>{date.toDateString()}</Text>
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display="default"
//           onChange={onDateChange}
//           minimumDatgetSelectedTimeSlotsTexte={new Date()} // Disable past dates
//         />
//       )}
//       <View style={styles.directionstyle}>
//         <View style={styles.dropdownContainer2}>
//           <Picker
//             selectedValue={selectedStartTime}
//             style={styles.picker}
//             onValueChange={itemValue => {
//               if (!isSlotDisabled(itemValue, 'start')) {
//                 handleStartTimeChange(itemValue);
//               }
//             }}>
//             <Picker.Item
//               label="Start Time"
//               value={null}
//               style={styles.pickerleft}
//             />
//             {timeSlots.map(slot => (
//               <Picker.Item
//                 key={slot}
//                 label={slot}
//                 value={slot}
//                 color={isSlotDisabled(slot, 'start') ? '#ccc' : '#000'} // Gray color for disabled slots
//               />
//             ))}
//           </Picker>
//         </View>
//         <View style={styles.dropdownContainer2}>
//           <Picker
//             selectedValue={selectedEndTime}
//             style={styles.picker}
//             onValueChange={itemValue => {
//               if (!isSlotDisabled(itemValue, 'end')) {
//                 handleEndTimeChange(itemValue);
//               }
//             }}>
//             <Picker.Item
//               label="End Time"
//               value={null}
//               style={styles.pickerleft}
//             />
//             {timeSlots.map(slot => (
//               <Picker.Item
//                 key={slot}
//                 label={slot}
//                 value={slot}
//                 color={isSlotDisabled(slot, 'end') ? '#ccc' : '#000'} // Gray color for disabled slots
//               />
//             ))}
//           </Picker>
//         </View>
//       </View>
//       {errors.timeSlots && (
//         <Text style={styles.errorText}>{errors.timeSlots}</Text>
//       )}
//       {/* Short Description Input */}
//       <TextInput
//         style={[styles.input, {color: '#000', fontSize: 15}]} // Apply color and fontWeight for the input text
//         placeholder="Enter the short description (Optional)"
//         placeholderTextColor="#000" // Set placeholder color to black
//         value={shortDescription}
//         onChangeText={setShortDescription}
//       />

//       {/* Amount Display and Skeleton */}
//       {selectedStartTime && selectedEndTime ? (
//         <>
//           <Text style={styles.amountText}>Amount: {amount} ZAR</Text>
//           <Text style={styles.amountText2}>
//             this is based on your per minute price which is {rate} zar/min
//           </Text>
//         </>
//       ) : (
//         <Skeleton style={styles.skeleton} />
//       )}
//       {/* Book Now Button */}
//       <TouchableOpacity
//         style={styles.bookNowButton}
//         onPress={handleBookNow}
//         disabled={loading} // Disable button during loading
//       >
//         <Text style={styles.bookNowButtonText}>
//           {loading ? 'Processing...' : 'Proceed to Pay'}
//         </Text>
//       </TouchableOpacity>
//       {/* Payment Modal */}
//       <Modal
//         visible={showPaymentModal}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => setShowPaymentModal(false)}>
//         <WebView
//           source={{uri: checkoutUrl}}
//           style={{flex: 1}}
//           onLoadEnd={({nativeEvent}) => {
//             const {url} = nativeEvent;
//             // Only trigger the success handler if the URL matches the success URL
//             if (url === 'https://example.com/success') {
//               handlePaymentSuccess({url});
//             }
//           }}
//         />
//       </Modal>
//     </View>
//   );
// };

// const paddingValue = Platform.OS === 'ios' ? 28 : 10;
// const paddingTopValue = Platform.OS === 'ios' ? 50 : 2;
// const styles = StyleSheet.create({
//   backButton: {
//     padding: paddingValue,
//     paddingTop: paddingTopValue,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   header: {
//     color: '#000',
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   dropdownContainer: {
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     height: 50,
//   },
//   dropdownContainer2: {
//     width: '47%',
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     height: 50,
//   },
//   directionstyle: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   input: {
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     color: '#000',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 25,
//     height: 50,
//   },
//   picker: {
//     flex: 2,
//     height: 50,
//     color: '#000',
//   },
//   pickerleft: {
//     paddingHorizontal: 25,
//   },
//   pickerText: {
//     flex: 1,
//     height: 50,
//     lineHeight: 50,
//     color: '#000',
//     fontSize: 15,
//     paddingLeft: 16,
//   },
//   amountText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#000',
//   },
//   amountText2: {
//     fontSize: 14,
//     marginBottom: 10,
//     color: '#000',
//   },
//   bookNowButton: {
//     backgroundColor: '#FF1200',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   bookNowButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   skeleton: {
//     width: '100%',
//     height: 20,
//     borderRadius: 5,
//     marginVertical: 10,
//   },
// });

// export default BookingScreen;

import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment-timezone';
import {Skeleton} from '@rneui/themed';
import {AuthContext} from '../../context/Authcontext';
import {WebView} from 'react-native-webview';
import debounce from 'lodash.debounce';

const BookingScreen = () => {
  const route = useRoute();
  const {slugs, origin} = route.params;
  const [purpose, setPurpose] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectingEndTime, setSelectingEndTime] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigation = useNavigation();
  const {userToken, createBooking} = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // Add loading state
  const [rate, setRate] = useState();
  const [timeSlotError, setTimeSlotError] = useState('');
  const [isDoneDisabled, setIsDoneDisabled] = useState(false);
  const [shortDescription, setShortDescription] = useState('');
  const [amount, setAmount] = useState('');
  useEffect(() => {
    fetchRate();
    if (date) {
      fetchAvailability();
    }
  }, [date]);

  const fetchAvailability = async () => {
    try {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const response = await axios.get(
        `http://10.0.2.2:4000/api/product/availability/${slugs}?booking_date=${formattedDate}`,
      );
      const {product_availability} = response.data;
      setBookedSlots(product_availability.slot_bookings);
      generateTimeSlots();
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };
  const fetchRate = async () => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:4000/api/transactions/getrate',
      );
      setRate(response.data.rate);
    } catch (error) {
      console.error('Error fetching rate:', error);
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!purpose) errors.purpose = 'Purpose is required';
    if (selectedTimeSlots.length === 0) {
      errors.timeSlots = 'Time slot is required';
    } else {
      const startTime = selectedTimeSlots[0];
      const endTime = selectedTimeSlots[selectedTimeSlots.length - 1];
      const duration = calculateDuration(startTime, endTime);
      if (duration > 180) {
        errors.timeSlots = 'Maximum booking time is 3 hours';
      }
    }
    return errors;
  };
  const handleBookNow = useCallback(
    debounce(async () => {
      if (loading) return;

      const validationErrors = validateFields();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        setLoading(true);

        try {
          const response = await axios.post(
            'http://10.0.2.2:4000/api/payments',
            {
              amount: amount * 100,
              currency: 'ZAR',
              cancelUrl: 'https://example.com/cancel',
              successUrl: 'https://example.com/success',
              failureUrl: 'https://example.com/failure',
            },
          );

          if (response.data && response.data.redirectUrl) {
            setCheckoutUrl(response.data.redirectUrl);
            setShowPaymentModal(true);
          } else {
            Alert.alert('Error', 'Failed to create checkout');
          }
        } catch (error) {
          console.error('Error creating checkout:', error);
          Alert.alert('Error', 'An error occurred while creating the checkout');
        } finally {
          setLoading(false);
        }
      }
    }, 3000),
    [date, purpose, selectedTimeSlots, shortDescription, loading, rate],
  );
  const newAmount = amount;
  // console.log('amountnew', newAmount);
  const calculateDuration = (start, end) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    return endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const generateTimeSlots = () => {
    let startTime = 6 * 60; // 6:00 AM
    const endTime = 24 * 60; // 12:00 AM
    const interval = 15;
    const slots = [];

    while (startTime <= endTime) {
      const hours = Math.floor(startTime / 60);
      const minutes = startTime % 60;
      slots.push(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`,
      );
      startTime += interval;
    }

    setTimeSlots(slots);
  };

  // const handleTimeSlotPress = (slot) => {
  //   let newSelectedSlots = [...selectedTimeSlots];

  //   if (newSelectedSlots.includes(slot)) {
  //     const index = newSelectedSlots.indexOf(slot);
  //     newSelectedSlots.splice(index, 1);
  //     if (selectingEndTime && index === newSelectedSlots.length) {
  //       setSelectingEndTime(false);
  //     }
  //   } else {
  //     if (selectingEndTime) {
  //       if (newSelectedSlots.length === 1) {
  //         newSelectedSlots.push(slot);
  //       } else {
  //         newSelectedSlots[newSelectedSlots.length - 1] = slot;
  //       }
  //       const startSlotIndex = timeSlots.indexOf(newSelectedSlots[0]);
  //       const endSlotIndex = timeSlots.indexOf(
  //         newSelectedSlots[newSelectedSlots.length - 1]
  //       );
  //       newSelectedSlots = timeSlots.slice(startSlotIndex, endSlotIndex + 1);
  //     } else {
  //       newSelectedSlots.length = 0;
  //       newSelectedSlots.push(slot);
  //       setSelectingEndTime(true);
  //     }
  //   }

  //   setSelectedTimeSlots(newSelectedSlots);
  //   validateTimeSlots(newSelectedSlots); // Call validation function
  // };

  // Update handleTimeSlotPress function
  const handleTimeSlotPress = slot => {
    let newSelectedSlots = [...selectedTimeSlots];

    if (newSelectedSlots.includes(slot)) {
      const index = newSelectedSlots.indexOf(slot);
      newSelectedSlots.splice(index, 1);
      if (selectingEndTime && index === newSelectedSlots.length) {
        setSelectingEndTime(false);
      }
    } else {
      if (selectingEndTime) {
        if (newSelectedSlots.length === 1) {
          newSelectedSlots.push(slot);
        } else {
          newSelectedSlots[newSelectedSlots.length - 1] = slot;
        }
        const startSlotIndex = timeSlots.indexOf(newSelectedSlots[0]);
        const endSlotIndex = timeSlots.indexOf(
          newSelectedSlots[newSelectedSlots.length - 1],
        );
        newSelectedSlots = timeSlots.slice(startSlotIndex, endSlotIndex + 1);
      } else {
        newSelectedSlots.length = 0;
        newSelectedSlots.push(slot);
        setSelectingEndTime(true);
      }
    }

    setSelectedTimeSlots(newSelectedSlots);
    validateTimeSlots(newSelectedSlots); // Call validation function

    // Calculate the amount based on the current time and selected time slots
    if (newSelectedSlots.length > 0) {
      const currentTime = moment().format('HH:mm');
      let duration;

      if (currentTime >= newSelectedSlots[0]) {
        duration = calculateDuration(
          currentTime,
          newSelectedSlots[newSelectedSlots.length - 1],
        );
      } else {
        duration = calculateDuration(
          newSelectedSlots[0],
          newSelectedSlots[newSelectedSlots.length - 1],
        );
      }

      const calculatedAmount = duration * rate;
      setAmount(calculatedAmount);
    } else {
      setAmount(0); // Reset amount if no slots are selected
    }
  };

  const validateTimeSlots = slots => {
    if (slots.length > 0) {
      const startTime = slots[0];
      const endTime = slots[slots.length - 1];
      const duration = calculateDuration(startTime, endTime);

      if (duration <= 0) {
        setIsDoneDisabled(true);
      } else if (duration > 180) {
        setTimeSlotError('Maximum booking time is 3 hours.');
        setIsDoneDisabled(true);
      } else {
        setTimeSlotError('');
        setIsDoneDisabled(false);
      }
    } else {
      setTimeSlotError('');
      setIsDoneDisabled(true);
    }
  };

  // const renderTimeSlot = ({item, index}) => {
  //   const currentTime = moment();
  //   const slotTime = moment(date).set({
  //     hour: parseInt(item.split(':')[0]),
  //     minute: parseInt(item.split(':')[1]),
  //   });

  //   // Check if the slot is in the past or currently active
  //   const nextSlotTime = slotTime.clone().add(15, 'minutes');
  //   const isPast = currentTime.isAfter(nextSlotTime) || currentTime.isSame(nextSlotTime);

  //   // Check if the slot is booked based on the updated state
  //   const isBooked = bookedSlots[index];

  //   return (
  //     <TouchableOpacity
  //       style={[
  //         styles.timeSlot,
  //         selectedTimeSlots.includes(item) && styles.selectedTimeSlot,
  //         (isBooked || isPast) && styles.bookedTimeSlot,
  //       ]}
  //       onPress={() => !isBooked && !isPast && handleTimeSlotPress(item)}
  //       disabled={isBooked || isPast} // Disable slot if booked or past
  //     >
  //       <Text
  //         style={[
  //           styles.timeSlotText,
  //           selectedTimeSlots.includes(item) && styles.selectedTimeSlotText,
  //           (isBooked || isPast) && styles.bookedTimeSlotText,
  //         ]}>
  //         {item}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };

  const renderTimeSlot = ({item, index}) => {
    const currentTime = moment(); // Get the current time
    const slotTime = moment(date).set({
      hour: parseInt(item.split(':')[0]),
      minute: parseInt(item.split(':')[1]),
    });

    // Calculate the end time of the slot
    const slotEndTime = slotTime.clone().add(15, 'minutes');

    // Check if the slot is in the past or currently active
    const isPast = currentTime.isSameOrAfter(slotEndTime);

    // Check if the slot is booked based on the updated state
    const isBooked = bookedSlots[index];

    return (
      <TouchableOpacity
        style={[
          styles.timeSlot,
          selectedTimeSlots.includes(item) && styles.selectedTimeSlot,
          (isBooked || isPast) && styles.bookedTimeSlot,
        ]}
        onPress={() => !isBooked && !isPast && handleTimeSlotPress(item)}
        disabled={isBooked || isPast} // Disable slot if booked or past
      >
        <Text
          style={[
            styles.timeSlotText,
            selectedTimeSlots.includes(item) && styles.selectedTimeSlotText,
            (isBooked || isPast) && styles.bookedTimeSlotText,
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const getSelectedTimeSlotsText = () => {
    if (selectedTimeSlots.length === 0) {
      return 'Select an Available Time Slot';
    }
    return `${selectedTimeSlots[0]} - ${
      selectedTimeSlots[selectedTimeSlots.length - 1]
    }`;
  };

  const handlePurposeChange = itemValue => {
    setPurpose(itemValue);
    if (itemValue) {
      setErrors(prevErrors => ({...prevErrors, purpose: ''}));
    }
  };

  const handleBackHome = () => {
    navigation.goBack();
  };

  const handlePaymentSuccess = async navState => {
    if (navState.url.startsWith('https://example.com/success')) {
      const bookingDate = moment(date).startOf('day').toISOString();
      const startTime = moment(date)
        .set({
          hour: parseInt(selectedTimeSlots[0].split(':')[0]),
          minute: parseInt(selectedTimeSlots[0].split(':')[1]),
        })
        .toISOString();
      const endTime = moment(date)
        .set({
          hour: parseInt(
            selectedTimeSlots[selectedTimeSlots.length - 1].split(':')[0],
          ),
          minute: parseInt(
            selectedTimeSlots[selectedTimeSlots.length - 1].split(':')[1],
          ),
        })
        .toISOString();

      const bookingDetails = {
        bookingPurpose: purpose,
        shortDescription: shortDescription, // Include the short description
        bookingDate,
        startTime,
        endTime,
        timeSlotNumber: '4',
        status: 'Pending',
        isBookingActive: true,
      };

      try {
        const bookingResponse = await createBooking(slugs, bookingDetails);
        if (bookingResponse.message === 'Booking created successfully') {
          setShowPaymentModal(false);
          navigation.navigate('QrScreen', {booking: bookingResponse.booking});
        } else {
          Alert.alert('Error', 'Failed to create booking');
        }
      } catch (error) {
        console.error('Error creating booking:', error);
        Alert.alert('Error', 'An error occurred while creating the booking');
      }
    } else if (navState.url === 'https://example.com/cancel') {
      Alert.alert('Cancelled', 'Payment was cancelled');
      setShowPaymentModal(false);
    } else if (navState.url === 'https://example.com/failure') {
      Alert.alert('Failure', 'Payment failed');
      setShowPaymentModal(false);
    }
  };

  // const duration =
  //   selectedTimeSlots.length > 0
  //     ? calculateDuration(
  //         selectedTimeSlots[0],
  //         selectedTimeSlots[selectedTimeSlots.length - 1]
  //       )
  //     : 0;
  // const amount = duration * rate;

  // Use handleSubmit on your button
  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 70}}>
        <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
          <Icon name={'arrow-back'} size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.header}>Booking</Text>
      </View>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={purpose}
          style={styles.picker}
          onValueChange={handlePurposeChange}>
          <Picker.Item label="Select Purpose" value="" />
          <Picker.Item label="Meeting" value="meeting" />
          <Picker.Item label="Work" value="work" />
          <Picker.Item label="Personal" value="personal" />
        </Picker>
      </View>
      {errors.purpose && <Text style={styles.errorText}>{errors.purpose}</Text>}

      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={showDatepicker}>
        <Text style={styles.pickerText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()} // Disable past dates
        />
      )}

      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={() => setShowTimeSlots(true)}>
        <Text style={styles.pickerText}>{getSelectedTimeSlotsText()}</Text>
      </TouchableOpacity>
      {errors.timeSlots && (
        <Text style={styles.errorText}>{errors.timeSlots}</Text>
      )}

      <Modal
        visible={showTimeSlots}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTimeSlots(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Time Slots</Text>
            {timeSlotError ? (
              <Text style={styles.errorText}>{timeSlotError}</Text>
            ) : null}
            <FlatList
              data={timeSlots}
              keyExtractor={item => item}
              numColumns={4}
              renderItem={renderTimeSlot}
            />
            <TouchableOpacity
              style={[
                styles.modalCloseButton,
                isDoneDisabled && styles.disabledButton,
              ]}
              onPress={() => setShowTimeSlots(false)}
              disabled={isDoneDisabled}>
              <Text style={styles.modalCloseButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="Enter the short description (Optional)"
        value={shortDescription}
        onChangeText={setShortDescription}
      />

      {selectedTimeSlots.length > 0 ? (
        <>
          <Text style={styles.amountText}>Amount: {newAmount} ZAR</Text>
        </>
      ) : (
        <Skeleton style={styles.skeleton} />
      )}
      <TouchableOpacity
        style={styles.bookNowButton}
        onPress={handleBookNow}
        disabled={loading} // Disable button during loading
      >
        <Text style={styles.bookNowButtonText}>
          {loading ? 'Processing...' : 'Proceed to Pay'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowPaymentModal(false)}>
        <WebView
          source={{uri: checkoutUrl}}
          style={{flex: 1}}
          onLoadEnd={({nativeEvent}) => {
            const {url} = nativeEvent;
            // Only trigger the success handler if the URL matches the success URL
            if (url === 'https://example.com/success') {
              handlePaymentSuccess({url});
            }
          }}
          // onError={syntheticEvent => {
          //   const {nativeEvent} = syntheticEvent;
          //   console.warn('WebView error:', nativeEvent);
          //   Alert.alert(
          //     'Error',
          //     `Failed to load page: ${nativeEvent.description}`,
          //   );
          // }}
          // onHttpError={syntheticEvent => {
          //   const {nativeEvent} = syntheticEvent;
          //   console.warn('WebView HTTP error:', nativeEvent);
          //   Alert.alert('HTTP error', `Status code: ${nativeEvent.statusCode}`);
          // }}
        />
      </Modal>
    </View>
  );
};

const paddingValue = Platform.OS === 'ios' ? 28 : 10;
const paddingTopValue = Platform.OS === 'ios' ? 50 : 2;
const styles = StyleSheet.create({
  backButton: {
    padding: paddingValue,
    paddingTop: paddingTopValue,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  header: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
  },
  picker: {
    flex: 1,
    height: 50,
    color: '#000',
  },
  pickerText: {
    flex: 1,
    height: 50,
    lineHeight: 50,
    color: '#000',
    fontSize: 15,
    paddingLeft: 16,
  },
  timeSlot: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '22%', // Adjust to fit 4 columns
  },
  selectedTimeSlot: {
    backgroundColor: '#FF1200',
    borderColor: '#FF1200',
  },
  bookedTimeSlot: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  timeSlotText: {
    color: '#000',
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  bookedTimeSlotText: {
    color: '#999',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  bookNowButton: {
    backgroundColor: '#FF1200',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  bookNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '95%',
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  skeleton: {
    width: '100%',
    height: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  modalCloseButton: {
    backgroundColor: '#FF1200',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default BookingScreen;
