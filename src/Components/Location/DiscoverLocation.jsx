

// import axios from 'axios';
// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
// const DiscoverLocation = () => {
//   const [pods, setPods] = useState([]);
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {locationName} = route.params || {};

// const handleBackHome = () => {
//   navigation.goBack();
// };
//   const features = [
//     {name: 'Comfortable chairs', icon: 'chair'},
//     {name: 'Unlimited Wi-Fi', icon: 'wifi'},
//     {name: 'Sound Proof', icon: 'hearing'},
//     {name: 'Charging', icon: 'power'},
//     {name: '24/7 Access', icon: 'lock'},
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://privily.co/api/product/filter?city=${locationName}`,
//         );
//      const data = response.data
//         .filter(item => !item.isBlocked) // Filter out blocked items
//         .map(item => ({
//           ...item,
//           featuredImage: item.images.length > 0 ? item.images[0].url : null,
//         }));

//       setPods(data);
//     } catch (error) {
//       console.error('Error fetching banner data:', error);
//       setError('Error fetching data');
//       }
//     };

//     if (locationName) {
//       fetchData();
//     }
//   }, [locationName]);

//    const renderItem = ({item}) => {
//      return (
//        <View style={styles.imageContainer}>
//          <Image
//            source={{
//              uri: `https://privily.co${item.url}`,
//            }}
//            style={styles.image}
//            onError={e =>
//              console.log('Error loading image:', e.nativeEvent.error)
//            }
//          />
//        </View>
//      );
//    };

//   return (
//     <>
//       <View style={styles.container2}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.Text}>Locations</Text>
//       </View>
//       <ScrollView style={styles.container}>
//         {pods.map(pod => (
//           <View style={styles.podContainer2}>
//             <Carousel
//               data={pod.images}
//               renderItem={renderItem}
//               sliderWidth={365}
//               itemWidth={300}
//               loop={true}
//               autoplay={true}
//             />
//             <View key={pod._id} style={styles.podContainer}>
//               <Text style={styles.title}>{pod.title}</Text>
//               <Text style={styles.address}>
//                 {pod.location.name}, {pod.location.city}, {pod.location.state}{' '}
//                 {pod.location.zip}
//               </Text>
//               <TouchableOpacity style={styles.button}>
//                 <Text
//                   style={styles.buttonText2}
//                   onPress={() => {
//                     navigation.navigate('PodDetailPage', {
//                       slug: pod._id,
//                       origin: 'Location',
//                     });
//                   }}>
//                   Learn More
//                 </Text>
//                 <Text style={styles.buttonText}>Book Now</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   Text: {
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 10,
//     fontSize: 25,
//     color: '#000',
//   },
//   container2: {
//     backgroundColor: '#f1f7fd',
//     display: 'flex',
//     flexDirection: 'row',
//     gap: 80,
//     padding: 5,
//   },
//   backButton: {
//     padding: 10,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#f1f7fd',
//   },
//   podContainer: {
//     backgroundColor: '#fff',
//     padding: 10,
//     margin: 10,
//   },
//   podContainer2: {
//     backgroundColor: '#fff',
//     shadowColor: '#ccc',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 4,
//     margin: 10,
//     marginTop: 15,
//     borderRadius: 10,
//   },
//   imageContainer: {
//     paddingTop: 20,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color: '#000',
//   },
//   address: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 10,
//     marginTop: 10,
//   },
//   features: {
//     marginBottom: 10,
//     color: '#000',
//   },
//   featureRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//     paddingTop: 5,
//     gap: 10,
//   },
//   featureText: {
//     fontSize: 16,
//     letterSpacing: 2,
//   },
//   button: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },

//   buttonText2: {
//     backgroundColor: 'transparent',
//     padding: 10,
//     borderRadius: 5,
//     textAlign: 'center',
//     color: 'grey',
//     borderWidth: 2,
//     borderColor: 'lightgrey',
//     fontSize: 16,
//   },

//   buttonText: {
//     backgroundColor: '#FE372F',
//     padding: 10,
//     borderRadius: 5,
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default DiscoverLocation;


import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';

const DiscoverLocation = () => {
  const [pods, setPods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const {locationName} = route.params || {};

  const handleBackHome = () => {
    navigation.goBack();
  };

  const features = [
    {name: 'Comfortable chairs', icon: 'chair'},
    {name: 'Unlimited Wi-Fi', icon: 'wifi'},
    {name: 'Sound Proof', icon: 'hearing'},
    {name: 'Charging', icon: 'power'},
    {name: '24/7 Access', icon: 'lock'},
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://privily.co/api/product/filter?city=${locationName}`,
        );
        const data = response.data
          .filter(item => !item.isBlocked) // Filter out blocked items
          .map(item => ({
            ...item,
            featuredImage: item.images.length > 0 ? item.images[0].url : null,
          }))
          .reverse();
        setPods(data);
      } catch (error) {
        console.error('Error fetching banner data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (locationName) {
      fetchData();
    }
  }, [locationName]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://privily.co${item.url}`,
          }}
          style={styles.image}
          onError={e =>
            console.log('Error loading image:', e.nativeEvent.error)
          }
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
          <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.Text}>Locations</Text>
      </View>
      <ScrollView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : pods.length > 0 ? (
          pods.map(pod => (
            <View key={pod._id} style={styles.podContainer2}>
              <Carousel
                data={pod.images}
                renderItem={renderItem}
                sliderWidth={365}
                itemWidth={300}
                loop={true}
                autoplay={true}
              />
              <View style={styles.podContainer}>
                <Text style={styles.title}>{pod.title}</Text>
                <Text style={styles.address}>
                  {pod.location.name}, {pod.location.city}, {pod.location.state}{' '}
                  {pod.location.zip}
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={styles.buttonText2}
                    onPress={() => {
                      navigation.navigate('PodDetailPage', {
                        slug: pod._id,
                        origin: 'Location',
                      });
                    }}>
                    Learn More
                  </Text>
                  {/* <Text style={styles.buttonText}>Book Now</Text> */}
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => {
                      navigation.navigate('BookingScreen', {
                        slugs: pod._id,
                        origin: 'PodDetailPage',
                      });
                    }}>
                    <Text style={styles.buttonText}>Book Now</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.circle} />
            <Text style={styles.message}>Coming Soon !!</Text>
            <Text style={styles.subMessage}>
              Start bookings and purchase their listings!
            </Text>
            <TouchableOpacity
              onPress={() => Alert.alert('Start Booking')}></TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  Text: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 25,
    color: '#000',
  },
  container2: {
    backgroundColor: '#f1f7fd',
    display: 'flex',
    flexDirection: 'row',
    gap: 80,
    padding: 5,
  },
  backButton: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f7fd',
  },
  podContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  },
  podContainer2: {
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    margin: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  imageContainer: {
    paddingTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    marginTop: 10,
  },
  features: {
    marginBottom: 10,
    color: '#000',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingTop: 5,
    gap: 10,
  },
  featureText: {
    fontSize: 16,
    letterSpacing: 2,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText2: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    color: 'grey',
    borderWidth: 2,
    borderColor: 'lightgrey',
    fontSize: 16,
  },
  buttonText: {
    backgroundColor: '#FE372F',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
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
});

export default DiscoverLocation;
