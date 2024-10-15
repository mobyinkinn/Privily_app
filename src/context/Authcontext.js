

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';
import Popup from '../Components/Popup'; // Ensure this path is correct
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [bookingEndTime, setBookingEndTime] = useState(null);


  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [availability, setAvailability] = useState([]); // State to store availability slots
  const [slugs, setSlugs] = useState(null); // State to store the pod ID
  const [bookingDate, setBookingDate] = useState(null); // State to store the booking date
 const [bookingId, setbookingId] = useState(null)
  const [notifications, setNotifications] = useState([]);
   const [unreadCount, setUnreadCount] = useState(0);
   const [error, setError] = useState("")
   const [bookings, setBookings] = useState([]); 
  const handleSubmit = async navigation => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:4000/api/user/verify-otp',
        {
          phoneNumber: phoneNumber,
          otp: code.join(''),
        },
      );
      if (response.data.status === 1) {
        navigation.navigate('Register', {
          phoneNumber: phoneNumber,
        });
      } else if (response.data.status === 0) {
        setUserToken(response.data.token);
        setUserId(response.data.userId);
        await AsyncStorage.setItem('userToken', response.data.token);
        setIsLoading(false);
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleSubmitRegister = async (
    navigation,
    firstname,
    lastname,
    email,
  ) => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:4000/api/user/register',
        {
          firstname,
          lastname,
          email,
          phoneNumber,
        },
      );

      if (response.data.token) {
        setIsLoading(true);
        setUserToken(response.data.token);
        await AsyncStorage.setItem('userToken', response.data.token);
        setIsLoading(false);
        navigation.navigate('Main');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error registering user');
      console.error('Error registering user:', error);
    }
  };

  const createBooking = async (slugs, bookingDetails) => {
    console.log('bookingDetails22', bookingDetails);
    try {
      const response = await axios.post(
        `http://10.0.2.2:4000/api/user/create-booking/${slugs}`,
        bookingDetails,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      if (response.data.booking) {
        console.log('Booking end time:', response.data.booking.endTime); // Debugging
        setBookingEndTime(new Date(response.data.booking.endTime)); // Ensure this is a Date object
        setSlugs(slugs); // Store slugs
        setbookingId(response.data.booking._id)
        console.log('booking', response);
        setBookingDate(new Date().toISOString().split('T')[0]); // Store the booking date
      }
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  };

  const fetchProductAvailability = async (slugs, bookingDate) => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:4000/api/product/availability/${slugs}?booking_date=${bookingDate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log('ava', response.data.product_availability.slot_bookings);

      setAvailability(response.data.product_availability.slot_bookings);
      return response.data.product_availability.slot_bookings;
    } catch (error) {
      console.error('Error fetching product availability:', error);
      throw error;
    }
  };
  const getNextFalseSlots = (slots, endTimeIndex) => {
    const nextSlots = slots.slice(endTimeIndex + 1);
    const continuousFalseSlots = [];
    for (let slot of nextSlots) {
      if (slot === false) {
        continuousFalseSlots.push(slot);
      if (continuousFalseSlots.length === 8) {
        break; // Limit to a maximum of 8 slots
      }
      } else {
        break;
      }
    }
    console.log('nextSlots', nextSlots);
    console.log('continuousFalseSlots', continuousFalseSlots);
    return continuousFalseSlots; // Return all consecutive false slots
  };
 const extendBooking = async (bookingId, extensionMinutes) => {
   try {
     const response = await axios.post(
       `http://10.0.2.2:4000/api/user/extend/${bookingId}`,
       {extensionMinutes},
       {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userToken}`,
         },
       },
     );
     return response.data;
   } catch (error) {
     console.error('Error extending booking:', error);
     throw error;
   }
 };
//  const fetchNotifications = async () => {
//    try {
//      const response = await axios.get(
//        'http://10.0.2.2:4000/api/user/notifications/active',
//        {
//          headers: {
//            Authorization: `Bearer ${userToken}`,
//          },
//        },
//      );
//      if (Array.isArray(response.data.data)) {
//        setNotifications(response.data.data);
//        console.log('response', response.data.data);
//      } else {
//        setNotifications([]);
//      }
//      setIsLoading(false)
//    } catch (error) {
//      console.error('Error fetching notifications:', error);
//      setIsLoading(false);
//    }
//  };
 const fetchNotifications = async () => {
   try {
     const response = await axios.get(
       'http://10.0.2.2:4000/api/user/notifications/active',
       {
         headers: {
           Authorization: `Bearer ${userToken}`,
         },
       },
     );
     if (Array.isArray(response.data.data)) {
       setNotifications(response.data.data);
       setUnreadCount(response.data.data.length); // Update unread count
     } else {
       setNotifications([]);
       setUnreadCount(0); // No notifications
     }
     setIsLoading(false);
   } catch (error) {
     console.error('Error fetching notifications:', error);
     setIsLoading(false);
   }
 };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };
  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:4000/api/user/all-bookingsByUser',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  };
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`LoggedIn error ${e}`);
    }
  };
  useEffect(() => {
    if (userToken) {
      fetchNotifications();
    }
  }, [userToken]);
  useEffect(() => {
    isLoggedIn();
  }, []);
useEffect(() => {
  let timer;
  if (bookingEndTime) {
    const now = new Date().getTime();
    const endTime = bookingEndTime.getTime();
    const diff = endTime - now - 70000; // 1 minute before booking end time

    console.log('now', now);
    console.log('endTime', endTime);
    console.log('diff', diff);

    if (diff > 0) {
      console.log('Setting timer for', diff, 'milliseconds');
      // For debugging, use a shorter timer duration (e.g., 5000 ms)
      timer = setTimeout(() => {
        console.log('Showing popup');
        setShowPopup(true);
        // Fetch product availability here
        if (slugs && bookingDate) {
          fetchProductAvailability(slugs, bookingDate);
        }
      }, diff); // Change this back to `diff` for actual functionality
    } else {
      console.log('Showing popup immediately');
      setShowPopup(true);
      // Fetch product availability here
      if (slugs && bookingDate) {
        fetchProductAvailability(slugs, bookingDate);
      }
    }
  } else {
    console.log('Booking end time not set');
  }

  return () => {
    if (timer) {
      console.log('Clearing timer');
      clearTimeout(timer);
    }
  };
}, [bookingEndTime, slugs, bookingDate]);
const checkCancelTime = bookingStartTime => {
  const currentTime = new Date(); // Get current time
  const startTime = new Date(bookingStartTime); // Booking start time
  const updatedTime = new Date(
    currentTime.setHours(currentTime.getHours() + 2),
  ); // Adjust for time difference

  const fiveMinutesBeforeStart = new Date(
    startTime.getTime() - 5 * 60 * 1000, // 5 minutes before the start time
  );

  // Check if the current time is before five minutes before start time
  return updatedTime <= fiveMinutesBeforeStart;
};

// Function to cancel the booking
const cancelBooking = async (bookingId, navigation) => {
  try {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            // Call API to cancel the booking
            const response = await axios.put(
              `http://10.0.2.2:4000/api/user/cancel-booking/${bookingId}`,
            );

            console.log('Cancel booking response:', response.data);
            // navigation.goBack();
             navigation.navigate('AllBookings', {
               origin: 'AllBookingsDetails',
             });
            const res= await fetchBookings();
            console.log("res",res)
          },
        },
      ],
    );
  } catch (error) {
    console.error('Error cancelling booking:', error);
    Alert.alert('Error', 'Failed to cancel the booking. Please try again.');
  }
};
  return (
    <AuthContext.Provider
      value={{
        handleSubmit,
        fetchBookings,
        handleSubmitRegister,
        createBooking,
        fetchProductAvailability,
        logout,
        isLoading,
        userToken,
        setPhoneNumber,
        phoneNumber,
        setCode,
        code,
        userId,
        bookingEndTime,
        showPopup,
        setShowPopup, // Provide setter to close popup
        availability,
        getNextFalseSlots,
        extendBooking,
        fetchNotifications,
        notifications,
        unreadCount,
        checkCancelTime,
        cancelBooking,
        bookings, // Provide bookings in context
      }}>
      {children}
      {showPopup && (
        <Popup
          visible={showPopup}
          onClose={() => {
            console.log('Closing popup');
            setShowPopup(false);
          }}
          availability={availability}
          endTime={bookingEndTime}
          bookingId={bookingId} // Pass the booking ID
          navigation={children.props.navigation}
        />
      )}
    </AuthContext.Provider>
  );
};
