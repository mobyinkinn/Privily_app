// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';

// const LocationScreen = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const locations = [
//     {id: '1', name: 'Cape Town'},
//     {id: '2', name: 'Heerengracht'},
//     {id: '3', name: 'Cape Town'},
//     {id: '4', name: 'Heerengracht'},
//   ];
//   const handleSearch = query => {
//     setSearchQuery(query);
//     console.log('Searching for:', query);
//   };
//   const selectLocation = location => {
//     console.log('Selected location:', location.name);
//   };
// const handleLocationClick = async (location) => {
//   try {
//     const response = await axios.post(
//       'https://privily.co/api/livesearch',
//       {
//         location: location,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       },
//     );

//     console.log(response, 'response user type');

//     // Redirect to PodsListing page with the updated data
//     navigate(`/podsdiscovery?location=${location}`);
//     setOpenModal(false);
//   } catch (error) {
//     // Handle errors
//     console.log(error);
//   }
// };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Find Pods Closer to You?</Text>
//       {/* <TextInput
//         style={styles.searchInput}
//         onChangeText={handleSearch}
//         value={searchQuery}
//         placeholder="Search pods"
//       /> */}
//       <FlatList
//         data={locations}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             style={styles.locationItem}
//             onPress={() => handleLocationClick(`${item.name}`)}>
//             <Text style={styles.locationText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f1f7fd',
//     paddingTop:50
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color:"black"
//   },
//   // searchInput: {
//   //   height: 50,
//   //   marginHorizontal: 20,
//   //   borderWidth: 1,
//   //   borderColor: '#ddd',
//   //   borderRadius: 20,
//   //   marginBottom: 30,
//   //   fontSize: 16,
//   //   paddingLeft:20
//   // },
//   locationItem: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginHorizontal: 50,
//     marginBottom: 10,
//     borderRadius: 20,
//     elevation: 1, // for Android shadow
//     shadowColor: '#000', // for iOS shadow
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   locationText: {
//     fontSize: 18,
//     textAlign:"center",
//     color:"#000"
//   },
// });

// export default LocationScreen;



// import React, {useState} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const LocationScreen = () => {
//   const navigation = useNavigation();
//   const locations = [
//     {id: '1', name: 'Durban', color: '#000'},
//     {id: '2', name: 'Heerengracht', color: '#FE372F'},
//     {id: '3', name: 'Cape Town', color: '#000'},
//     {id: '4', name: 'Heerengracht', color: '#FE372F'},
//   ];

//   const handleLocationClick = (location) => {
//     navigation.navigate('DiscoverLocation', {location: location});
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Find Pods Closer to You?</Text>
//       <FlatList
//         data={locations}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             style={styles.locationItem}
//             onPress={() => handleLocationClick(item.name)}>
//             <Text style={{fontSize: 18, textAlign: 'center',color:`${item.color}`, fontWeight:"bold"}}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f1f7fd',
//     paddingTop: 50,
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color: 'black',
//   },
//   locationItem: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginHorizontal: 50,
//     marginBottom: 10,
//     borderRadius: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
// });

// export default LocationScreen;


import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationScreen = () => {
  const navigation = useNavigation();
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    axios
      .get('http://10.0.2.2:4000/api/location')
      // 'http://10.0.2.2:4000/api/location/'
      .then(response => {
        const fetchedLocations = response.data.locations.map(
          (location, index) => ({
            id: index.toString(),
            name: location,
            color: index % 2 === 0 ? '#000' : '#FE372F', // Assigning colors alternately for demo purposes
          }),
        );
        setLocations(fetchedLocations);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleLocationClick = location => {
    navigation.navigate('DiscoverLocation', {locationName: location}); // Pass location name as parameter
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Pods Closer to You?</Text>
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


// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const LocationScreen = () => {
//   const navigation = useNavigation();
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     fetch('http://10.0.2.2:4000/api/location/')
//       .then(response => response.json())
//       .then(data => {
//         const fetchedLocations = data.locations.map((location, index) => ({
//           id: index.toString(),
//           name: location,
//           color: index % 2 === 0 ? '#000' : '#FE372F', // Assigning colors alternately for demo purposes
//         }));
//         setLocations(fetchedLocations);
//       })
//       .catch(error => {
//         console.error('Error fetching locations:', error);
//       });
//   }, []);

//   const handleLocationClick = location => {
//     navigation.navigate('DiscoverLocation', {location: location});
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Find Pods Closer to You?</Text>
//       <FlatList
//         data={locations}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             style={styles.locationItem}
//             onPress={() => handleLocationClick(item.name)}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 textAlign: 'center',
//                 color: item.color,
//                 fontWeight: 'bold',
//               }}>
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f1f7fd',
//     paddingTop: 50,
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color: 'black',
//   },
//   locationItem: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginHorizontal: 50,
//     marginBottom: 10,
//     borderRadius: 20,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
// });

// export default LocationScreen;
