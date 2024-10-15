// import { Text, View } from 'react-native'
// import React, { Component } from 'react'

// export class SplashScr extends Component {
//   render() {
//     return (
//       <View>
//         <Text>SplashScr</Text>
//       </View>
//     )
//   }
// }

// export default SplashScr



// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
// } from 'react-native';

// const SplashScr = () => {
//   return (
//     <KeyboardAvoidingView behavior="padding" style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Your Contact Details?</Text>
//         <Text style={styles.subtitle}>
//           We’ll Text You a Code to Verify Your Email or Number
//         </Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Your Email or Number*"
//         keyboardType="email-address" // This can be changed based on the expected input
//       />

//       <Text style={styles.helpText}>please fill any one of them</Text>

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Let's Started</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   header: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: 'gray',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   helpText: {
//     fontSize: 12,
//     color: 'gray',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'red',
//     padding: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default SplashScr;


// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';

// const SplashScr = () => {
//     const navigation = useNavigation();

//     const handleBackHome = () => {
//       navigation.goBack();
//     };
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//         <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
//       </TouchableOpacity>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <View style={styles.container}>
//         <Text style={styles.title}>Your Contact Details?</Text>
//         <Text style={styles.description}>
//           We’ll Text You a Code to Verify Your Email or Number
//         </Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Your Email or Number*"
//             placeholderTextColor="#A9A9A9"
//           />
//           <Text style={styles.helpText}>please fill any one of them</Text>
//         </View>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Let's Started</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flex: 1,
//     padding: 24,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 35,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     textAlign: 'center',
//     color: '#000',
//   },
//   description: {
//     fontSize: 16,
//     color: '#696969',
//     marginBottom: 32,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     marginBottom: 16,
//     width: '100%',
//   },
//   backButton: {
//     padding: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#d3d3d3',
//     borderRadius: 8,
//     padding: 16,
//     fontSize: 16,
//     color: '#000',
//   },
//   helpText: {
//     fontSize: 14,
//     color: '#808080',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#ff0000',
//     borderRadius: 30,
//     paddingVertical: 13,
//     paddingHorizontal: 25,
//     marginVertical: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 255,
//   },
//   buttonText: {
//     fontSize: 21,
//     color: '#fff',
//     fontWeight: '600',
//   },
// });

// export default SplashScr;






// import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';
// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const SplashScr = () => {
//   const navigation = useNavigation();
//   const [input, setInput] = useState('');
//   // const [error, setError] = useState('');
//   const fetchOtpdata = async () => {
//     try {
//       const response = await axios.post(
//         'https://privily-backend-new.onrender.com/api/user/app-login',
//         {
//           phoneNumber: input,
//         },
//       );

//       navigation.navigate('SplashScreen2', {phoneNumber: input});
//       console.log('response', response);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // const validateInput = () => {
//   //   const emailRegex = /\S+@\S+\.\S+/;
//   //   const phoneRegex = /^\d{10}$/; // Adjust regex according to your country's mobile number format if needed

//   //   if (!input) {
//   //     setError('Please fill in your email or phone number');
//   //     return false;
//   //   } else if (emailRegex.test(input) || phoneRegex.test(input)) {
//   //     setError('');
//   //     return true;
//   //   } else {
//   //     setError('Please enter a valid email or phone number');
//   //     return false;
//   //   }
//   // };
//   // const handleSubmit = () => {
//   //   if (validateInput()) {
//   //     fetchOtpdata();
//   //   }
//   // };


//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <View style={styles.container}>
//         <Text style={styles.title}>Your Contact Details?</Text>
//         <Text style={styles.description}>
//           We’ll Text You a Code to Verify Your Email or Number
//         </Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Your Email or Number*"
//             placeholderTextColor="#A9A9A9"
//             value={input}
//             onChangeText={setInput}
//             keyboardType="phone-pad"
//           />
//           {/* {!!error && <Text style={styles.errorText}>{error}</Text>} */}
//           <Text style={styles.helpText}>please fill any one of them</Text>
//         </View>
//         <TouchableOpacity style={styles.button} onPress={fetchOtpdata}>
//           <Text style={styles.buttonText}>Let's Started</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop:50
//   },
//   container: {
//     flex: 1,
//     padding: 24,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 35,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     textAlign: 'center',
//     color: '#000',
//   },
//   description: {
//     fontSize: 16,
//     color: '#696969',
//     marginBottom: 32,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     marginBottom: 16,
//     width: '100%',
//   },
//   backButton: {
//     padding: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#d3d3d3',
//     borderRadius: 8,
//     padding: 16,
//     fontSize: 16,
//     color: '#000',
//   },
//   helpText: {
//     fontSize: 14,
//     color: '#808080',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#ff0000',
//     borderRadius: 30,
//     paddingVertical: 13,
//     paddingHorizontal: 25,
//     marginVertical: 65,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 255,
//   },
//   buttonText: {
//     fontSize: 21,
//     color: '#fff',
//     fontWeight: '600',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 4,
//   },
// });

// export default SplashScr;


import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { AuthContext } from '../../context/Authcontext';

const countryCodes = [
  {label: 'India (+91)', value: '+91'},
  {label: 'South Africa (+27)', value: '+27'},
  // Add more country codes as needed
];
const SplashScr = () => {
 const {setPhoneNumber, phoneNumber: contextPhoneNumber} =
   useContext(AuthContext);
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('+91'); // Default country code
  const [phoneNumber, setPhoneNumberLocal] = useState('');
  const [error, setError] = useState('');

  const fetchOtpdata = async () => {
    try {
      const fullPhoneNumber = countryCode + phoneNumber;
      setPhoneNumber(fullPhoneNumber);
      const response = await axios.post(
        'http://10.0.2.2:4000/api/user/app-login',
        {
          phoneNumber: fullPhoneNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      navigation.navigate('SplashScreen2', {
        phoneNumber: fullPhoneNumber,
        handleSubmite,
      });
      console.log('response', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const validateInput = () => {
   const phoneRegex = /^\d{9}$|^\d{10}$/;

   let newPhone = "";

   if(phoneNumber.startsWith("0")){
     newPhone = phoneNumber.slice(1);
   }else{
     newPhone = phoneNumber;
   }
console.log("newphone", newPhone)
    if (!newPhone) {
      setError('Please fill in your phone number');
      return false;
    } else if (phoneRegex.test(newPhone)) {
      setError('');
      return true;
    } else {
      setError('Please enter a valid phone number');
      return false;
    }
  };

  const handleSubmite = () => {
    if (validateInput()) {
      fetchOtpdata();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text style={styles.title}>Your Contact Details?</Text>
        <Text style={styles.description}>
          We’ll Text You a Code to Verify Your Number
        </Text>
        <View style={styles.inputContainer}>
          <RNPickerSelect
            onValueChange={value => setCountryCode(value)}
            items={countryCodes}
            style={pickerSelectStyles}
            value={countryCode}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Phone Number*"
            placeholderTextColor="#A9A9A9"
            value={phoneNumber}
            onChangeText={setPhoneNumberLocal}
            keyboardType="phone-pad"
          />
          {!!error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmite}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
    display:"flex",
  },
  input: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#808080',
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff0000',
    borderRadius: 30,
    paddingVertical: 13,
    paddingHorizontal: 25,
    marginVertical: 65,
    alignItems: 'center',
    justifyContent: 'center',
    width: 255,
  },
  buttonText: {
    fontSize: 21,
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    color: 'black',
    marginBottom: 8,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    color: 'black',
    marginBottom: 8,
  },
});

export default SplashScr;
