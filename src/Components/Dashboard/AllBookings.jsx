import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  DevSettings,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
import {AuthContext} from '../../context/Authcontext';
import moment from 'moment';

const BookingCard = ({booking, setBookings}) => {
  const [status, setstatus] = useState(booking.status);
  const [title, settitle] = useState()
  const {fetchBookings, userToken} = useContext(AuthContext);
  const navigation = useNavigation();
  const displayTitle = booking.shortDescription || booking.bookingPurpose;
  const Podtitle = booking.podTitle;
  console.log("latestBooking", booking)
  const formatTime = dateTime => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });
  };
  const updateBookingStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `https://privily.co/api/user/update-booking-status/${id}`,
        {status},
      );
      const newbookings = await fetchBookings();
      // console.log("newBookings ", newbookings)
      setBookings(newbookings);
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };
  useEffect(() => {
    const checkAndUpdateStatus = () => {
      const currentTime = moment().add(2, 'hours'); // Adjust for time zone difference
      const startTime = moment(booking.startTime);
      const endTime = moment(booking.endTime);

      if (status !== 'Cancelled') {
        if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
          if (status !== 'Processing') {
            updateBookingStatus(booking._id, 'Processing');
            setstatus('Processing'); // Update local state
          }
        } else if (currentTime.isAfter(endTime)) {
          if (status !== 'Completed' && status !== "Rated") {
            updateBookingStatus(booking._id, 'Completed');
            setstatus('Completed'); // Update local state
          }
        }
      }
    };

    checkAndUpdateStatus();

    const interval = setInterval(() => {
      checkAndUpdateStatus();
    }, 1000); // Every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [booking.startTime, booking.endTime, status]); // Re-run when these change

  // useEffect(() => {
  //   const newTime = moment();
  //   const currentTime = newTime.add(2, 'hours');
  //   const startTime = moment(booking.startTime);
  //   const endTime = moment(booking.endTime);
  //   console.log('starturgent', startTime);
  //   console.log('currentTimeurgent', currentTime);
  //   console.log('currentTimeurgentasasdasdasdfa', booking.status);

  //   // Check if the startTime is already passed
  //   if (booking.status !== 'Cancelled') {
  //     if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
  //       updateBookingStatus(booking._id, 'Processing');
  //       setstatus('Processing');
  //     }
  //     if (currentTime.isAfter(endTime)) {
  //       updateBookingStatus(booking._id, 'Completed');
  //       setstatus('Completed');
  //     }
  //   }

  //   // // Schedule status update for 'Processing' at startTime
  //   // const startTimeout = setTimeout(() => {
  //   //   updateBookingStatus(booking._id, 'Processing');
  //   //   fetchBookings();
  //   // }, startTime - currentTime);

  //   // // Schedule status update for 'Confirmed' at endTime
  //   // const endTimeout = setTimeout(() => {
  //   //   updateBookingStatus(booking._id, 'Confirmed');
  //   //   fetchBookings();
  //   // }, endTime - currentTime);

  //   // // Cleanup timeouts on unmount
  //   // return () => {
  //   //   clearTimeout(startTimeout);
  //   //   clearTimeout(endTimeout);
  //   // };
  // }, [booking.startTime, booking.endTime]);
  useEffect(() => {
    const currentTime = moment();
    const newTime = currentTime.add(2, 'hours');
    const bookingStartTime = moment(booking.startTime);
    const targetTime = bookingStartTime;
    const diffInMilliseconds = targetTime.diff(newTime, 'seconds');
    console.log(`Time difference in ms: ${diffInMilliseconds}`);
    setTimeout(() => {}, diffInMilliseconds * 1000);
  }, []);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('AllBookingsDetails', {
          booking,
          updateBookingStatus,
        })
      }>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{displayTitle} | {Podtitle}</Text>
          <Text style={styles.cardStatus(booking.status)}>{status}</Text>
        </View>
        <Text style={styles.cardDate}>
          {new Date(booking.bookingDate).toLocaleDateString()} |{' '}
          {formatTime(booking.startTime)}
        </Text>
      </View>
      <Icon name="chevron-right" size={24} color="#000" />
    </TouchableOpacity>
  );
};

const AllBookings = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const {fetchBookings, userToken} = useContext(AuthContext); // Get fetchBookings from AuthContext

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const bookingsData = await fetchBookings();
        setBookings(bookingsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    loadBookings();
  }, [userToken]);

  const filteredBookings = bookings?.filter(booking => {
    if (activeTab === 'All') return true;
    return booking.status === activeTab;
  });

  console.log("filter",filteredBookings)

  const navigation = useNavigation();
  const handleBackHome = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
                marginTop: Platform.OS === 'ios' ? 50 : 0,
              }}>
              <TouchableOpacity
                onPress={handleBackHome}
                style={{position: 'absolute', zIndex: 11}}>
                <Icon name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
              <Text style={styles.header}>All Booking</Text>
            </View>
      <View style={styles.tabContainer}>
        {['All', 'Pending', 'Processing', 'Completed'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={activeTab === tab ? styles.tabActive : styles.tab}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.scrollView}>
        {filteredBookings.length > 0 ? (
          filteredBookings
            .reverse()
            .map(booking => (
              <BookingCard
                key={booking._id}
                booking={booking}
                setBookings={setBookings}
              />
            ))
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.circle} />
            <Text style={styles.message}>You don't have any Booking</Text>
            <Text style={styles.subMessage}>
              Start bookings and purchase their listings!
            </Text>
            <TouchableOpacity onPress={() => Alert.alert('Start Booking')}>
              <View style={styles.button}>
                <Text
                  style={styles.buttonText}
                  onPress={() => {
                    navigation.navigate('HomeMain');
                  }}>
                  Start Booking
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F7FD',
    padding: 16,
  },
  header: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingTop: 10,
  },
  tab: {
    fontSize: 16,
    color: '#000',
  },
  tabActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  scrollView: {
    flex: 1,
    paddingTop: 2,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cardStatus: status => ({
    fontSize: 14,
    color:
      status === 'Completed'
        ? 'green'
        : status === 'Pending'
        ? '#D32F2F'
        : status === 'Processing'
        ? 'orange'
        : status === 'Rated'
        ? 'orange'
        : status === 'Cancelled'
        ? '#333'
        : 'none',
  }),
  cardDate: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF1200',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF1200',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AllBookings;
