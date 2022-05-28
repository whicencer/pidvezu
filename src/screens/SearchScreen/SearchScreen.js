import React, { useState } from 'react'
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchScreen = () => {
  const [fromCoord, setfromCoord] = useState({
    latitude: 49.587993,
    longitude: 34.551489,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [toCoord, settoCoord] = useState({
    latitude: 49.234688,
    longitude: 34.551489,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={{ marginTop: 10, flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder='Звідки'
        fetchDetails={true}
        onPress={(data, details = null) => {
          setfromCoord({ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng })
        }}
        query={{
          key: 'AIzaSyA9mGzTwKNy_2cdcMpu_Zp3D8pH6GZ7IxY',
          language: 'uk'
        }}
        styles={{
          container: { flex: 0, width: '100%', zIndex: 1 },
          listView: { backgroundColor: '#fff' }
        }}
      />
      <GooglePlacesAutocomplete
        placeholder='Куди'
        fetchDetails={true}
        onPress={(data, details = null) => {
          settoCoord({ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng })
        }}
        query={{
          key: 'AIzaSyA9mGzTwKNy_2cdcMpu_Zp3D8pH6GZ7IxY',
          language: 'uk'
        }}
        styles={{
          container: { flex: 0, width: '100%', zIndex: 1 },
          listView: { backgroundColor: '#fff' }
        }}
      />
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 49.587993,
          longitude: 34.551489,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsCompass={true}
        showsPointsOfInterest = {false}
        provider="google"
      >
        <MapView.Marker 
          draggable={true}
          onDragEnd={(e) => setfromCoord(e.nativeEvent.coordinate)}
          coordinate={fromCoord}
          opacity={0.8}
          title='Откуда'
        />
        <MapView.Marker 
          draggable={true}
          onDragEnd={(e) => settoCoord(e.nativeEvent.coordinate)}
          coordinate={toCoord}
          opacity={0.8}
          title='Куда'
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