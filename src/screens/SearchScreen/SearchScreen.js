import React, { useState, useEffect } from 'react'
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import * as Location from 'expo-location';

const SearchScreen = () => {
  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync()
      
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })()
  }, [])
  const [fromCoord, setfromCoord] = useState({
    latitude: 49.587993,
    longitude: 34.551489,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [toCoord, settoCoord] = useState({
    latitude: 49.590695,
    longitude: 34.548195,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getAddress = async (latitude, longitude) => {
    const address = await Location.reverseGeocodeAsync({latitude, longitude})
    alert(`${address[0].city}, ${address[0].district}, ${address[0].street}, ${address[0].streetNumber}`)
  }

  return (
    <View style={{ marginTop: 10, flex: 1 }}>
      <PlaceInput placeholder={'Звідки'} setCoord={setfromCoord} />
      <PlaceInput placeholder={'Куди'} setCoord={settoCoord} />
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 49.587993,
          longitude: 34.551489,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <MapView.Marker 
          draggable={true}
          onDragEnd={(e) => {
            getAddress(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
            setfromCoord(e.nativeEvent.coordinate)}}
          coordinate={fromCoord}
          opacity={0.8}
          title='Звідки'
        />
        <MapView.Marker 
          draggable={true}
          onDragEnd={(e) => settoCoord(e.nativeEvent.coordinate)}
          coordinate={toCoord}
          opacity={0.8}
          title='Куди'
          rotation={180}
        />
        <MapViewDirections
          origin={fromCoord}
          destination={toCoord}
          strokeColor='#444444'
          strokeWidth={4}
          optimizeWaypoints={true}
          apikey={'AIzaSyA9mGzTwKNy_2cdcMpu_Zp3D8pH6GZ7IxY'}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});

export default SearchScreen