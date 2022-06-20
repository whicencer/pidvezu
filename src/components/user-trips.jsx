import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserTrips = ({ trip }) => {
  const date = new Date(trip.date.seconds * 1000)

  const stringDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} о ${date.getHours()}:${date.getMinutes().toString().length === 1 ? `${date.getMinutes()}0` : date.getMinutes()}`
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{trip.name}</Text>
      <Text style={styles.textLittle}>{trip.route}</Text>
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '400' }}>Кількість пасажирів: {trip.passengers}</Text>
        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '400' }}>Номер телефону: {trip.phone}</Text>
        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '400' }}>Дата від'їзду: {stringDate}</Text>
      </View>
    </View>
  )
}

export default UserTrips

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2631',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    elevation: 5
  },
  text: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '400'
  },
  textLittle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})