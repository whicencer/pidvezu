import AuthScreen from './src/screens/AuthScreen/AuthScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Auth' component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
