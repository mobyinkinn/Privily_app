
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import { WebView } from 'react-native-webview';

// const PaymentScreen = () => {
//   const [amount, setAmount] = useState('');
//   const [checkoutUrl, setCheckoutUrl] = useState(null);

//   const createCheckout = async () => {
//     try {
//       const response = await axios.post('http://10.0.2.2:4000/api/payments', {
//         amount: parseInt(amount, 10) * 100, // Convert to cents
//         currency: 'ZAR',
//         cancelUrl: 'https://example.com/cancel',
//         successUrl: 'https://example.com/success',
//         failureUrl: 'https://example.com/failure',
//         metadata: {order_id: '12345'},
//         totalDiscount: 0,
//         totalTaxAmount: 0,
//         subtotalAmount: parseInt(amount, 10) * 100,
//         lineItems: [
//           {
//             displayName: 'Custom Payment',
//             name: 'Custom Payment',
//             quantity: 1,
//             price: parseInt(amount, 10) * 100,
//             pricingDetails: {
//               unitPrice: parseInt(amount, 10) * 100,
//               discount: 0,
//               tax: 0,
//             },
//           },
//         ],
//       });

//       if (response.data && response.data.redirectUrl) {
//         setCheckoutUrl(response.data.redirectUrl);
//       } else {
//         Alert.alert('Error', 'Failed to create checkout');
//       }
//     } catch (error) {
//       console.error('Error creating checkout:', error);
//       Alert.alert('Error', 'An error occurred while creating the checkout');
//     }
//   };

//   if (checkoutUrl) {
//     return (
//       <WebView
//         source={{ uri: checkoutUrl }}
//         style={{ marginTop: 20 }}
//         onNavigationStateChange={navState => {
//           if (navState.url === 'https://example.com/success') {
//             // Handle success
//             Alert.alert('Success', 'Payment was successful');
//             setCheckoutUrl(null);
//           } else if (navState.url === 'https://example.com/cancel') {
//             // Handle cancellation
//             Alert.alert('Cancelled', 'Payment was cancelled');
//             setCheckoutUrl(null);
//           } else if (navState.url === 'https://example.com/failure') {
//             // Handle failure
//             Alert.alert('Failure', 'Payment failed');
//             setCheckoutUrl(null);
//           }
//         }}
//       />
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Enter Amount</Text>
//       <TextInput
//         style={styles.input}
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         placeholder="Amount in ZAR"
//       />
//       <Button title="Submit" onPress={createCheckout} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default PaymentScreen;




import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';

const PaymentScreen = () => {
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const route = useRoute();
  const {bookingDetails, amount} = route.params;
  const navigation = useNavigation();

  const createCheckout = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:4000/api/payments', {
        amount: amount * 100, // Convert to cents
        currency: 'ZAR',
        cancelUrl: 'https://example.com/cancel',
        successUrl: 'https://example.com/success',
        failureUrl: 'https://example.com/failure',
        metadata: {order_id: bookingDetails._id},
        totalDiscount: 0,
        totalTaxAmount: 0,
        subtotalAmount: amount * 100,
        lineItems: [
          {
            displayName: 'Booking Payment',
            name: 'Booking Payment',
            quantity: 1,
            price: amount * 100,
            pricingDetails: {
              unitPrice: amount * 100,
              discount: 0,
              tax: 0,
            },
          },
        ],
      });

      if (response.data && response.data.redirectUrl) {
        setCheckoutUrl(response.data.redirectUrl);
      } else {
        Alert.alert('Error', 'Failed to create checkout');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      Alert.alert('Error', 'An error occurred while creating the checkout');
    }
  };

  if (checkoutUrl) {
    return (
      <WebView
        source={{uri: checkoutUrl}}
        style={{marginTop: 20}}
        onNavigationStateChange={navState => {
          if (navState.url === 'https://example.com/success') {
            // Handle success
            Alert.alert('Success', 'Payment was successful');
            navigation.navigate('QRScreen', {booking: bookingDetails});
            setCheckoutUrl(null);
          } else if (navState.url === 'https://example.com/cancel') {
            // Handle cancellation
            Alert.alert('Cancelled', 'Payment was cancelled');
            setCheckoutUrl(null);
          } else if (navState.url === 'https://example.com/failure') {
            // Handle failure
            Alert.alert('Failure', 'Payment failed');
            setCheckoutUrl(null);
          }
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount to be paid: {amount} ZAR</Text>
      <Button title="Proceed to Payment" onPress={createCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PaymentScreen;
