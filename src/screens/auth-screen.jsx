import { StyleSheet, View, Image, Pressable, Alert, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core';
import { emailValidation } from '../utils/validators/emailValidation';
import Button from '../components/ui/Button';
import Input from '../components/ui/TextInput'

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
    if(!password.length || !email.length) {
      Alert.alert('Помилка', 'Поле пароля або електронної пошти порожнє')
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user
          console.log('Logged in with', user.email)
        })
        .catch(error => {
          if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
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
      alert('Пароль має містити щонайменше 6 символів')
    }
    emailValidation(email, () => {
      auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
        const user = userCredentials.user
        console.log('Registered with', user.email)
      }).catch(error => {
        error.code === 'auth/email-already-in-use' && alert('Аккаунт з таким E-mail вже існує')
      })
    }, () => alert('Невірний E-mail адрес'))
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/splash.png')} />
      <View style={styles.content}>
        <Input
          changeHandler={text => setEmail(text)}
          placeholder={{ color: '#6A686F', text: 'Введіть E-mail' }}
          keyboardType='email-address'
          secure={false}
          value={email}
        />
        <Input
          changeHandler={text => setPassword(text)}
          placeholder={{ color: '#6A686F', text: 'Введіть Пароль (Не менше 6 символів)' }}
          secure={true}
          value={password}
        />
        
        <View style={{ marginTop: 20 }}>
          <Button clickHandler={handleLogin} text={'Увійти в аккаунт'} />
          <Pressable style={styles.buttonOutline} onPress={handleSignup}>
            <Text style={styles.buttonText}>Створити аккаунт</Text>
          </Pressable>
        </View>
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
    backgroundColor: '#16151C',
    paddingTop: 75
  },
  logo: {
    width: 125,
    height: 125,
  },
  content: {
    marginTop: 100,
  },
  buttonOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2A2631',
    marginTop: 14,
    borderWidth: 2,
    paddingVertical: 7,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#ABA7B2',
    fontSize: 16,
  }
});