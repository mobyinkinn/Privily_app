

// import {useNavigation} from '@react-navigation/native';
// import React, {useState, useEffect, useContext} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';
// import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
// import { AuthContext } from '../../context/Authcontext';

// const BookingCard = ({booking}) => {
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('AllBookingsDetails', {booking})}>
//       <View style={styles.cardContent}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.cardTitle}>{booking.bookingPurpose}</Text>
//           <Text style={styles.cardStatus(booking.status)}>
//             {booking.status}
//           </Text>
//         </View>
//         <Text style={styles.cardDate}>
//           {new Date(booking.bookingDate).toLocaleDateString()} |{' '}
//           {new Date(booking.startTime).toLocaleTimeString()}
//         </Text>
//       </View>
//       <Icon name="chevron-right" size={24} color="#000" />
//     </TouchableOpacity>
//   );
// };

// const AllBookings = () => {
//   const [activeTab, setActiveTab] = useState('All');
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//  const {userToken} = useContext(AuthContext);
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(
//           'http://10.0.2.2:4000/api/user/all-bookingsByUser',
//           {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//             },
//           },
//         );
//         setBookings(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const filteredBookings = bookings.filter(booking => {
//     if (activeTab === 'All') return true;
//     return booking.status === activeTab;
//   });

//   const navigation = useNavigation();
//   const handleBackHome = () => {
//     navigation.goBack();
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={{display: 'flex', flexDirection: 'row', gap: 80}}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.header}>My Booking</Text>
//       </View>
//       <View style={styles.tabContainer}>
//         {['All', 'Pending', 'Processing', 'Completed'].map(tab => (
//           <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
//             <Text style={activeTab === tab ? styles.tabActive : styles.tab}>
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <ScrollView style={styles.scrollView}>
//         {filteredBookings.map(booking => (
//           <BookingCard key={booking._id} booking={booking} />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F1F7FD',
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
//     color: '#000',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 16,
//     paddingTop: 10,
//   },
//   tab: {
//     fontSize: 16,
//     color: '#000',
//   },
//   tabActive: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#D32F2F',
//   },
//   scrollView: {
//     flex: 1,
//     paddingTop: 2,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginBottom: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   cardContent: {
//     flex: 1,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   cardStatus: status => ({
//     fontSize: 14,
//     color:
//       status === 'Completed'
//         ? 'green'
//         : status === 'Pending'
//         ? '#D32F2F'
//         : status === 'Processing'
//         ? 'orange'
//         : 'none',
//   }),
//   cardDate: {
//     fontSize: 14,
//     color: '#757575',
//     marginTop: 4,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default AllBookings;




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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
import {AuthContext} from '../../context/Authcontext';

const BookingCard = ({booking}) => {
  const navigation = useNavigation();
  const displayTitle = booking.shortDescription || booking.bookingPurpose;
  const formatTime = dateTime => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AllBookingsDetails', {booking})}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{displayTitle}</Text>
          <Text style={styles.cardStatus(booking.status)}>
            {booking.status}
          </Text>
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
    console.log("use effect runnings")
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

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'All') return true;
    return booking.status === activeTab;
  });

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
      <View style={{display: 'flex', flexDirection: 'row', gap: 80}}>
        <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
          <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.header}>My Booking</Text>
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
          filteredBookings.map(booking => (
            <BookingCard key={booking._id} booking={booking} />
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
