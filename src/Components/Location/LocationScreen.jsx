
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
const LocationScreen = () => {
  const navigation = useNavigation();
  const [locations, setLocations] = useState([]);
  const [loading, setloading] = useState(true)
  useEffect(() => {
    axios
      .get('https://privily.co/api/location')
      // 'https://privily.co/api/location/'
      .then(response => {
        const fetchedLocations = response.data.locations.map(
          (location, index) => ({
            id: index.toString(),
            name: location,
            color: index % 2 === 0 ? '#000' : '#FE372F', // Assigning colors alternately for demo purposes
          }),
        );
        setLocations(fetchedLocations);
        setloading(false);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
        setloading(false);
      })
      
  }, []);

  const handleLocationClick = location => {
    navigation.navigate('DiscoverLocation', {locationName: location}); // Pass location name as parameter
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
      <Text style={styles.title}>Where will you work today ?</Text>
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.locationItem}
            onPress={() => handleLocationClick(item.name)}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: item.color,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f7fd',
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  locationItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 50,
    marginBottom: 10,
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default LocationScreen;

