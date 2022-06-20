import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import UserTrips from '../components/user-trips'

import { getDocs, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { auth, db } from '../firebase'

import { useSelector, useDispatch } from 'react-redux'

import { useNavigation } from '@react-navigation/native'
import Button from '../components/ui/Button'
import { addTrip } from '../store/reducers/trips'

const HomeScreen = () => {
  const navigation = useNavigation()
  const { trips } = useSelector(state => state.trips)
  const dispatch = useDispatch()
  
  useEffect(() => {
    getDocs(collection(db, `user_${getAuth().currentUser.uid}`))
      .then((snapshot) => {
        dispatch(addTrip(
          snapshot.docs.map(doc => {
            return doc.data()
          })
        ))
      })
  }, [])

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Auth')
        alert('Ви вийшли с аккаунту')  
      })
      .catch(error => Alert.alert(error))
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 16 }}>Авторизований як: {auth.currentUser?.email}</Text>
      <Button text={'Вийти'} clickHandler={handleLogout} />

      <ScrollView style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginLeft: 25 }}>Мої поїздки:</Text>
        <View style={styles.trips}>
          {
            trips?.length ? trips?.map((el, key) => {
              return <UserTrips key={key} trip={el} />
            }) : <Text style={{ fontSize: 16, color: '#f0f0f0' }}>Немає...</Text>
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16151C',
    alignItems: 'center',
    paddingTop: 75
  },
  trips: {
    width: '100%',
    height: '100%',
    padding: 20,
    paddingBottom: 50
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 20,
    backgroundColor: '#262626',
    width: 200
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17
  }
})