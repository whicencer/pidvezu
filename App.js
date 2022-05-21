import { StyleSheet, View } from 'react-native';
import AuthScreen from './src/screens/AuthScreen/AuthScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373737',
    alignItems: 'center',
    paddingTop: 75
  }
});
