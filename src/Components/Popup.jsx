

import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {AuthContext} from '../context/Authcontext';

const Popup = ({
  visible,
  onClose,
  availability,
  endTime,
  bookingId,
  navigation,
}) => {
  const [nextSlots, setNextSlots] = useState([]);
  const {getNextFalseSlots, extendBooking} = useContext(AuthContext);
console.log('getNextFalseSlots', getNextFalseSlots);
  useEffect(() => {
    if (availability.length > 0 && endTime) {
      const endTimeIndex = availability.indexOf(true); // Get the index of the end time slot
      const continuousFalseSlots = getNextFalseSlots(
        availability,
        endTimeIndex,
      );
      console.log('continuousFalseSlots', continuousFalseSlots);
      setNextSlots(continuousFalseSlots); // Limit to maximum 8 slots
      console.log('nextSlots', nextSlots);
    }
  }, [availability, endTime, getNextFalseSlots]);

  const handleExtendBooking = async extensionMinutes => {
    try {
      const response = await extendBooking(bookingId, extensionMinutes);
      if (response && response.message === 'Booking extended successfully') {
        // navigation.navigate('BookingPreview'); // Navigate to booking preview page
        Alert.alert(
          'Success',
          'Booking extended successfully',
          [{text: 'OK', onPress: onClose}],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error('Error extending booking:', error);
    }
  };

  const renderSlotButtons = () => {
    return nextSlots.map((slot, index) => {
      const time = (index + 1) * 15; // Calculate the time in minutes
      return (
        <TouchableOpacity
          key={index}
          style={styles.bookNowButton}
          onPress={() => handleExtendBooking(time)}>
          <Text style={styles.bookNowButtonText}>{`${time} min`}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.popup}>
          <Text style={styles.popupText}>
            Your booking is ending in 1 minute!
          </Text>
          {nextSlots.length > 0 ? (
            <>
              <View>
                <Text style={styles.popupText}>Next available slot(s):</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
                {renderSlotButtons()}
              </View>
            </>
          ) : (
            <Text style={styles.popupText}>
              No continuous free slots available
            </Text>
          )}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  popupText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  bookNowButton: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    elevation: 2,
    borderBlockColor: '#FE372F',
  },
  bookNowButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FE372F',
    fontWeight: 'bold',
  },
});

export default Popup;
