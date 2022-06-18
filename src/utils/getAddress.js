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

  const fromString = `${from[0].city}`
  const toString = `${to[0].city}`

  return (`${fromString} -> ${toString}`)
}