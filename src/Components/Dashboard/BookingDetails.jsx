import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollVie,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

const BookingDetailsScreen = ({route}) => {
  const {booking} = route.params;
console.log('booking', booking);
  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Booking details not available</Text>
      </View>
    );
  }
const navigation = useNavigation();

const handleBackHome = () => {
  navigation.goBack();
};

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>{booking.title} Pods Details</Text> */}
      <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
        <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
          <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.header}>{booking.title} Pods Details</Text>
      </View>
      <View style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
        <QRCode value={booking.qrCodeData} size={200} />
      </View>
      <View style={{paddingTop:50}}>
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
          <Text style={styles.detailValue}>{booking.bookingDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Start Time:</Text>
          <Text style={styles.detailValue}>{booking.startTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>end Time:</Text>
          <Text style={styles.detailValue}>{booking.endTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={styles.detailValue}>{booking.status}</Text>
        </View>
      </View>
      {/* <Image source={{uri: booking.image}} style={styles.image} />
      <Text style={styles.subTitle}>{booking.placeName}</Text>
      <Text style={styles.address}>{booking.address}</Text>
      <View style={styles.ratingRow}>
        <Icon name="place" size={20} color="#000" />
        <Text style={styles.rating}>{booking.rating}</Text>
      </View> */}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
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
    color:"#000"

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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    color: '#757575',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  rating: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default BookingDetailsScreen;
