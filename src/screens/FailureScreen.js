import React from 'react';
import {View, Text, Button} from 'react-native';

const FailureScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Payment Failed</Text>
      <Button
        title="Try Again"
        onPress={() => navigation.navigate('Payment')}
      />
    </View>
  );
};

export default FailureScreen;
