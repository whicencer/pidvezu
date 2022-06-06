import { StyleSheet, View, Image, TextInput, Pressable, Alert, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core';
import { emailValidation } from '../utils/validators/emailValidation';

export default function AuthScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        navigation.replace('Main')
      }
    })
    
    return unsubscribe
  }, [])

  const handleLogin = () => {
    if(password.length < 6 || !emailValidation(email)) {
      Alert.alert('Помилка', 'Поле пароля або електронної пошти порожнє')
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user
          console.log('Logged in with', user.email)
        })
        .catch(error => {
          if(error.code === 'auth/user-not-found') {
            Alert.alert('Щось пішло не так', 'Невірна пошта або пароль')
          } else {
            Alert.alert('Щось пішло не так', 'Невідома помилка...')
          }
          return error
        })
    }
  }
  
  const handleSignup = () => {
    if(password.length < 6) {
      Alert.alert('Помилка', 'Пароль має містити не менше 6 символів')
    } else if(!emailValidation(email)) {
      Alert.alert('Помилка', 'Невірна адреса електронної пошти!')
    } else {
      auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
        const user = userCredentials.user
        console.log('Registered with', user.email)
      }).catch(error => error)
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/splash.png')} />
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholderTextColor='#555'
          placeholder='E-mail'
          onChangeText={text => setEmail(text)}
          onSubmitEditing={() => console.log('confirmation code')}
          value={email}
          keyboardType='email-address'
        />
        <TextInput
          style={{...styles.input, marginTop: 10}}
          placeholderTextColor='#555'
          placeholder='Пароль'
          onChangeText={text => setPassword(text)}
          onSubmitEditing={() => console.log('confirmation code')}
          value={password}
          secureTextEntry={true}
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Вхід</Text>
        </Pressable>
        <Pressable style={styles.buttonOutline} onPress={handleSignup}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#373737',
    paddingTop: 75
  },
  logo: {
    width: 125,
    height: 125,
  },
  input: {
    backgroundColor: '#262626',
    width: 350,
    height: 60,
    borderRadius: 15,
    color: '#fff',
    paddingLeft: 20,
    fontSize: 20
  },
  content: {
    marginTop: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 20,
    backgroundColor: '#262626'
  },
  buttonOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#262626',
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});