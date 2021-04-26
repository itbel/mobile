import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, FlatList, Animated } from 'react-native';
import { Thumbnail } from 'native-base';
import { MainStackParamList } from 'src/navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import * as Location from 'expo-location';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { Theme } from '../../Theme.style';
import HomeChurchItem from './HomeChurchItem';
import { HomeChurch, HomeChurchData } from './HomeChurchScreen';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  map: {
    width,
    height: height * 0.7,
  },
  list: {
    height: height * 0.4,
    backgroundColor: '#000',
    width,
  },
});
interface Params {
  route: RouteProp<MainStackParamList, 'HomeChurchMapScreen'>;
}
export default function HomeChurchMapScreen({ route }: Params): JSX.Element {
  const homeChurches: HomeChurchData = route?.params?.items;

  const [showModal, setShowModal] = useState(false);
  const [userLocation, setUserLocation] = useState<
    Location.LocationObject['coords']
  >();
  const listRef = useRef<FlatList | null>(null);
  const mapRef = useRef<MapView>(null);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (listRef && listRef?.current) {
      // TODO: this is not working right now
      listRef.current.scrollToOffset({
        animated: true,
        offset: selected * 296,
      });
    }
  }, [selected]);
  const getUserLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location?.coords);
    mapRef?.current?.animateCamera(
      {
        center: {
          latitude: location?.coords?.latitude ?? 43.4675,
          longitude: location?.coords?.longitude ?? -79.6877,
        },
        pitch: 1,
        heading: 1,
        zoom: 10,
        altitude: 3,
      },
      { duration: 3 }
    );
  };
  const Modal = () => {
    const translateY = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.timing(translateY, {
        toValue: 275,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [translateY]);
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 275],
                outputRange: [275, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
          backgroundColor: Theme.colors.gray1,
          bottom: 100,
          position: 'absolute',
        }}
      >
        <HomeChurchItem item={homeChurches[selected]} card modal />
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <MapView
        mapPadding={{ top: 16, left: 16, right: 16, bottom: 16 }}
        onMapReady={async () => getUserLocation()}
        showsUserLocation
        loadingEnabled
        ref={mapRef}
        style={styles.map}
      >
        {homeChurches?.length
          ? homeChurches
              .filter(
                (church) =>
                  church?.location?.address?.latitude &&
                  church?.location?.address?.longitude
              )
              .map((church, index) => {
                return (
                  <Marker
                    zIndex={selected === index ? 10 : -10}
                    identifier={church?.id ?? ''}
                    onPress={() => {
                      setSelected(index);
                    }}
                    key={church?.id}
                    coordinate={{
                      latitude: parseFloat(
                        church?.location?.address?.latitude ?? '43.6532'
                      ),
                      longitude: parseFloat(
                        church?.location?.address?.longitude ?? '-79.3832'
                      ),
                    }}
                  >
                    <View
                      style={{
                        padding: 12,
                        backgroundColor: selected === index ? 'black' : 'white',
                        borderRadius: 50,
                        borderWidth: 2,
                      }}
                    >
                      <Thumbnail
                        square
                        style={{ width: 18, height: 18 }}
                        source={
                          selected === index
                            ? Theme.icons.white.homeChurch
                            : Theme.icons.black.homeChurch
                        }
                      />
                    </View>
                  </Marker>
                );
              })
          : null}
      </MapView>

      <FlatList
        ref={listRef}
        showsHorizontalScrollIndicator
        snapToOffsets={[...Array(homeChurches.length)].map((x, index) => {
          const cardWidth = width - 64;
          const a = cardWidth * index;
          return a;
        })}
        decelerationRate={0.88}
        disableIntervalMomentum
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        contentContainerStyle={{ padding: 16 }}
        style={styles.list}
        getItemLayout={(data, index) => {
          const cardWidth = width * 0.8;
          return {
            // TODO: FIX OFFSET
            length: cardWidth,
            offset: cardWidth * index,
            index,
          };
        }} /* 
          The data fed to the flatlist needs to match data fed to markers. Indexes must match 
          Online Home Churches will not show up on map screen (?) 
        */
        data={homeChurches.filter(
          (church) =>
            church?.location?.address?.latitude &&
            church?.location?.address?.longitude
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setShowModal(!showModal)}>
            <HomeChurchItem active={index === selected} card item={item} />
          </TouchableOpacity>
        )}
        horizontal
      />
      <Modal />
    </View>
  );
}
