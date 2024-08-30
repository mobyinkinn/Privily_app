import React from 'react';
import {View, TextInput, StyleSheet, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({placeholder, onChangeText}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>
        <Icon name="search" size={30} />
      </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#000"
        onChangeText={onChangeText}
        clearButtonMode="always"
      />
    </View>
  );
};

const paddingValue = Platform.OS === 'ios' ? 10 : 0;
const paddingLeftValue = Platform.OS === 'ios' ? 15 : 10;
const MarginTop = Platform.OS === 'ios' ? 4 : 10;
const Margin = Platform.OS === 'ios' ? 10 : 10;



const styles = StyleSheet.create({
  container: {
    paddingLeft: paddingLeftValue,
    padding: paddingValue,
    margin: Margin,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    marginTop: MarginTop,
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
});

export default SearchBar;
