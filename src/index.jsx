import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import SearchScreen from './screens/search-screen'
import AddScreen from './screens/add-screen'
import HomeScreen from './screens/home-screen'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#443E4F',
        tabBarInactiveTintColor: '#585471',
        tabBarStyle: { position: 'absolute', backgroundColor: '#111016' },
      })}
    >
      <Tab.Screen
        name='Home'
        options={{
          tabBarLabel: 'Головна',
          headerStyle: { backgroundColor: '#111016' },
          headerTitleStyle: {color: '#fff'},
          headerTitle: 'Головна'
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name='Add'
        options={{
          tabBarLabel: 'Додати поїздку',
          headerStyle: { backgroundColor: '#111016' },
          headerTitleStyle: { color: '#fff' },
          headerTitle: 'Додати поїздку'
        }}
        component={AddScreen}
      />
      <Tab.Screen
        name='Search'
        options={{
          headerStyle: { backgroundColor: '#111016' },
          headerTitleStyle: { color: '#fff' },
          tabBarLabel: 'Пошук',
          headerTitle: 'Пошук'
        }}
        component={SearchScreen}
      />
    </Tab.Navigator>
  )
}

export default Tabs