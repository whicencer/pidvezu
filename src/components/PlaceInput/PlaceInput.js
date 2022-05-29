import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const PlaceInput = ({ placeholder, setCoord }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      fetchDetails={true}
      onPress={(data, details = null) => {
        setCoord({ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng })
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
  )
}

export default PlaceInput

const styles = StyleSheet.create({})