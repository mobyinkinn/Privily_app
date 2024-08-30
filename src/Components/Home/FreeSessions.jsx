

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FreeSessions = () => {
  const navigation = useNavigation();

  const handleBackHome = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
          <Icon name={'arrow-back'} size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../../assests/Banner1.png')}
          style={styles.image}
        />
        <Text style={styles.promotionTitle}>15 MINUTES FREE</Text>
        <Text style={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Use Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Use Later</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.footer}>
        <Icon name="home" size={30} color="black" />
        <Icon name="place" size={30} color="black" />
        <Icon name="notifications" size={30} color="black" />
        <Icon name="search" size={30} color="black" />
        <Icon name="menu" size={30} color="black" />
      </View> */}
      <View>
        <Text
          style={{
            height: '500px',
            width: '500px',
          }}></Text>
      </View>
    </ScrollView>
  );
};
const paddingValue = Platform.OS === 'ios' ? 15 : 15;
const paddingTopValue = Platform.OS === 'ios' ? 50 : 10;
const styles = StyleSheet.create({
  backButton: {
    padding: paddingValue,
    paddingTop: paddingTopValue,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300, // Adjust according to your image aspect ratio
    resizeMode: 'contain',
  },
  promotionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  description: {
    textAlign: 'center',
    padding: 10,
    color: '#000',
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    marginVertical: 5,
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default FreeSessions;
