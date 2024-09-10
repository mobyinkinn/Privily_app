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
  const [showendTime, setshowendTime] = useState(false);
  const [showStarttime, setshowStarttime] = useState(false);
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

  const [isStartDoneDisabled, setIsStartDoneDisabled] = useState(true);
  const [isEndDoneDisabled, setIsEndDoneDisabled] = useState(false);
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
    let isBooked = bookedSlots[index];
    if (selectingEndTime) {
      isBooked = [...isBooked, selectedTimeSlots[0]];
    }

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
        onPress={() => setshowStarttime(true)}>
        <Text style={styles.pickerText}>
          {getStartSelectedTimeSlotsText('Select start time')}
        </Text>
      </TouchableOpacity>
      {errors.timeSlots && (
        <Text style={styles.errorText}>{errors.timeSlots}</Text>
      )}
      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={() => setshowendTime(true)}>
        <Text style={styles.pickerText}>
          {getEndSelectedTimeSlotsText('Select end time')}
        </Text>
      </TouchableOpacity>
      {errors.timeSlots && (
        <Text style={styles.errorText}>{errors.timeSlots}</Text>
      )}
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
