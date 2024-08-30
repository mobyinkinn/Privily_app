// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import {View, Text, TextInput, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
// import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
// import Icon from 'react-native-vector-icons/MaterialIcons';
  

// const UserProfile = () => {
//     const profileData = {
//       email: 'jj@gmail.com',
//       mobileNumber: '8291891922',
//       name: 'sjk',
//       password: '********',
//     };
//     const navigation = useNavigation();

//     const handleBackHome = () => {
//       navigation.goBack();
//     };
//   return (
//     <View style={styles.container}>
//       <View style={{display: 'flex', flexDirection: 'row', gap: 80}}>
//         <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//           <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
//         </TouchableOpacity>
//         <Text style={styles.header}>User Profile</Text>
//       </View>
//       <View style={styles.profileContainer}>
//         <Image
//           source={{uri: 'https://via.placeholder.com/100'}} // Replace with actual image source
//           style={styles.profileImage}
//         />
//         <Text style={styles.username}>Deep Sign</Text>
//         <Text style={styles.userId}>1280ff902020</Text>
//       </View>
//       <View style={styles.infoContainer}>
//         <Text style={styles.label}>Email</Text>
//         <Text style={styles.value}>{profileData.email}</Text>
//       </View>
//       <View style={styles.infoContainer}>
//         <Text style={styles.label}>Mobile Number</Text>
//         <Text style={styles.value}>{profileData.mobileNumber}</Text>
//       </View>
//       <View style={styles.infoContainer}>
//         <Text style={styles.label}>Name</Text>
//         <Text style={styles.value}>{profileData.name}</Text>
//       </View>
//       <View style={styles.infoContainer}>
//         <Text style={styles.label}>Password</Text>
//         <Text style={styles.value}>{profileData.password}</Text>
//       </View>
//       {/* <View style={styles.buttonContainer}>
//         <Button
//           title="Edit Profile"
//           color="#FF1200"
//           onPress={() => alert('Edit Profile')}
//         />
//         <Button
//           title="Edit Password"
//           color="#FF1200"
//           onPress={() => alert('Edit Password')}
//         />
//       </View> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F5F5F5',
//   },
//   backButton: {
//     padding: 2,
//   },
//   header: {
//     color: '#000',
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   username: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   userId: {
//     color: '#777',
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//   },
//   value: {
//     fontSize: 16,
//     color: '#333',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 10,
//   },
// });

// export default UserProfile;


import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../context/Authcontext';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const {userToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:4000/api/user/me', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setProfileData(response.data);
        console.log('pro', profileData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleBackHome = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 80}}>
        <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
          <Icon name={'arrow-back'} size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.header}>User Profile</Text>
      </View>
      {/* <View style={styles.profileContainer}>
        <Text style={styles.username}>
          {profileData.firstname} {profileData.lastname}
        </Text>
        <Text style={styles.userId}>{profileData._id}</Text>
      </View> */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri: 'https://via.placeholder.com/100'}} 
          style={styles.profileImage}
        />
        <Text style={styles.username}>
          {profileData.firstname} {profileData.lastname}
        </Text>
        <Text style={styles.userId}>{profileData._id}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>
          {profileData.firstname} {profileData.lastname}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{profileData.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <Text style={styles.value}>{profileData.mobile}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    padding: 2,
  },
  header: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
   profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  userId: {
    color: '#777',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProfile;
