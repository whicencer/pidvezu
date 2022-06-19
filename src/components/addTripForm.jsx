import { StyleSheet, TextInput, View, Pressable, Text, Button, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { phoneValidation } from '../utils/validators/phoneValidation'
import InputSpinner from "react-native-input-spinner"
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'expo-modules-core'
import Icon from 'react-native-vector-icons/Ionicons'
import Map from './road-map'

import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { getAuth } from "@firebase/auth";
import { getAddress } from '../utils/getAddress'
import { useNavigation } from '@react-navigation/native'
import PlaceInput from './place-input'

const AddTripForm = ({ input, setInput }) => {
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [mapShow, setMapShow] = useState(false)

  const navigation = useNavigation() 

  const [fromCoord, setfromCoord] = useState({
    latitude: 49.587993,
    longitude: 34.551489,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [toCoord, settoCoord] = useState({
    latitude: 49.590695,
    longitude: 34.548195,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || input.date
    setShow(Platform.OS === 'ios')
    setInput({...input, date: currentDate})
  }

  const showMode = currentMode => {
    setShow(true)
    setMode(currentMode)
  }

  const createTrip = () => {
    const randomId = Math.random()
    const myDoc = doc(db, `user_${getAuth().currentUser.uid}`, `trip_${randomId}`)
    const globalDoc = doc(db, 'trips', `trip_${randomId}`)
  
    const docData = input

    setDoc(myDoc, docData)
      .then(() => {
        setDoc(globalDoc, docData)
        navigation.navigate('Home')
        alert('Поїздку добавлено')
      })
      .catch(error => {
        alert(error.message)
      })

  }

  return (
    <View style={styles.formData}>
      {
        !mapShow && (
          <View style={{ alignItems: 'center' }}>
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
              <Pressable style={styles.mapButton} onPress={() => setMapShow(true)}>
                <Icon name='map-outline' style={{ color: '#fff', fontSize: 20 }} />
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
                buttonStyle={{ backgroundColor: '#202020' }}
                inputStyle={{ backgroundColor: '#282828', color: '#fff', fontWeight: 'bold' }}
                style={{ backgroundColor: '#202020' }}
              />
            </View>
            <Pressable style={styles.buttonAdd} onPress={() => {
              if(input.name.length < 1) {
                alert('Помилка')
              } else {
                phoneValidation(input.phone, () => createTrip(), () => alert('помилка'))
              }
            }}>
              <Text style={{ color: '#fff' }}>Створити поїздку</Text>
            </Pressable>
          </View>
        )
      }
      
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
      {
        mapShow && (
          <View style={{ width: Dimensions.get('window').width-20 }}>
            <PlaceInput placeholder={'Звідки'} setCoord={setfromCoord} />
            <PlaceInput placeholder={'Куди'} setCoord={settoCoord} />
            <View>
              <Pressable onPress={() => {
                getAddress(fromCoord, toCoord)
                  .then(data => {
                    setInput({ ...input, route: data, fromCoord: fromCoord, toCoord: toCoord })
                  })
                setMapShow(false)
              }} style={{ ...styles.button, backgroundColor: '#f2faf2' }}>
                <Text>Далі</Text>
              </Pressable>
              <Pressable onPress={() => {
                setMapShow(false)
              }} style={{ ...styles.button, backgroundColor: '#faf1fa', marginTop: 5 }}>
                <Text>Назад</Text>
              </Pressable>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default AddTripForm

const styles = StyleSheet.create({
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
  mapButton: {
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: '#262626'
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