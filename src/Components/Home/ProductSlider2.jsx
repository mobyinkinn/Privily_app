

// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
// import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';
// import { err } from 'react-native-svg';

// const Slider2 = () => {
//   const [activeIndex, setActiveIndex] = useState(0)
//   let [carouselItems, setCarouselItems] = useState([]);
// let [error, seterror] = useState()
//  const [isLoading, setisLoading] = useState()

//   const navigation = useNavigation();
//  const onViewall = () => {
//    navigation.navigate('Discovery');
//  };
// const fetchData = async () => {
//   try {
//     const response = await fetch('https://privily.co/api/allpods');
//     const jsonData = await response.json();
//     if (response.ok) {
//       setCarouselItems(jsonData.data); // Adjust according to the structure of your response
//    setisLoading(false)
//    console.log('carouselItems', carouselItems);
//     } else {
//       throw new Error(jsonData.message || 'Error fetching data');
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// useEffect(() => {
//   fetchData();
// }, []);


//   const renderItem = ({item}) => {
//     return (
//       <TouchableOpacity
//         // onPress={() => {
//         //   navigation.navigate('15MinutesFree', {
//         //     slug: item.slug,
//         //     origin: 'HomeMain',
//         //   });
//         // }}
//         >
//         <View
//           style={{
//             height: 300,
//           }}>
//           <Image
//             source={{
//               uri: `https://privily.co/storage/podsimage/${item.featuredImage}`,
//             }}
//             style={{width: '100%', height: '100%', resizeMode: 'contain'}}
//           />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <ScrollView>
//       <SafeAreaView style={{flex: 1, paddingTop: 2}}>
//         <View
//           style={{
//             flex: 1,
//             padding: 6,
//             flexDirection: 'row',
//             justifyContent: 'center',
//           }}>
//           <Carousel
          
//             layout="default"
//             data={carouselItems}
//             sliderWidth={400}
//             itemWidth={300}
//             renderItem={renderItem}
//             onSnapToItem={index => setActiveIndex(index)}
//           />
//         </View>
//         <Pagination
//           dotsLength={carouselItems.length}
//           activeDotIndex={activeIndex}
//           containerStyle={{paddingTop: 20}}
//           dotStyle={{
//             width: 10,
//             height: 10,
//             borderRadius: 5,
//             backgroundColor: '#FF1200',
//           }}
//           inactiveDotOpacity={0.4}
//           inactiveDotScale={0.6}
//         />
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// export default Slider2;


import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

const Slider2 = ({data}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
      onPress={() => {
        navigation.navigate(`${item.url}`, {
          origin: 'HomeMain',
        });
      }}
      >
        <View
          style={{
            height: 250,
          }}>
          <Image
            source={{
              uri: item.image,
            }}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            padding: 6,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Carousel
            layout="default"
            data={data}
            sliderWidth={400}
            itemWidth={400}
            renderItem={renderItem}
            onSnapToItem={index => setActiveIndex(index)}
          />
        </View>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeIndex}
          containerStyle={{paddingTop: -20}}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#FF1200',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Slider2;
