import AuthScreen from './src/screens/AuthScreen/AuthScreen';
import MainScreen from './src/screens/MainScreen/MainScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Auth' component={AuthScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Main' component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
