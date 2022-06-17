import * as Location from 'expo-location';

export const getAddress = async (fromCoord, toCoord) => {
  (await Location.requestForegroundPermissionsAsync())
  const from = await Location.reverseGeocodeAsync({
    latitude: fromCoord.latitude,
    longitude: fromCoord.longitude
  })
  const to = await Location.reverseGeocodeAsync({
    latitude: toCoord.latitude,
    longitude: toCoord.longitude
  })

  const fromString = `${from[0].city}, ${from[0].district}, ${from[0].street}, ${from[0].streetNumber}`
  const toString = `${to[0].city}, ${to[0].district}, ${to[0].street}, ${to[0].streetNumber}`

  return (`${fromString} -> ${toString}`)
}