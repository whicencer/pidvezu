import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import AddTripForm from '../components/addTripForm'

const AddScreen = () => {
  return (
    <View style={styles.container}>
      <AddTripForm />
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16151C',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 40,
  }
})