import React, { useState } from 'react'
import { StyleSheet, View, Dimensions, KeyboardAvoidingView  } from 'react-native'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getAddress } from '../utils/getAddress';
import PlaceInput from './place-input'

const Map = ({ fromCoord, setfromCoord, toCoord, settoCoord }) => {
  return (
    <KeyboardAvoidingView behavior='height'>
      <View>
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
            rotation={45}
            opacity={.8}
            title='Звідки'
          >
            <View style={styles.marker2} />
          </MapView.Marker>
          <MapView.Marker 
            draggable={true}
            onDragEnd={(e) => settoCoord(e.nativeEvent.coordinate)}
            coordinate={toCoord}
            rotation={45}
            opacity={.8}
            title='Куди'
          >
            <View style={styles.marker} />
          </MapView.Marker>
          <MapViewDirections
            origin={fromCoord}
            destination={toCoord}
            strokeColor='#444444'
            precision='high'
            strokeWidth={4}
            optimizeWaypoints={true}
            apikey={'AIzaSyA9mGzTwKNy_2cdcMpu_Zp3D8pH6GZ7IxY'}
          />
        </MapView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Map

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marker: {
    backgroundColor: '#dde026',
    width: 30,
    height: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50
  },
  marker2: {
    backgroundColor: '#d43535',
    width: 30,
    height: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50
  }
})