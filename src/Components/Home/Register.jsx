
// import {useNavigation, useRoute} from '@react-navigation/native';
// import axios from 'axios';
// import React, {useContext, useState} from 'react';
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
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from '../../context/Authcontext';

// const Register = () => {
//   const {handleSubmitRegister} = useContext(AuthContext);

//   const navigation = useNavigation();
//   const route = useRoute();
//   const {phoneNumber} = route.params;
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');


//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={styles.backButton}>
//         <Icon name="arrow-back" size={30} color="black" />
//       </TouchableOpacity>
//       <KeyboardAvoidingView behavior="padding" style={styles.container}>
//         <Text style={styles.title}>Register</Text>
//         {error ? <Text style={styles.errorText}>{error}</Text> : null}
//         <TextInput
//           style={styles.input}
//           placeholder="First Name"
//           value={firstname}
//           onChangeText={setFirstname}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Last Name"
//           value={lastname}
//           onChangeText={setLastname}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Phone Number"
//           value={phoneNumber}
//           editable={false}
//         />
//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={() =>
//             handleSubmitRegister(navigation, firstname, lastname, email)
//           }>
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
//   errorText: {
//     color: 'red',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'grey',
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     color: '#000',
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

// export default Register;
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/Authcontext';

const Register = () => {
  const {handleSubmitRegister} = useContext(AuthContext);

  const navigation = useNavigation();
  const route = useRoute();
  const {phoneNumber} = route.params;
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Function to validate inputs and handle submission
  const handleRegister = () => {
    // Reset the error message first
    setError('');

    // Check if all fields are filled
    if (!firstname || !lastname || !email) {
      setError('Please fill in all the fields.');
      return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // If no errors, proceed with form submission
    handleSubmitRegister(navigation, firstname, lastname, email);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Register</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstname}
          onChangeText={setFirstname}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastname}
          onChangeText={setLastname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          editable={false}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
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
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
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

export default Register;
