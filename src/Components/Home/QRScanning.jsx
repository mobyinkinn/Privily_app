import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import  RNCamera  from 'react-native-camera';

const QRCodeScannerScreen = () => {
  const navigation = useNavigation();

  const onBarCodeRead = e => {
    console.log('QR code scanned!', e.data);
    alert(`QR code scanned: ${e.data}`);
    navigation.goBack(); // Go back to the previous screen after scanning
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={onBarCodeRead}
        captureAudio={false}>
        <View style={styles.markerContainer}>
          <View style={styles.marker} />
        </View>
      </RNCamera>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
  },
  markerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 10,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default QRCodeScannerScreen;
