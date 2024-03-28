// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             hello world
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, Button} from 'react-native';

const App = () => {
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [display, setdisplay] = useState(false);

  const resetFormData = () => {
    setdisplay(false);
    setpassword('');
    setemail('');
    setName('');
  };
  return (
    <>
      <View>
        <Text style={{fontSize: 30}}> Input form</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setemail(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setpassword(text)}
        />
      </View>
      <View style={{margin: 10, display:"flex", gap:10}}>
        <Button
          color={'green'}
          title="Submit"
          onPress={() => setdisplay(true)}
        />
      <Button title="Clear" onPress={resetFormData} />
      </View>
      <View>
        {display ? (
          <View>
            <Text style={{fontSize: 18}}>User Name is: {name}</Text>
            <Text style={{fontSize: 18}}>User email is: {email}</Text>
            <Text style={{fontSize: 18}}>User password is: {password}</Text>
          </View>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    color: 'blue',
    margin: 10,
    borderWidth: 2,
    borderColor: 'blue',
  },
});

export default App;
