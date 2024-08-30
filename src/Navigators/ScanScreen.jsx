import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FONTSIZE} from '../Themes/Theme';

const ScanScreen = () => {
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);

  const handleScanMePress = () => {
    setCameraVisible(true);
  };

  const handleBarCodeScanned = ({data}) => {
    setScannedCode(data);
    setCameraVisible(false);
    alert(`QR Code scanned: ${data}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleScanMePress} style={styles.scanMeText}>
        <Icon name="qr-code" size={35} color="#fff" />
        <Text style={styles.scanMeTextLabel}>Scan Me</Text>
      </TouchableOpacity>

      <Modal visible={isCameraVisible} animationType="slide">
        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead={handleBarCodeScanned}
          captureAudio={false}>
          <TouchableOpacity
            onPress={() => setCameraVisible(false)}
            style={styles.backButton}>
            <Icon name={'close'} size={FONTSIZE.size_30} color={'#fff'} />
          </TouchableOpacity>
          <View style={styles.cameraOverlay}>
            <Text style={styles.cameraText}>
              Point your camera at a QR code
            </Text>
          </View>
        </RNCamera>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanMeText: {
    padding: 10,
    backgroundColor: '#FE372F',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  scanMeTextLabel: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 10,
  },
  camera: {
    flex: 1,
  },
  backButton: {
    padding: 20,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 40,
  },
  cameraText: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
});

export default ScanScreen;
