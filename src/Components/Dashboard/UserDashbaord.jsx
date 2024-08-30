// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const SettingsScreen = () => {
//   const navigation = useNavigation();

//   // Add navigation functionality as needed
//   const handleLogout = () => {
//     console.log('Log Out');
//     // Perform log out operations here
//   };
//   const onBannerPress = () => {
//     navigation.navigate('TermsandService');
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <TouchableOpacity style={styles.optionItem}>
//         <Text style={styles.optionText}>Profile</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.optionItem}>
//         <Text style={styles.optionText}>Bookings</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.optionItem}>
//         <Text style={styles.optionText}>Privacy Policy</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.optionItem}>
//         <Text style={styles.optionText}>Terms & Conditions</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//         <Text style={styles.logoutButtonText}>Log Out</Text>
//       </TouchableOpacity>

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f1f7fd',
//   },
//   optionItem: {
//     padding: 20,
//     borderBottomColor: '#eaeaea',
//     borderBottomWidth: 1,
//   },
//   optionText: {
//     fontSize: 20,
//     backgroundColor:"White"
//   },
//   logoutButton: {
//     backgroundColor: 'red',
//     padding: 15,
//     margin: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   logoutButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   footerCode: {
//     fontSize: 12,
//     color: '#999',
//     textAlign: 'center',
//     padding: 20,
//   },
// });

// export default SettingsScreen;

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../context/Authcontext';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);

  const options = [
    {name: 'Profile', screen: 'ProfilePage'}, // Update with actual screen names
    {name: 'Bookings', screen: 'AllBookings'}, // Update with actual screen names
    {name: 'Privacy Policy', screen: 'PrivacyPolicy'},
    {name: 'Terms & Conditions', screen: 'TermsandService'},
  ];

  // const handleLogout = () => {
  //   console.log('Log Out');
  //   // Perform log out operations here
  // };

  const handleNavigation = screen => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionItem}
          onPress={() => handleNavigation(option.screen)}>
          <Text style={styles.optionText}>{option.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f7fd',
  },
  optionItem: {
    padding: 15,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 20,
    padding:13,
    borderRadius:12,
    backgroundColor: '#fff',
    color:"#000"
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
});

export default SettingsScreen;
