import React from 'react';
import {View, Text, Button} from 'react-native';

const CancelScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: 'bold',color:"black"}}>Payment Canceled</Text>
      <Button
        title="Go Back Home"
        onPress={() => navigation.navigate('HomeMain')}
      />
    </View>
  );
};

export default CancelScreen;
