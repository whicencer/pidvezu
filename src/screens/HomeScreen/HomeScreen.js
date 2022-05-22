import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../../firebase'

const HomeScreen = () => {
  return (
    <View>
      <Text>Logged as: {auth.currentUser?.email}</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})