import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Map from '../components/road-map'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native'
import PlaceInput from '../components/place-input'
import { LogBox } from 'react-native';

// Ignoring all logs or warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const MapScreen = () => {
  const navigation = useNavigation()

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

  return (
    <View style={styles.container}>
      <PlaceInput placeholder={'Звідки'} setCoord={setfromCoord} />
      <PlaceInput placeholder={'Куди'} setCoord={settoCoord} />
      <Button title='dali' onPress={() => {
        setInput({ ...input, route: [fromCoord, toCoord] })
        navigation.navigate('Add')
      }} />
      <Map
        fromCoord={fromCoord}
        setfromCoord={setfromCoord}
        toCoord={toCoord}
        settoCoord={settoCoord}
      />
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {}
})