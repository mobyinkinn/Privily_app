import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SettingsScreen from './UserDashbaord';

const UserAccountScreen = () => {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.Text}>Settings</Text>
    </View>
    <SettingsScreen/>
    </>
  )
}

const paddingTopValue = Platform.OS === 'ios' ? 60 : 0;
const styles = StyleSheet.create({
  Text: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 25,
    color: '#000',
  },
  container: {
    backgroundColor: '#f1f7fd',
    paddingTop: paddingTopValue,

  },
});

export default UserAccountScreen;
