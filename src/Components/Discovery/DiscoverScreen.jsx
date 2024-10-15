
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const DiscoverScreen = () => {
  const [pods, setPods] = useState([]);
  const navigation = useNavigation();

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
        const response = await axios.get('http://10.0.2.2:4000/api/product');

        const data = response.data
        .filter(item => !item.isBlocked) // Filter out blocked items
        .map(item => ({
          ...item,
          featuredImage: item.images.length > 0 ? item.images[0].url : null,
        }));

      setPods(data);
    } catch (error) {
      console.error('Error fetching banner data:', error);
      setError('Error fetching data');

      }
    };

    fetchData();
  }, []);

 const renderItem = ({item}) => {
   return (
     <View style={styles.imageContainer}>
       <Image
         source={{
           uri: `http://10.0.2.2:4000${item.url}`,
         }}
         style={styles.image}
         onError={e => console.log('Error loading image:', e.nativeEvent.error)}
       />
     </View>
   );
 };
  return (
    <>
      <View style={styles.container2}>
        <Text style={styles.Text}>Discovery</Text>
      </View>
      <ScrollView style={styles.container}>
        {pods.map(pod => (
          <View style={styles.podContainer2}>
            <Carousel
              data={pod.images}
              renderItem={renderItem}
              sliderWidth={365}
              itemWidth={300}
              loop={true}
              autoplay={true}
            />
            <View key={pod._id} style={styles.podContainer}>
              <Text style={styles.title}>{pod.title}</Text>
              <Text style={styles.address}>
                {pod.location.name}, {pod.location.city}, {pod.location.state}{' '}
                {pod.location.zip}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap:15,
                  paddingVertical: 7,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                    backgroundColor: '#1D9740',
                    color: 'white',
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    fontWeight: 'bold',
                  }}>
                  <Icon name="star" size={25} color="white" />
                  <Text style={{color: 'white', fontSize: 20}}>
                    {pod.totalRating}
                  </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row',gap:15}}>
                  {features.map((feature, index) => (
                    <View key={index} style={{margin: 5}}>
                      <Icon name={feature.icon} size={25} color="grey" />
                    </View>
                  ))}
                </View>
              </View>
              {/* <View style={styles.features}>
                {pod.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Icon name={feature.icon} size={25} color="grey" />
                    <Text style={styles.featureText}>{feature.name}</Text>
                  </View>
                ))}
              </View> */}
              <TouchableOpacity style={styles.button}>
                <Text
                  style={styles.buttonText2}
                  onPress={() => {
                    navigation.navigate('PodDetailPage', {
                      slug: pod._id,
                      origin: 'Discovery',
                    });
                  }}>
                  Learn More
                </Text>
                <Text
                  style={styles.buttonText}
                  onPress={() => {
                    navigation.navigate('BookingScreen', {
                      slugs: pod._id,
                      origin: 'Discovery',
                    });
                  }}>
                  Book Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};
const paddingTopValue = Platform.OS === 'ios' ? 60 : 0;
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
    paddingTop: paddingTopValue,
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f7fd',
  },
  podContainer: {
    backgroundColor: '#fff',
    display:"flex",
    alignItems:"center"
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
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  address: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
    marginTop: 10,
  },
  features: {
    display:"flex",
    flexDirection:"row",
    marginBottom: 10,
    color: '#000',
  },
  featureRow: {
    display:"flex",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingTop: 5,
    gap: 10,
  },
  featureText: {
    fontSize: 16,
    letterSpacing: 2,
    color: '#000',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    gap:70,
    paddingVertical:10
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
});

export default DiscoverScreen;



