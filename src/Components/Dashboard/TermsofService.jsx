import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTSIZE, SPACING} from '../../Themes/Theme';

const TermsAndConditions = () => {
  const navigation = useNavigation();

  const handleBackHome = () => {
    navigation.goBack();
  };

  const lists = [
    {
      heading: '1. Acceptance of Terms',
      description:
        '1. By using the Privily service, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please refrain from using our service.',
    },
    {
      heading: '2. Services Provided',
      description:
        'Privily offers privacy work pod services, providing individuals with dedicated, soundproof, private workspaces equipped for professional use. Users may book and utilize these pods through our platform.',
    },
    {
      heading: '3. Booking and Access',
      description:
        '1. Booking: Users may book work pods through the Privily platform. Bookings are subject to availability and confirmation. 2. Access: Users will be provided with secure access to the booked work pod during the reserved time. Access codes or keys must be used responsibly, and any loss must be reported immediately.',
    },
    {
      heading: '4. User Responsibilities',
      description:
        '1. Conduct: Users are expected to conduct themselves professionally and respect the privacy and rights of other users. 2. Cleanliness: Users must leave the work pod in the same condition as they found it. Any damage or excessive cleaning required may result in additional charges.',
    },
    {
      heading: '5. Payments and Fees',
      description:
        '1. Payment: Users agree to pay the fees associated with booking work pods as and when specified on the Privily platform. 2. Refunds: Refunds are subject to the cancellation policy outlined on the platform.',
    },
    {
      heading: '6. Privacy and Data Security',
      description:
        '1. Data Collection: Privily may collect personal information for service provision. The Privacy Policy outlines the types of information collected, how it is used, and how it is secured. 2. Confidentiality: Users are responsible for maintaining the confidentiality of their access credentials and agree not to share them with unauthorized individuals.',
    },
    {
      heading: '7. Liability',
      description:
        '1. Limitation of Liability: Privily is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.',
    },
    {
      heading: '8. Termination',
      description:
        'Privily reserves the right to terminate user access for violation of terms and conditions or disruptive behavior without prior notice.',
    },
    {
      heading: '9. Governing Law',
      description:
        'These terms and conditions are governed by the laws of South Africa. Any disputes arising will be resolved through arbitration in Johannesburg.',
    },
    {
      heading: '10. Changes to Terms',
      description:
        'Privily reserves the right to update these terms and conditions. Users will be notified of any changes, and continued use of the service constitutes acceptance of the updated terms.',
    },
    {
      heading: '11. Indemnity',
      description:
        "1. User Indemnity: The user agrees to indemnify and hold Privily, its affiliates, officers, employees, and agents harmless from any claims, demands, damages, liabilities, costs, and expenses (including legal fees) arising out of or in connection with: a. The user's use of Privily's services. b. Violation of these terms and conditions. c. Violation of any applicable laws or regulations. d. The user's negligence or willful misconduct. 2. Third-Party Claims: Privily shall not be liable for any claims made by third parties arising from the user's use of the work pods or breach of these terms and conditions. 3. Limitation of Liability: The user agrees that Privily's total liability for any claim, whether in contract, tort (including negligence), or otherwise, shall not exceed the total amount paid by the user for the specific work pod booking giving rise to the claim.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 30}}>
        <TouchableOpacity onPress={handleBackHome} style={styles.backButton}>
          <Icon name={'arrow-back'} size={FONTSIZE.size_30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.header}>Terms and Conditions</Text>
      </View>
      {lists.map((item, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.heading}>{item.heading}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    padding: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#000',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    color: '#000',
  },
});

export default TermsAndConditions;
