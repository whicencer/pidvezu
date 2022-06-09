import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

import { getDocs, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [userTrips, setUserTrips] = useState()
  
  useEffect(() => {
    getDocs(collection(db, `user_${getAuth().currentUser.uid}`))
      .then((snapshot) => {
        setUserTrips(
          snapshot.docs.map(doc => {
            return doc.data()
          })
        )
      })
  }, [])

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Auth')
        alert('Повідомлення', 'Ви вийшли с аккаунту')  
      })
      .catch(error => Alert.alert(error))
  }

  return (
    <View style={styles.container}>
      <Text>Авторизований як: {auth.currentUser?.email}</Text>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Вийти</Text>
      </Pressable>

      <View styles={styles.trips}>
        {
          userTrips?.map((el, key) => {
            return (
              <View key={key}>
                <Text>{el.name}</Text>
                <Text>{el.passengers}</Text>
                <Text>{el.phone}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373737',
    alignItems: 'center',
    paddingTop: 75
  },
  trips: {},
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