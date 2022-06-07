import * as Location from 'expo-location';

export const getAddress = async (latitude, longitude) => {
  const address = await Location.reverseGeocodeAsync({latitude, longitude})
  return (`${address[0].city}, ${address[0].district}, ${address[0].street}, ${address[0].streetNumber}`)
}