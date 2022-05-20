import { StyleSheet, View, Image, TextInput, Pressable, Alert, Text } from 'react-native';
import { useState } from 'react';

export default function AuthScreen() {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/splash.png')} />
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholderTextColor='#555'
          placeholder='E-mail'
          onChange={onChange}
          onSubmitEditing={() => console.log('confirmation code')}
          value={value}
          keyboardType='email-address'
        />
        <Pressable style={styles.button} onPress={() => Alert.alert('Test')}>
          <Text style={styles.buttonText}>Далі</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});