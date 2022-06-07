import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

// TODO: if user have created trips - show it on screen and add feature to "close" that trip

const HomeScreen = () => {
  const navigation = useNavigation()

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