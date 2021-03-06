import { StyleSheet, TextInput, View, Pressable, Text, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { phoneValidation } from '../utils/validators/phoneValidation'
import InputSpinner from "react-native-input-spinner"
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'expo-modules-core'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux';

import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { getAuth } from "@firebase/auth";
import { getAddress } from '../utils/getAddress'
import { useNavigation } from '@react-navigation/native'
import PlaceInput from './place-input'
import { setDate, setName, setPassengers, setPhone, setRoute } from '../store/reducers/createData'
import { addGlobalTrip, addTrip } from '../store/reducers/trips'

const AddTripForm = () => {
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [mapShow, setMapShow] = useState(false)

  // Redux
  const dispatch = useDispatch()
  const createData = useSelector(state => state.createData)
  const globalTrips = useSelector(state => state.trips.globalTrips)
  const userTrips = useSelector(state => state.trips.userTrips)

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
    const currentDate = selectedDate || createData.date
    setShow(Platform.OS === 'ios')
    dispatch(setDate(currentDate))
  }

  const showMode = currentMode => {
    setShow(true)
    setMode(currentMode)
  }

  const createTrip = () => {
    const randomId = Math.random()
    const myDoc = doc(db, `user_${getAuth().currentUser.uid}`, `trip_${randomId}`)
    const globalDoc = doc(db, 'trips', `trip_${randomId}`)
  
    const docData = createData

    setDoc(myDoc, docData)
      .then(() => {
        setDoc(globalDoc, docData)
        dispatch(addTrip([...userTrips, docData]))
        dispatch(addGlobalTrip([...globalTrips, docData]))
        navigation.navigate('Home')
        alert('?????????????? ??????????????????')
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
            <Text style={styles.formTitle}>?????????????????? ??????????</Text>
            <TextInput
              placeholder="???????? ????'??"
              placeholderTextColor='#6A686F'
              value={ createData.name }
              onChangeText={(text) => dispatch(setName(text))}
              style={styles.textInput}
            />
            <TextInput
              placeholder="?????? ?????????? ????????????????"
              placeholderTextColor='#6A686F'
              value={ createData.phone }
              keyboardType='phone-pad'
              onChangeText={(text) => dispatch(setPhone(text))}
              style={{ ...styles.textInput, marginTop: 20 }}
            />
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Pressable style={styles.button} onPress={() => showMode('date')}>
                <Text style={{ color: '#fff' }}>???????????????? ????????</Text>
              </Pressable>
              <Pressable style={styles.mapButton} onPress={() => setMapShow(true)}>
                <Icon name='map-outline' style={{ color: '#fff', fontSize: 20 }} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => showMode('time')}>
                <Text style={{ color: '#fff' }}>???????????????? ??????</Text>
              </Pressable>
            </View>
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Text style={{ color: '#fff', marginBottom: 10, fontSize: 18 }}>?????????????????? ??????????????????</Text>
              <InputSpinner
                max={5}
                min={1}
                step={1}
                value={createData.passengers}
                skin='modern'
                onChange={(num) => dispatch(setPassengers(num))}
                buttonStyle={{ backgroundColor: '#2A2631' }}
                inputStyle={{ backgroundColor: '#6A686F', color: '#fff', fontWeight: 'bold' }}
                style={{ backgroundColor: '#2A2631' }}
              />
            </View>
            <Pressable style={styles.buttonAdd} onPress={() => {
              if(createData.name.length < 1) {
                alert('??????????????')
              } else {
                phoneValidation(createData.phone, () => createTrip(), () => alert('??????????????'))
              }
            }}>
              <Text style={{ color: '#fff' }}>???????????????? ??????????????</Text>
            </Pressable>
          </View>
        )
      }
      
      {
        show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={createData.date}
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
            <PlaceInput placeholder={'????????????'} setCoord={setfromCoord} />
            <PlaceInput placeholder={'????????'} setCoord={settoCoord} />
            <View>
              <Pressable onPress={() => {
                getAddress(fromCoord, toCoord).then(data => dispatch(setRoute(data)))
                setMapShow(false)
              }} style={{ ...styles.button, backgroundColor: '#2A2631' }}>
                <Text style={{ color: '#fff' }}>????????</Text>
              </Pressable>
              <Pressable onPress={() => {
                setMapShow(false)
              }} style={{ ...styles.button, backgroundColor: '#2A2631', marginTop: 5 }}>
                <Text style={{ color: '#fff' }}>??????????</Text>
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
    backgroundColor: '#111016',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
    elevation: 5,
    alignItems: 'center',
  },
  formTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 30
  },
  textInput: {
    backgroundColor: '#2A2631',
    width: 350,
    height: 50,
    borderRadius: 15,
    color: '#6A686F',
    paddingLeft: 10,
    fontSize: 16
  },
  mapButton: {
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: '#2A2631'
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
    backgroundColor: '#2A2631'
  },
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 60,
    borderRadius: 4,
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: '#2A2631'
  }
})