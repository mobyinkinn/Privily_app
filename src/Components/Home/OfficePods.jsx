// import React, {useState} from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// const OfficePodsModal = ({visible, onClose}) => {
//   const [companyName, setCompanyName] = useState('');
//   const [workEmail, setWorkEmail] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');

//   const handleSubmit = () => {
//     // Handle form submission
//     console.log({companyName, workEmail, mobileNumber});
//     // Close the modal
//     onClose();
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={onClose}>
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Office Pods</Text>
//           <Text style={styles.modalSubtitle}>
//             Feel Free to Connect for Office Pods
//           </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Company Name"
//             value={companyName}
//             onChangeText={setCompanyName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Work Email"
//             value={workEmail}
//             onChangeText={setWorkEmail}
//             keyboardType="email-address"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Mobile Number"
//             value={mobileNumber}
//             onChangeText={setMobileNumber}
//             keyboardType="phone-pad"
//           />
//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.submitButtonText}>Submit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <Text style={styles.closeButtonText}>X</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalSubtitle: {
//     fontSize: 16,
//     color: 'gray',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   submitButton: {
//     width: '100%',
//     backgroundColor: '#FE372F',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   closeButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

// export default OfficePodsModal;


import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const OfficePodsModal = ({visible, onClose}) => {
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = async () => {
    const payload = {
      companyName,
      email: workEmail,
      phoneNumber: mobileNumber,
    };

    try {
      const response = await axios.post(
        'https://privily.co/api/user/corporate-pods',
        payload,
      );
      console.log('Response:', response.data);
      Alert.alert('Success', 'Your details have been submitted.');
      onClose();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'There was an error submitting your details. Please try again.',
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Office Pods</Text>
          <Text style={styles.modalSubtitle}>
            Feel Free to Connect for Office Pods
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            value={companyName}
            placeholderTextColor={'black'}
            onChangeText={setCompanyName}
          />
          <TextInput
            style={styles.input}
            placeholder="Work Email"
            placeholderTextColor={'black'}
            value={workEmail}
            onChangeText={setWorkEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobileNumber}
            placeholderTextColor={'black'}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"red"
  },
  modalSubtitle: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#FE372F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 15,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default OfficePodsModal;
