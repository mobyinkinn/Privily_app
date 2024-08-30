

// import React, {useState} from 'react';
// import {Text, View, SafeAreaView, ScrollView} from 'react-native';
// import Carousel, {Pagination} from 'react-native-snap-carousel';

// const SLider = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const carouselItems = [
//     {
//       title: 'Item 1',
//       text: 'Text 1',
//     },
//     {
//       title: 'Item 2',
//       text: 'Text 2',
//     },
//     {
//       title: 'Item 3',
//       text: 'Text 3',
//     },
//     {
//       title: 'Item 4',
//       text: 'Text 4',
//     },
//     {
//       title: 'Item 5',
//       text: 'Text 5',
//     },
//   ];

//   const renderItem = ({item, index}) => {
//     return (
//       <View
//         style={{
//           backgroundColor: 'floralwhite',
//           borderRadius: 5,
//           height: 250,
//           padding: 30,
//           marginLeft: 25,
//           marginRight: 25,
//         }}>
//         <Text style={{fontSize: 30}}>{item.title}</Text>
//         <Text>{item.text}</Text>
//       </View>
//     );
//   };

//   return (
//     <ScrollView>
//       <SafeAreaView
//         style={{flex: 1, backgroundColor: 'rebeccapurple', paddingTop: 50}}>
//         <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
//           <Carousel
//             data={carouselItems}
//             sliderWidth={300}
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
//             backgroundColor: 'rgba(255, 255, 255, 0.92)',
//           }}
//           inactiveDotOpacity={0.4}
//           inactiveDotScale={0.6}
//         />
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// export default SLider;




// import React, {useState, useEffect} from 'react';
// import {Text, View, SafeAreaView, ScrollView, Image} from 'react-native';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
// import axios from 'axios';

// const Slider = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [carouselItems, setCarouselItems] = useState({});



//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://privily.co/api/allpods');
//       setCarouselItems(response.data.data);
//       console.log('carouselItems', carouselItems);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
  
//   const renderItem = ({item, index}) => {
//     return (
//       <View
//         style={{
//           backgroundColor: '#fff',
//           borderRadius: 10,
//           height: 300,
//           padding: 10,
//           marginLeft: 15,
//           marginRight: 15,
//         }}>
//         <Image
//           source={{
//             uri: `https://privily.co/storage/podsimage/${item.featuredImage}`,
//           }}
//           style={{width: '100%', height: '70%', resizeMode: 'contain'}}
//         />
//         <Text style={{fontSize: 25, fontWeight: 'bold', color: '#000'}}>
//           {item.title}
//         </Text>
//         <Text>{item.address}</Text>
//       </View>
//     );
//   };

//   return (
//     <ScrollView>
//       <SafeAreaView style={{flex: 1, paddingTop: 2}}>
//         <View
//           style={{
//             padding: 18,
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//           <Text style={{fontSize: 28, color: '#000', fontWeight: 'bold'}}>
//             Pods to Explore
//           </Text>
//           <Text
//             style={{
//               fontSize: 15,
//               color: '#0083FF',
//               textDecorationLine: 'underline',
//             }}>
//             View All
//           </Text>
//         </View>
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
//             sliderWidth={300}
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

// export default Slider;





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

// const Slider = () => {
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
//     const response = await axios.get('http://10.0.2.2:4000/api/product');
//     const data = response.data;
//     setCarouselItems(data);
//   } catch (error) {
//     console.error('Error fetching banner data:', error);
//   }
// };

// useEffect(() => {
//   fetchData();
// }, []);


//   const renderItem = ({item}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('PodDetailPage', {
//             slug: item._id,
//             origin: 'HomeMain',
//           });
//         }}>
//         <View
//           style={{
//             backgroundColor: '#fff',
//             borderRadius: 10,
//             height: 300,
//             padding: 10,
//             marginLeft: 15,
//             marginRight: 15,
//           }}>
//           <Image
//             source={{
//               uri: `https://privily.co/storage/podsimage/${item.featuredImage}`,
//             }}
//             style={{width: '100%', height: '70%', resizeMode: 'contain'}}
//           />
//           <Text style={{fontSize: 25, fontWeight: 'bold', color: '#000'}}>
//             {item.title}
//           </Text>
//           <Text style={{color: '#000'}}>{item.address}</Text>
//           <View style={{marginBottom: 10, color: '#000'}}>
//             {item.features.map((feature, index) => (
//               <View
//                 key={index}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginBottom: 5,
//                   paddingTop: 5,
//                   gap: 10,
//                 }}>
//                 {/* <Icon name={feature.icon} size={25} color="grey" /> */}
//                 <Text style={{fontSize: 16, letterSpacing: 2, color: '#000'}}>
//                   {feature.name}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <ScrollView>
//       <SafeAreaView style={{flex: 1, paddingTop: 2}}>
//         <View
//           style={{
//             padding: 18,
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//           <Text style={{fontSize: 28, color: '#000', fontWeight: 'bold'}}>
//             Pods to Explore
//           </Text>
//           <Text
//           onPress={onViewall}
//             style={{
//               fontSize: 15,
//               color: '#0083FF',
//               textDecorationLine: 'underline',
//             }}>
//             View All
//           </Text>
//         </View>
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
//             sliderWidth={300}
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

// export default Slider;

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

// const Slider = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [carouselItems, setCarouselItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigation = useNavigation();

//   const onViewAll = () => {
//     navigation.navigate('Discovery');
//   };

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(
//         'http://10.0.2.2:4000/api/product',
//       );
//       const data = response.data.map(item => ({
//         ...item,
//         featuredImage: item.images.length > 0 ? item.images[0].url : null,
//       }));

//       setCarouselItems(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching banner data:', error);
//       setError('Error fetching data');
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderItem = ({item}) => {
//     console.log('item', item.featuredImage);
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('PodDetailPage', {
//             slug: item._id,
//             origin: 'HomeMain',
//           });
//         }}>
//         <View
//           style={{
//             backgroundColor: '#fff',
//             borderRadius: 10,
//             height: 300,
//             padding: 10,
//             marginLeft: 15,
//             marginRight: 15,
//           }}>
//           {item.featuredImage ? (
//             <Image
//               source={{
//                 uri: `http://10.0.2.2:4000${item.featuredImage}`,
//               }}
//               style={{width: '100%', height: '70%', resizeMode: 'contain'}}
//             />
//           ) : (
//             <Text>No Image Available</Text>
//           )}
//           <Text style={{fontSize: 25, fontWeight: 'bold', color: '#000'}}>
//             {item.title}
//           </Text>
//           <Text style={{color: '#000'}}>{item.address}</Text>
//           <View style={{marginBottom: 10, color: '#000'}}>
//             {item.features.map((feature, index) => (
//               <View
//                 key={index}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginBottom: 5,
//                   paddingTop: 5,
//                   gap: 10,
//                 }}>
//                 <Text style={{fontSize: 16, letterSpacing: 2, color: '#000'}}>
//                   {feature.name}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   return (
//     <ScrollView>
//       <SafeAreaView style={{flex: 1, paddingTop: 2}}>
//         <View
//           style={{
//             padding: 18,
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//           <Text style={{fontSize: 28, color: '#000', fontWeight: 'bold'}}>
//             Pods to Explore
//           </Text>
//           <Text
//             onPress={onViewAll}
//             style={{
//               fontSize: 15,
//               color: '#0083FF',
//               textDecorationLine: 'underline',
//             }}>
//             View All
//           </Text>
//         </View>
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
//             sliderWidth={300}
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

// export default Slider;





// import React, {useState, useEffect, useCallback} from 'react';
// import {
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';
// import axios from 'axios';

// const Slider = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [carouselItems, setCarouselItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigation = useNavigation();

//   const onViewAll = () => {
//     navigation.navigate('Discovery');
//   };

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get('http://10.0.2.2:4000/api/product');
//       const data = response.data.map(item => ({
//         ...item,
//         featuredImage: item.images.length > 0 ? item.images[0].url : null,
//       }));
//       setCarouselItems(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching banner data:', error);
//       setError('Error fetching data');
//       setIsLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchData();
//     }, []),
//   );

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderItem = ({item}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('PodDetailPage', {
//             slug: item._id,
//             origin: 'HomeMain',
//           });
//         }}>
//         <View
//           style={{
//             backgroundColor: '#fff',
//             borderRadius: 10,
//             height: 300,
//             padding: 10,
//             marginLeft: 15,
//             marginRight: 15,
//           }}>
//           <Image
//             source={{
//               uri: `http://10.0.2.2:4000${item.featuredImage}`,
//             }}
//             style={{width: '100%', height: '70%', resizeMode: 'contain'}}
//           />
//           <Text style={{fontSize: 25, fontWeight: 'bold', color: '#000'}}>
//             {item.title}
//           </Text>
//           <Text style={{color: '#000'}}>{item.address}</Text>
//           <View style={{marginBottom: 10, color: '#000'}}>
//             {item.features.map((feature, index) => (
//               <View
//                 key={index}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginBottom: 5,
//                   paddingTop: 5,
//                   gap: 10,
//                 }}>
//                 <Text style={{fontSize: 16, letterSpacing: 2, color: '#000'}}>
//                   {feature.name}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   return (
//     <ScrollView>
//       <SafeAreaView style={{flex: 1, paddingTop: 2}}>
//         <View
//           style={{
//             padding: 18,
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//           <Text style={{fontSize: 28, color: '#000', fontWeight: 'bold'}}>
//             Pods to Explore
//           </Text>
//           <Text
//             onPress={onViewAll}
//             style={{
//               fontSize: 15,
//               color: '#0083FF',
//               textDecorationLine: 'underline',
//             }}>
//             View All
//           </Text>
//         </View>
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
//             sliderWidth={300}
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

// export default Slider;


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
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const onViewAll = () => {
    navigation.navigate('Discovery');
  };
 const features = [
   {name: 'Comfortable chairs', icon: 'chair'},
   {name: 'Unlimited Wi-Fi', icon: 'wifi'},
   {name: 'Sound Proof', icon: 'hearing'},
   {name: 'Charging', icon: 'power'},
   {name: '24/7 Access', icon: 'lock'},
 ];
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        'http://10.0.2.2:4000/api/product',
      );
      const data = response.data
        .filter(item => !item.isBlocked) // Filter out blocked items
        .map(item => ({
          ...item,
          featuredImage: item.images.length > 0 ? item.images[0].url : null,
        }));

      setCarouselItems(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching banner data:', error);
      setError('Error fetching data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PodDetailPage', {
            slug: item._id,
            origin: 'HomeMain',
          });
        }}>
        <View
          style={{
            display:"flex",
            paddingVertical:10,
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 300,
            padding: 10,
            marginLeft: 15,
            marginRight: 15,
          }}>
          {item.featuredImage ? (
            <Image
              source={{
                uri: `http://10.0.2.2:4000${item.featuredImage}`,
              }}
              style={{width: '100%', height: '60%', resizeMode: 'contain'}}
            />
          ) : (
            <Text>No Image Available</Text>
          )}
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
            {item.title}
          </Text>
          <Text style={{color: '#000'}}>
            {item.location.name} {item.location.city} {item.location.state}{' '}
            {item.location.zip}
          </Text>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent:"space-between", paddingVertical:7}}>
            <View
              style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                backgroundColor: '#1D9740',
                color: 'white',
                paddingHorizontal:10,
                borderRadius: 10,
                fontWeight: 'bold',
              }}>
              <Icon name="star" size={25} color="white" />
              <Text style={{color:"white", fontSize:20}}>{item.totalRating}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {features.map((feature, index) => (
                <View key={index} style={{margin: 5}}>
                  <Icon name={feature.icon} size={25} color="grey" />
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1, paddingTop: 2}}>
        <View
          style={{
            paddingHorizontal: 18,
            paddingVertical:1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 28, color: '#000', fontWeight: 'bold'}}>
            Pods to Explore
          </Text>
          <Text
            onPress={onViewAll}
            style={{
              fontSize: 15,
              color: '#0083FF',
              textDecorationLine: 'underline',
            }}>
            View All
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            padding: 6,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Carousel
            layout="default"
            data={carouselItems}
            sliderWidth={300}
            itemWidth={300}
            renderItem={renderItem}
            onSnapToItem={index => setActiveIndex(index)}
          />
          
        </View>
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          containerStyle={{paddingTop: 20}}
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

export default Slider;
