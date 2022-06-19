import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

const Button = ({ clickHandler, text }) => {
  return (
    <Pressable style={styles.button} onPress={clickHandler}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#07060B',
    paddingVertical: 7,
    paddingHorizontal: 32,
    elevation: 3,
    marginTop: 20,
    backgroundColor: '#2A2631'
  },
  buttonText: {
    color: '#ABA7B2',
    fontSize: 16,
  }
})