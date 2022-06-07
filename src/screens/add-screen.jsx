import { StyleSheet, TextInput, View, Pressable, Text } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'expo-modules-core'
import { phoneValidation } from '../utils/validators/phoneValidation'
import InputSpinner from "react-native-input-spinner";

// TODO: подумать про то как уменьшить количество логики и кода в общем

const AddScreen = () => {
  const [input, setInput] = useState({
    name: '',
    phone: '',
    date: new Date(),
    passengers: 0
  })
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || input.date
    setShow(Platform.OS === 'ios')
    setInput({...input, date: currentDate})

    let tempDate = new Date(currentDate)
    let fDate = `${tempDate.getDate()}/${tempDate.getMonth()+1}/${tempDate.getFullYear()}`
    let fTime = `${tempDate.getHours()}:${tempDate.getMinutes()}`

    // console.log(currentDate >= Date.now()) // delete our trip
    // console.log(fDate, fTime)
  }

  const showMode = currentMode => {
    setShow(true)
    setMode(currentMode)
  }

  return (
    <View style={styles.container}>
      <View style={styles.formData}>
        <Text style={styles.formTitle}>Заповніть форму</Text>
        <TextInput
          placeholder="Ваше ім'я"
          placeholderTextColor='#fff'
          value={ input.name }
          onChangeText={(text) => setInput({...input, name: text})}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Ваш номер телефону"
          placeholderTextColor='#fff'
          value={ input.phone }
          keyboardType='phone-pad'
          onChangeText={(text) => setInput({...input, phone: text})}
          style={{ ...styles.textInput, marginTop: 20 }}
        />
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Pressable style={styles.button} onPress={() => showMode('date')}>
            <Text style={{ color: '#fff' }}>Виберіть дату</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => showMode('time')}>
            <Text style={{ color: '#fff' }}>Виберіть Час</Text>
          </Pressable>
        </View>
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ color: '#fff', marginBottom: 10, fontSize: 18 }}>Кількість пасажирів</Text>
          <InputSpinner
            max={5}
            min={1}
            step={1}
            value={input.passengers}
            skin='modern'
            onChange={(num) => {
              setInput({...input, passengers: num})
            }}
          />
        </View>
        <Pressable style={styles.buttonAdd} onPress={() => {
          phoneValidation(input.phone, () => alert('успіх'), () => alert('помилка'))
          console.log(input)
        }}>
          <Text style={{ color: '#fff' }}>Створити поїздку</Text>
        </Pressable>
        
        {
          show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={input.date}
              mode={mode}
              is24Hour={true}
              display='default'
              onChange={onChange}
            />
          )
        }
      </View>
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
  },
  formData: {
    backgroundColor: '#292929',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
    elevation: 5,
    alignItems: 'center'
  },
  formTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 30
  },
  textInput: {
    backgroundColor: '#262626',
    width: 350,
    height: 50,
    borderRadius: 15,
    color: '#fff',
    paddingLeft: 10,
    fontSize: 16
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: '#262626'
  },
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 60,
    borderRadius: 4,
    elevation: 3,
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: '#434343'
  }
})