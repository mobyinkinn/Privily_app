
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import React, {useState,useContext} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { AuthContext } from '../../context/Authcontext';

// const SplashScr2 = () => {
//   const {handleSubmit, setCode, code} = useContext(AuthContext);
//      const navigation = useNavigation();
//      const route = useRoute();
//      const {phoneNumber} = route.params; 
//      const handleBackHome = () => {
//        navigation.goBack();
//      };
//   // const [code, setCode] = useState(['', '', '', '','','']); // Array to hold each digit of the code

//   const handleInput = (text, index) => {
//     const newCode = [...code];
//     newCode[index] = text;
//     setCode(newCode);
//     if (text && index < 5) {
//       // Automatically focus the next input field
//       this['input' + (index + 1)].focus();
//     }
//   };

// // const handleSubmit = async () => {
// //   try {
// //     const response = await axios.post(
// //       'http://10.0.2.2:4000/api/user/verify-otp',
// //       {
// //         phoneNumber: phoneNumber,
// //         otp: code.join(''),
// //       },
// //     );
// //  if (response.data.status === 1) {
// //    navigation.navigate('Register', {
// //      phoneNumber: phoneNumber,
// //    });
// //  } else if (response.data.status === 0) {
// //    // Save the token to AsyncStorage
// //    await AsyncStorage.setItem('userToken', response.data.token);
// //    // Navigate to Main
// //    navigation.navigate('Main');
// //  }
// //     // navigation.navigate('Main');
// //     // console.log('response', response);
// //   } catch (error) {
// //     console.error('Error fetching data:', error);
// //   }
// // };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//         <Icon name="arrow-back" size={30} color="black" />
//       </TouchableOpacity>
//       <KeyboardAvoidingView behavior="padding" style={styles.container}>
//         <Text style={styles.title}>What’s The Code?</Text>
//         <Text style={styles.description}>
//           Enter verification code sent to {phoneNumber}
//         </Text>
//         <View style={styles.inputContainer}>
//           {code.map((_, index) => (
//             <TextInput
//               key={index}
//               style={styles.inputBox}
//               keyboardType="numeric"
//               maxLength={1}
//               onChangeText={text => handleInput(text, index)}
//               ref={input => {
//                 this['input' + index] = input;
//               }}
//             />
//           ))}
//         </View>
//         <TouchableOpacity style={styles.resendButton}>
//           <Text style={styles.resendButtonText}>Resend Code</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(navigation)}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     padding: 10,
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color:"#000"
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 30,
//     textAlign: 'center',
//     color: '#000',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   inputBox: {
//     width: 40,
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'grey',
//     margin: 5,
//     fontSize: 24,
//     textAlign: 'center',
//   },
//   resendButton: {
//     marginBottom: 20,
//   },
//   resendButtonText: {
//     color: 'blue',
//     fontSize: 16,
//   },
//   submitButton: {
//     backgroundColor: 'red',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default SplashScr2;



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import axios from 'axios';
// import React, {useState, useContext, useRef} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {AuthContext} from '../../context/Authcontext';

// const SplashScr2 = () => {
//   const {handleSubmit, setCode, code} = useContext(AuthContext);
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {phoneNumber} = route.params;
//   const handleBackHome = () => {
//     navigation.goBack();
//   };

//   const inputRefs = useRef([]);

//   const handleInput = (text, index) => {
//     const newCode = [...code];
//     newCode[index] = text;
//     setCode(newCode);
//     if (text && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
//         <Icon name="arrow-back" size={30} color="black" />
//       </TouchableOpacity>
//       <KeyboardAvoidingView behavior="padding" style={styles.container}>
//         <Text style={styles.title}>What’s The Code?</Text>
//         <Text style={styles.description}>
//           Enter verification code sent to {phoneNumber}
//         </Text>
//         <View style={styles.inputContainer}>
//           {code.map((_, index) => (
//             <TextInput
//               key={index}
//               style={styles.inputBox}
//               keyboardType="numeric"
//               maxLength={1}
//               onChangeText={text => handleInput(text, index)}
//               ref={input => (inputRefs.current[index] = input)}
//             />
//           ))}
//         </View>
//         <TouchableOpacity style={styles.resendButton}>
//           <Text style={styles.resendButtonText}>Resend Code</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={() => handleSubmit(navigation)}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     padding: 10,
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#000',
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 30,
//     textAlign: 'center',
//     color: '#000',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   inputBox: {
//     width: 50,
//     height: 60,
//     borderWidth: 1,
//     borderColor: 'grey',
//     margin: 5,
//     fontSize: 24,
//     textAlign: 'center',
//   },
//   resendButton: {
//     marginBottom: 20,
//   },
//   resendButtonText: {
//     color: 'blue',
//     fontSize: 16,
//   },
//   submitButton: {
//     backgroundColor: 'red',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default SplashScr2;





import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useContext, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../context/Authcontext';

const SplashScr2 = () => {
  const {handleSubmit, setCode, code} = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const {phoneNumber, handleSubmite} = route.params;
  const handleBackHome = () => {
    navigation.goBack();
  };

  const inputRefs = useRef([]);

  const handleInput = (text, index) => {
    const newCode = [...code];
    if (text === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>What’s The Code?</Text>
        <Text style={styles.description}>
          Enter verification code sent to {phoneNumber}
        </Text>
        <View style={styles.inputContainer}>
          {code.map((_, index) => (
            <TextInput
              key={index}
              style={styles.inputBox}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={text => handleInput(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              ref={input => (inputRefs.current[index] = input)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.resendButton} onPress={handleSubmite}>
          <Text style={styles.resendButtonText}>Resend Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleSubmit(navigation)}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputBox: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: 'grey',
    margin: 5,
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
  },
  resendButton: {
    marginBottom: 20,
  },
  resendButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SplashScr2;
