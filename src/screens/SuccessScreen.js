import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SuccessScreen = () => {
     const navigation = useNavigation();
      const handleBackHome = () => {
        navigation.goBack();
      };

  return (
    <>
      <View
        style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
        <TouchableOpacity
          onPress={handleBackHome}
          style={{position: 'absolute', zIndex: 11}}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Booking</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Payment Successful</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
});

export default SuccessScreen;
