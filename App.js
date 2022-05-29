import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthScreen from './src/screens/auth-screen';
import Tabs from './src';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Auth' component={AuthScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Main' component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
