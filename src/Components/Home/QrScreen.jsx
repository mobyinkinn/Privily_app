
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

const QrScreen = ({route}) => {
  const {booking} = route.params;
  const navigation = useNavigation();

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Booking details not available</Text>
      </View>
    );
  }

  const handleBackHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeMain'}],
    });
  };

  // Convert the startTime and endTime to hours and minutes
  const formatTime = dateTime => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use true if you want a 12-hour format
      timeZone: 'UTC',
    });
  };
  const formatDate = dateTime => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone:"UTC"
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
        <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
          <Icon name={'arrow-back'} size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.header}>Booking Preview</Text>
      </View>
      <View style={{display: 'flex', alignItems: 'center', padding: 20}}>
        <QRCode value={booking.qrCodeData} size={200} />
      </View>
      <View style={{paddingTop: 50}}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking Id:</Text>
          <Text style={styles.detailValue}>#{booking._id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Purpose:</Text>
          <Text style={styles.detailValue}>{booking.bookingPurpose}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking Date:</Text>
          <Text style={styles.detailValue}>
            {booking.bookingDate}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Start Time:</Text>
          <Text style={styles.detailValue}>
            {booking.bookingDate} {formatTime(booking.startTime)}
          </Text>
          {/* Format startTime */}
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>End Time:</Text>
          <Text style={styles.detailValue}>
            {formatDate(booking.bookingDate)} {formatTime(booking.endTime)}
          </Text>
          {/* Format endTime */}
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={styles.detailValue}>{booking.status}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    color: '#000',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
  },
  backButton: {
    padding: 10,
  },
});

export default QrScreen;
