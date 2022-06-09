import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import AddTripForm from '../components/addTripForm'

const AddScreen = ({ route }) => {
  const [input, setInput] = useState({
    name: '',
    phone: '',
    date: new Date(),
    passengers: 0,
    route: ''
  })
  return (
    <View style={styles.container}>
      <AddTripForm input={input} setInput={setInput} />
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373737',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 40,
  }
})