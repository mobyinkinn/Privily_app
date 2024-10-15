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
import moment, { duration } from 'moment-timezone';
import {Skeleton} from '@rneui/themed';
import {AuthContext} from '../../context/Authcontext';
import {WebView} from 'react-native-webview';
import debounce from 'lodash.debounce';

const BookingScreen = () => {
  const route = useRoute();
  const {slugs,title, origin} = route.params;
  const [purpose, setPurpose] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showendTime, setshowendTime] = useState(false);
  const [showStarttime, setshowStarttime] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectingEndTime, setSelectingEndTime] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigation = useNavigation();
  const {userToken, createBooking, fetchBookings} = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // Add loading state
  const [rate, setRate] = useState();
  const [timeSlotError, setTimeSlotError] = useState('');
  const [isDoneDisabled, setIsDoneDisabled] = useState(false);
  const [bookingDatee, setBookingDate] = useState("");
  const [isStartDoneDisabled, setIsStartDoneDisabled] = useState(true);
  const [isEndDoneDisabled, setIsEndDoneDisabled] = useState(false);
  const [shortDescription, setShortDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [bookings, setBookings] = useState([]); // State for user's bookings
  useEffect(() => {
    fetchRate();
    if (date) {
      fetchAvailability();
    }
  }, [date]);

  const fetchAvailability = async () => {
    try {
      const formattedDate = moment(date)
        .tz('Africa/Johannesburg')
        .format('YYYY-MM-DD');
      // const formattedDate = moment(date).format('YYYY-MM-DD');
      setBookingDate(formattedDate);
      console.log("format date", formattedDate)
      const response = await axios.get(
        `http://10.0.2.2:4000/api/product/availability/${slugs}?booking_date=${formattedDate}`,
      );
      console.log('response', response.data);
      const {product_availability} = response.data;
      setBookedSlots(product_availability.slot_bookings);
      generateTimeSlots();
      // console.log('bookedSlots', bookedSlots);
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
  // const handleBookNow = useCallback(
  //   debounce(async () => {
  //     if (loading) return;

  //     const validationErrors = validateFields();

  //     if (Object.keys(validationErrors).length > 0) {
  //       setErrors(validationErrors);
  //     } else {
  //       setLoading(true);

  //       try {
  //         const response = await axios.post(
  //           'http://10.0.2.2:4000/api/payments',
  //           {
  //             amount: amount * 100,
  //             currency: 'ZAR',
  //             cancelUrl: 'https://example.com/cancel',
  //             successUrl: 'https://example.com/success',
  //             failureUrl: 'https://example.com/failure',
  //           },
  //         );

  //         if (response.data && response.data.redirectUrl) {
  //           setCheckoutUrl(response.data.redirectUrl);
  //           setShowPaymentModal(true);
  //         } else {
  //           Alert.alert('Error', 'Failed to create checkout');
  //         }
  //       } catch (error) {
  //         console.error('Error creating checkout:', error);
  //         Alert.alert('Error', 'An error occurred while creating the checkout');
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   }, 3000),
  //   [date, purpose, selectedTimeSlots, shortDescription, loading, rate],
  // );



  const handleBookNow = async () => {
    if (loading) return;

    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);

      try {
        const response = await axios.post('http://10.0.2.2:4000/api/payments', {
          amount: amount * 100,
          currency: 'ZAR',
          cancelUrl: 'https://example.com/cancel',
          successUrl: 'https://example.com/success',
          failureUrl: 'https://example.com/failure',
        });

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
  };

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
    setSelectedTimeSlots([]);
    setAmount("")
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
 
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const bookingsData = await fetchBookings(); // Fetch user's bookings
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    loadBookings();
  }, [userToken]);
  // const handleTimeSlotPress = slot => {
  //   let newSelectedSlots = [...selectedTimeSlots];

  //   if (newSelectedSlots.includes(slot)) {
  //     const index = newSelectedSlots.indexOf(slot);
  //     newSelectedSlots.splice(index, 1);
  //   } else {
  //     if (selectingEndTime) {
  //       newSelectedSlots.push(slot);
  //       const startSlotIndex = timeSlots.indexOf(newSelectedSlots[0]);
  //       const endSlotIndex = timeSlots.indexOf(
  //         newSelectedSlots[newSelectedSlots.length - 1],
  //       );
  //       newSelectedSlots = timeSlots.slice(startSlotIndex, endSlotIndex + 1);
  //     } else {
  //       newSelectedSlots.length = 0;
  //       newSelectedSlots.push(slot);
  //     }
  //   }

  //   setSelectedTimeSlots(newSelectedSlots);
  //   validateTimeSlots(newSelectedSlots); // Call validation function

  //   // Calculate the amount based on the current time and selected time slots
  //   if (newSelectedSlots.length > 0) {
  //     const currentTime = moment().format('HH:mm');
  //     let duration;

  //     if (currentTime >= newSelectedSlots[0]) {
  //       duration = calculateDuration(
  //         currentTime,
  //         newSelectedSlots[newSelectedSlots.length - 1],
  //       );
  //     } else {
  //       duration = calculateDuration(
  //         newSelectedSlots[0],
  //         newSelectedSlots[newSelectedSlots.length - 1],
  //       );
  //     }

  //     const calculatedAmount = duration * rate;
  //     setAmount(calculatedAmount);
  //   } else {
  //     setAmount(0); // Reset amount if no slots are selected
  //   }
  // };
  
  const handleTimeSlotPress = slot => {
    let newSelectedSlots = [...selectedTimeSlots];

    if (newSelectedSlots.includes(slot)) {
      const index = newSelectedSlots.indexOf(slot);
      newSelectedSlots.splice(index, 1);
    } else {
      if (selectingEndTime) {
        newSelectedSlots.push(slot);
        const startSlotIndex = timeSlots.indexOf(newSelectedSlots[0]);
        const endSlotIndex = timeSlots.indexOf(
          newSelectedSlots[newSelectedSlots.length - 1],
        );
        newSelectedSlots = timeSlots.slice(startSlotIndex, endSlotIndex + 1);
      } else {
        newSelectedSlots.length = 0;
        newSelectedSlots.push(slot);
      }
    }

    setSelectedTimeSlots(newSelectedSlots);
    validateTimeSlots(newSelectedSlots);

    // Calculate the amount with or without discount based on bookings array length
    if (newSelectedSlots.length > 0) {
      const currentTime = moment().format('HH:mm');
      const currentDate = moment().format('YYYY-MM-DD')
      let duration;
      if(currentDate === bookingDatee){

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
      }}else{
        duration = calculateDuration(
          newSelectedSlots[0],
          newSelectedSlots[newSelectedSlots.length - 1],
        );
      }

      let calculatedAmount = duration * rate;
      // Apply discount if no bookings
      if (bookings.length === 0) {
        calculatedAmount = Math.max(calculatedAmount - 150, 0); // Apply ZAR 150 discount
      }

      setAmount(calculatedAmount);
    } else {
      setAmount(0); // Reset amount if no slots are selected
    }
  };
  const selectEndTime = () => {
    setshowendTime(false);
    setSelectingEndTime(true);
  };

  const validateTimeSlots = slots => {
    if (slots.length > 0) {
      const startTime = slots[0];
      const endTime = slots[slots.length - 1];
      const duration = calculateDuration(startTime, endTime);
      console.log(selectedTimeSlots.length);

      if (selectedTimeSlots.length >= 0) {
        setIsStartDoneDisabled(false);
      } else {
        setIsStartDoneDisabled(true);
      }

      if (selectedTimeSlots.length > 0) {
        setIsEndDoneDisabled(false);
      } else {
        setIsEndDoneDisabled(true);
      }

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

  // const renderStartTimeSlot = ({item, index}) => {
  //   const currentTime = moment(); // Get the current time
  //   const slotTime = moment(date).set({
  //     hour: parseInt(item.split(':')[0]),
  //     minute: parseInt(item.split(':')[1]),
  //   });

  //   // Calculate the end time of the slot
  //   const slotEndTime = slotTime.clone().add(15, 'minutes');

  //   // Check if the slot is in the past or currently active
  //   const isPast = currentTime.isSameOrAfter(slotEndTime);

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

  // const renderTimeSlot = ({item, index}) => {
  //   const currentTime = moment(); // Get the current time
  //   const slotTime = moment(date).set({
  //     hour: parseInt(item.split(':')[0]),
  //     minute: parseInt(item.split(':')[1]),
  //   });

  //   // Calculate the end time of the slot
  //   const slotEndTime = slotTime.clone().add(15, 'minutes');

  //   // Check if the slot is in the past or currently active
  //   const isPast = currentTime.isSameOrAfter(slotEndTime);

  //   // Check if the slot is booked based on the updated state
  //   let isBooked = bookedSlots[index];
  //   // if (selectingEndTime) {
  //   //   isBooked = [...isBooked, selectedTimeSlots[0]];
  //   // }

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

  // For rendering start time slots
  
  const renderStartTimeSlot = ({item, index}) => {
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
    const isBooked = bookedSlots[index]; // Check if the slot is booked

    return (
      <TouchableOpacity
        style={[
          styles.timeSlot,
          selectedTimeSlots.includes(item) && styles.selectedTimeSlot,
          (isBooked || isPast) && styles.bookedTimeSlot, // Disable booked and past slots
        ]}
        onPress={() => !isBooked && !isPast && handleTimeSlotPress(item)}
        disabled={isBooked || isPast} // Disable slot if booked or in the past
      >
        <Text
          style={[
            styles.timeSlotText,
            selectedTimeSlots.includes(item) && styles.selectedTimeSlotText,
            (isBooked || isPast) && styles.bookedTimeSlotText, // Change text color for disabled slots
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  // For rendering end time slots
  // const renderTimeSlot = ({item, index}) => {
  //   const startTimeIndex = timeSlots.indexOf(selectedTimeSlots[0]); // Index of the selected start time

  //   // Disable time slots before the selected start time but allow the selected start time
  //   const isBeforeStartTime =
  //     index <= startTimeIndex && item !== selectedTimeSlots[0];

  //   return (
  //     <TouchableOpacity
  //       style={[
  //         styles.timeSlot,
  //         selectedTimeSlots.includes(item) && styles.selectedTimeSlot,
  //         isBeforeStartTime && styles.bookedTimeSlot, // Disable slots before the start time
  //       ]}
  //       onPress={() => !isBeforeStartTime && handleTimeSlotPress(item)}
  //       disabled={isBeforeStartTime} // Disable slots before start time but enable start time itself
  //     >
  //       <Text
  //         style={[
  //           styles.timeSlotText,
  //           selectedTimeSlots.includes(item) && styles.selectedTimeSlotText,
  //           isBeforeStartTime && styles.bookedTimeSlotText, // Change text color for disabled slots
  //         ]}>
  //         {item}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };
  const rotateArray = (array, times) => {
    const len = array.length;
    return [...array.slice(times, len), ...array.slice(0, times)];
  };
const renderTimeSlot = ({ item, index }) => {
  const startTimeIndex = timeSlots.indexOf(selectedTimeSlots[0]); // Index of the selected start time

  const rotatedBookedSlots = rotateArray(bookedSlots, 70);
  // console.log("before rotation", bookedSlots);
  // console.log("after", rotatedBookedSlots);

  const isNextSlotBooked = rotatedBookedSlots[index + 1]; // Check if the next slot is booked

  const isBeforeStartTime = index <= startTimeIndex && item !== selectedTimeSlots[0];

  const isSlotUnavailable = isNextSlotBooked; // This ensures that the next slot is booked

  const isDisabled = isBeforeStartTime || isSlotUnavailable;

  return (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        selectedTimeSlots.includes(item) && styles.selectedTimeSlot,
        isDisabled && styles.bookedTimeSlot, // Disable the slot if needed
      ]}
      onPress={() => !isDisabled && handleTimeSlotPress(item)}
      disabled={isDisabled} // Disable slot if it's booked or if the next slot is booked
    >
      <Text
        style={[
          styles.timeSlotText,
          selectedTimeSlots.includes(item) && styles.selectedTimeSlotText,
          isDisabled && styles.bookedTimeSlotText, // Change text color for disabled slots
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};

// const renderTimeSlot = ({item, index}) => {
//   const startTimeIndex = timeSlots.indexOf(selectedTimeSlots[0]); // Index of the selected start time
//   const nextBookedSlotIndex = bookedSlots.findIndex(
//     (booked, i) => i > startTimeIndex && booked,
//   ); // Find the next booked slot after the start time

//   // Disable time slots before the selected start time and also limit up to the next booked time
//   const isBeforeStartTime =
//     index <= startTimeIndex && item !== selectedTimeSlots[0];
//   const isBeyondNextBookedSlot =
//     nextBookedSlotIndex !== -1 && index >= nextBookedSlotIndex; // Disable slots after the next booked slot

//   const isDisabled = isBeforeStartTime || isBeyondNextBookedSlot;

//   return (
//     <TouchableOpacity
//       style={[
//         styles.timeSlot,
//         selectedTimeSlots.includes(item) && styles.selectedTimeSlot,
//         isDisabled && styles.bookedTimeSlot, // Disable slots that exceed the rules
//       ]}
//       onPress={() => !isDisabled && handleTimeSlotPress(item)}
//       disabled={isDisabled} // Disable slots before start time or beyond next booked time
//     >
//       <Text
//         style={[
//           styles.timeSlotText,
//           selectedTimeSlots.includes(item) && styles.selectedTimeSlotText,
//           isDisabled && styles.bookedTimeSlotText, // Style for disabled slots
//         ]}>
//         {item}
//       </Text>
//     </TouchableOpacity>
//   );
// };
// const renderTimeSlot = ({item, index}) => {
//   const startTimeIndex = timeSlots.indexOf(selectedTimeSlots[0]); // Index of the selected start time

//   // Rotate the bookedSlots array for the end time modal
//   const rotatedBookedSlots = rotateArray(bookedSlots, startTimeIndex);

//   // Disable time slots before the selected start time and also limit up to the next booked time
//   const isBeforeStartTime =
//     index <= startTimeIndex && item !== selectedTimeSlots[0];

//   const isBooked = rotatedBookedSlots[index]; // Use the rotated booked slots array
//   const isBeyondNextBookedSlot = isBooked; // You can define the condition as per your requirements

//   const isDisabled = isBeforeStartTime || isBooked;

//   return (
//     <TouchableOpacity
//       style={[
//         styles.timeSlot,
//         selectedTimeSlots.includes(item) && styles.selectedTimeSlot,
//         isDisabled && styles.bookedTimeSlot, // Disable slots that exceed the rules
//       ]}
//       onPress={() => !isDisabled && handleTimeSlotPress(item)}
//       disabled={isDisabled} // Disable slots before start time or beyond next booked time
//     >
//       <Text
//         style={[
//           styles.timeSlotText,
//           selectedTimeSlots.includes(item) && styles.selectedTimeSlotText,
//           isDisabled && styles.bookedTimeSlotText, // Style for disabled slots
//         ]}>
//         {item}
//       </Text>
//     </TouchableOpacity>
//   );
// };

  const getStartSelectedTimeSlotsText = str => {
    if (selectedTimeSlots.length === 0) {
      return str;
    }
    return `${selectedTimeSlots[0]}`;
  };

  const getEndSelectedTimeSlotsText = str => {
    if (selectedTimeSlots.length < 2) {
      return str;
    }
    return `${selectedTimeSlots[selectedTimeSlots.length - 1]}`;
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
      let startTime = moment(date)
        .set({
          hour: parseInt(selectedTimeSlots[0].split(':')[0]),
          minute: parseInt(selectedTimeSlots[0].split(':')[1]),
        })
        .add(2, "hours")
        .toISOString();

        console.log("Start time", startTime)
      let endTime = moment(date)
        .set({
          hour: parseInt(
            selectedTimeSlots[selectedTimeSlots.length - 1].split(':')[0],
          ),
          minute: parseInt(
            selectedTimeSlots[selectedTimeSlots.length - 1].split(':')[1],
          ),
        })
        .add(2, 'hours')
        .toISOString();
 console.log('end time', title);
      const bookingDetails = {
        bookingPurpose: purpose,
        shortDescription: shortDescription, // Include the short description
        bookingDatee,
        startTime,
        endTime,
        timeSlotNumber: '4',
        status: 'Pending',
        isBookingActive: true,
      };
      console.log('bookingDetails', bookingDetails);

      try {
        const bookingResponse = await createBooking(slugs, bookingDetails);
        if (bookingResponse.message === 'Booking created successfully') {
          console.log('bookingResponse', bookingResponse);
          setShowPaymentModal(false);
          navigation.navigate('QrScreen', {
            booking: bookingResponse.booking,
            title,
          });
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
      <View style={styles.directionstyle}>
        <TouchableOpacity
          style={styles.dropdownContainer2}
          onPress={() => setshowStarttime(true)}>
          <Text style={styles.pickerText}>
            {getStartSelectedTimeSlotsText('Start time')}
          </Text>
        </TouchableOpacity>
        {errors.timeSlots && (
          <Text style={styles.errorText}>{errors.timeSlots}</Text>
        )}
        <TouchableOpacity
          style={styles.dropdownContainer2}
          onPress={() => setshowendTime(true)}>
          <Text style={styles.pickerText}>
            {getEndSelectedTimeSlotsText('End time')}
          </Text>
        </TouchableOpacity>
        {errors.timeSlots && (
          <Text style={styles.errorText}>{errors.timeSlots}</Text>
        )}
      </View>
      <Modal
        visible={showStarttime}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setshowStarttime(false)}>
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
              renderItem={renderStartTimeSlot}
            />
            <TouchableOpacity
              style={[
                styles.modalCloseButton,
                isStartDoneDisabled && styles.disabledButton,
              ]}
              onPress={() => {
                setshowStarttime(false);
                setSelectingEndTime(true);
              }}
              disabled={isStartDoneDisabled}>
              <Text style={styles.modalCloseButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showendTime}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setshowendTime(false)}>
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
                isEndDoneDisabled && styles.disabledButton,
              ]}
              onPress={() => setshowendTime(false)}
              disabled={isEndDoneDisabled}>
              <Text style={styles.modalCloseButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.input}
        placeholder="Tell us a little about your work"
        value={shortDescription}
        onChangeText={setShortDescription}
        placeholderTextColor="#000"
      />

      {newAmount > 0 ? (
        <>
          <Text style={styles.amountText}>Amount: {newAmount} ZAR</Text>
          {bookings.length > 0 ? (
            <Text>
              This rate is based on {rate} ZAR per minute. Your total price is{' '}
              {(newAmount / rate) * rate} ZAR.
            </Text>
          ) : (
            <Text style={{color: '#000'}}>
              You are enjoying the first 15 minutes for free. This rate is based
              on {rate} ZAR per minute. Your total price is{' '}
              {(newAmount / rate) * rate} ZAR.
            </Text>
          )}
        </>
      ) : (
        <>
          {/* <Skeleton style={{height: 50, borderRadius: 5}} /> */}
          <View style={styles.container2}>
            <Skeleton style={styles.skeleton} />
            <Text style={styles.text}>Prices will be shown here</Text>
          </View>
        </>
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
  container2: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  skeleton: {
    height: 50,
    width: '100%',
    borderRadius: 5,
  },
  text: {
    position: 'absolute',
    color: 'white', // Or any other color for contrast
    fontWeight: 'bold',
    fontSize: 16,
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
  dropdownContainer2: {
    width: '47%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingLeft: 11,
  },
  directionstyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingHorizontal: 29,
    height: 50,
    fontSize: 15,
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
  skeletonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'left',
    position: 'relative', // To position the text overlay
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
