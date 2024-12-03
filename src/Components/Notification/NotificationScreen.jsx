
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';
import {AuthContext} from '../../context/Authcontext';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {userToken, fetchNotifications, notifications, isLoading} =
    useContext(AuthContext);
 
 useEffect(() => {
   // Fetch notifications on mount
   fetchNotifications();

   // Set up polling to fetch notifications every 60 seconds
   const interval = setInterval(fetchNotifications, 60000);

   // Clean up interval on unmount
   return () => clearInterval(interval);
 }, [userToken]);

  const handleBackHome = () => {
    navigation.goBack();
  };
  const handleCardPress = (notification)=> {
    setSelectedNotification(notification);
 console.log('sele', notification);

    setModalVisible(true);
  };

 const handleRatingSubmit = async () => {
   try {
     const response = await axios.put(
       `https://privily.co/api/user/rate/${selectedNotification.booking_id}/${selectedNotification.podId}`,
       {message: feedback, rating},
       {
         headers: {
           Authorization: `Bearer ${userToken}`,
         },
       },
     );
     console.log('response', response);
     if (
       response.data.message ===
       'Rating submitted successfully for both booking and product'
     ) {
       Alert.alert('Feedback submitted successfully');
       setModalVisible(false);
       setRating(0);
       setFeedback('');
       fetchNotifications();
     }
   } catch (error) {
     console.error(
       'Error submitting feedback:',
       error.response?.data || error.message,
     );
     Alert.alert('Error submitting feedback');
   }
 };


 if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView removeClippedSubviews={true}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.header}>Notifications</Text>
        </View>
        {notifications.length === 0 ? (
          <View style={styles.contentContainer}>
            <View style={styles.circle} />
            <Text style={styles.message}>You don't have any Notification</Text>
            <Text style={styles.subMessage}>
              Start bookings and purchase their listings!
            </Text>
            <Button
              title="Start Booking"
              color="#FF1200"
              onPress={() => Alert('Start Booking')}
            />
          </View>
        ) : (
          <View style={styles.contentContainer2}>
            {notifications.map(notification => (
              <TouchableOpacity
                key={notification.booking_id}
                style={styles.card}
                onPress={() => handleCardPress(notification)}>
                <Text style={styles.cardText0}>Reminder</Text>
                <Text style={styles.cardText}>
                  Your Booking has been Completed !!
                </Text>
                <Text style={styles.cardText2}>
                  Tap on this notification and kindly rate us{' '}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Icon name="close" size={30} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalText}>Provide your feedback</Text>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Icon
                      name="star"
                      size={30}
                      color={star <= rating ? '#FFD700' : '#C0C0C0'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Provide your feedback..."
                value={feedback}
                onChangeText={setFeedback}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleRatingSubmit}>
                <Text style={styles.submitButtonText}>Submit Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display:"flex",
    justifyContent:"center",
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 25,
    color: '#000',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer2: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    padding: 5,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subMessage: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  cardText: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  cardText0: {
    fontSize: 12,
    color: '#FE372F',
    fontWeight:"bold"
  },
  cardText2: {
    fontSize: 13,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding semi-transparent background for blur effect
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: '#FF1200',
    borderRadius: 20,
    padding: 13,
    elevation: 2,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});

export default NotificationScreen;
