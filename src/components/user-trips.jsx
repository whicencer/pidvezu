import { StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location'
import React from 'react'

const UserTrips = ({ trip }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>from - to</Text>
      <View style={{ marginTop: 5 }}>
        <Text style={{ ...styles.text, ...styles.subText }}>Кількість пасажирів: {trip.passengers}</Text>
        <Text style={{ ...styles.text, ...styles.subText }}>Номер телефону: {trip.phone}</Text>
      </View>
    </View>
  )
}

export default UserTrips

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
    padding: 20,
    marginTop: 10
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  subText: {
    fontSize: 12,
    fontWeight: 'normal'
  }
})