import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Platform} from 'react-native';
import axios from 'axios';
import {Linking} from 'react-native';

const PodDetailPage = () => {
  const route = useRoute();
  const {slug, origin} = route.params;
  const [podData, setPodData] = useState(null);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [averageRating, setAverageRating] = useState(4.7); 
  const [expandedSection, setExpandedSection] = useState(
    'Booking Requirements',
  );

  const toggleExpand = section => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const navigation = useNavigation();

  const handleBackHome = () => {
    if (origin === 'HomeMain') {
      navigation.navigate('HomeMain');
    } else if (origin === 'Location') {
      navigation.navigate('Location');
    } else if (origin === 'Discovery') {
      navigation.navigate('Discovery');
    } else {
      navigation.goBack();
    }
  };

  const featuress = [
    {name: 'Adjustable bar-style seating', icon: 'chair'},
    {name: 'Wi-Fi from event venue', icon: 'wifi'},
    {name: 'Sound-proof', icon: 'hearing'},
    {name: '3 Pin, 2 Pin and USB electrical sockets', icon: 'power'},
    {name: 'Ventilation', icon: 'hvac'},
    {name: 'Lighting', icon: 'light'},
    {name: 'Single person seating and desk', icon: 'person'},
    {
      name: 'Two person comfortable seating and table',
      icon: 'people',
    },
    {name: 'Four person seating and table', icon: 'groups'},
    {name: 'Studio quality Audio and Video recording equipment', icon: 'mic'},
    {name: 'Inward facing Digital LCD screen', icon: 'tv'},
    {
      name: 'Outward facing LCD screen for digital adverts',
      icon: 'cast',
    },
  ];

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(
        'https://privily.co/api/location/features',
      );
      setFeatures(response.data);
      console.log('important bkcuodiu:', response.data);
    } catch (error) {
      console.error('Error fetching features:', error);
      setError('Error fetching features');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://privily.co/api/product/${slug}`,
        );
        setPodData(response.data);
        const ratings = response.data.ratings || [];
        if (ratings.length > 0) {
          const totalStars = ratings.reduce(
            (sum, rating) => sum + rating.star,
            0,
          );
          const average = totalStars / ratings.length;
          setAverageRating(average.toFixed(1)); // Set calculated average rating
        } else {
          setAverageRating(4.7); // Default rating if no ratings are present
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchFeatures();
  }, [slug]);
  console.log('podData', podData);

const req = [
  {
    name: 'Booking Requirements',
  },
  {
    name: 'Availability',
  },
  {
    name: 'Cancellation Policy',
  },
  {
    name: 'Safety & Property',
  },
];
  const renderItem = ({item}) => {
    console.log("item",item)
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

  if (error) return <Text>Error: {error}</Text>;

  const images = podData?.images || [];
  const location = podData?.location;
  const locationText = location
    ? `${location.name}, ${location.Street}, ${location.city}, ${location.state}, ${location.country_code}, ${location.zip}`
    : '';
    
  console.log('podDatafeatures', podData?.features);

  // Calculate the number of static features to show based on the dynamic features length
  const staticFeaturesToShow = features.slice(0, features.length);

  return (
    <ScrollView style={styles.container}>
      {podData && (
        <>
          <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
            <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
          </TouchableOpacity>

          <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Platform.OS==="ios"?400:300}
            loop={true}
            onSnapToItem={index => setActiveIndex(index)}
          />
          <Pagination
            dotsLength={images.length}
            activeDotIndex={activeIndex}
            containerStyle={{paddingTop: 20}}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: '#FF1200',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              marginTop: 10,
            }}>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{podData.title}</Text>
              <Text style={styles.locationText}>{locationText}</Text>
            </View>
            <TouchableOpacity
              style={styles.DirectionButton}
              onPress={() => Linking.openURL(podData.direction)}>
              <Icon name={'directions'} size={25} color={'#FF1200'} />
              <Text style={styles.DirectionButtonText}>Directions</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              paddingLeft: 16,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#1D9740',
                padding: 10,
                borderRadius: 22,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.rating}>{averageRating}</Text>
              <Icon name={'star'} size={20} color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => {
                navigation.navigate('BookingScreen', {
                  title: podData.title,
                  slugs: podData._id,
                  origin: 'PodDetailPage',
                });
              }}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={{display: 'flex'}}>
                {podData?.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    {features
                      .filter(el => feature.name === el.name)
                      .map((feature, index) => (
                        <View key={index} style={{margin: 5.5}}>
                          <Icon name={feature.icon} size={26} color="grey" />
                        </View>
                      ))}
                    <Text style={styles.featureText}>{feature.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {req.map(d => (
            <View key={d.name}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleExpand(d.name)}>
                <Text style={styles.sectionTitle}>{d.name}</Text>
                <Icon
                  name="keyboard-arrow-down" // Using a downward arrow icon
                  size={30}
                  color="black"
                  style={{
                    transform: [
                      {
                        rotate: expandedSection === d.name ? '180deg' : '0deg',
                      },
                    ],
                  }}
                />
              </TouchableOpacity>
              {expandedSection === d.name && (
                <Text style={styles.sectionContent}>
                  {d.name === 'Booking Requirements'
                    ? podData.booking_requirements
                    : d.name === 'Availability'
                    ? podData.availability
                    : d.name === 'Cancellation Policy'
                    ? podData.cancellation_policy
                    : d.name === 'Safety & Property'
                    ? podData.safety_and_property
                    : ''}
                </Text>
              )}
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const paddingValue = Platform.OS === 'ios' ? 24 : 25;
const paddingTopValue = Platform.OS === 'ios' ? 70 : 20;

const styles = StyleSheet.create({
  backButton: {
    padding: paddingValue,
    paddingTop: paddingTopValue,
  },
  container: {
    flex: 1,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'start',
    marginBottom: 5,
    paddingTop: 5,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 20,
    letterSpacing: 2,
    color: '#000',
    paddingTop:4,
    width:"88%",
  },
  imageContainer: {
    width: '100%',
    height: 250, // Ensure this height is enough to display the images
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 13,
    alignItems: 'flex-start',
    width: '64%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
    letterSpacing: 2,
  },
  rating: {
    fontSize: 18,
    color: '#fff',
  },
  locationText: {
    fontSize: 14,
    color: 'gray',
    letterSpacing: 2,
  },
  bookButton: {
    backgroundColor: '#FE372F',
    padding: 10,
    borderRadius: 22,
    display: 'flex',
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  DirectionButton: {
    padding: 10,
    height: 46,
    borderWidth: 2, // Width of the border
    borderColor: '#FF1200', // Color of the border
    borderRadius: 22,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  DirectionButtonText: {
    color: '#FF1200',
    fontSize: 15,
    fontWeight: 'bold',
  },
  section: {
    padding: 15,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionHeader: {
    padding: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionContent: {
    padding: 10,
    fontSize: 16,
    color: '#777',
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PodDetailPage;
