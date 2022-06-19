import { StyleSheet, Text, TextInput } from 'react-native'
import React from 'react'

const Input = ({ placeholder, changeHandler, value, secure, keyboardType }) => {
  return (
    <TextInput
      style={{...styles.input, marginTop: 10}}
      placeholderTextColor={placeholder.color}
      placeholder={placeholder.text}
      onChangeText={changeHandler}
      value={value}
      secureTextEntry={secure}
      keyboardType={keyboardType || 'default'}
    />
  )
}

export default Input

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#2A2631',
    width: 350,
    height: 45,
    borderRadius: 4,
    borderColor: '#07060B',
    color: '#fff',
    paddingLeft: 20,
    fontSize: 16
  },
})