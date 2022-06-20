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
        key: 'AIzaSyCVZRzqHA7Pyen3uXV2jHyTcAjy7oLb6Vc',
        language: 'uk'
      }}
      styles={{
        container: { flex: 0, width: '100%', zIndex: 1, },
      }}
    />
  )
}

export default PlaceInput