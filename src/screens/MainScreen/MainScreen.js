import React from 'react'

import HomeScreen from '../HomeScreen/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchScreen from '../SearchScreen/SearchScreen';
import AddScreen from '../AddScreen/AddScreen'

const Tab = createBottomTabNavigator()

const MainScreen = () => {
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

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8b8b8b',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { position: 'absolute', backgroundColor: '#262626' },
      })}
    >
      <Tab.Screen
        name='Home'
        options={{
          tabBarLabel: 'Головна',
          headerStyle: { backgroundColor: '#222' },
          headerTitleStyle: {color: '#fff'},
          headerTitle: 'Головна'
        }}
        component={HomeScreen} />
      <Tab.Screen
        name='Add'
        options={{
          tabBarLabel: 'Додати поїздку',
          headerTitle: 'Додати поїздку'
        }}
        component={AddScreen} />
      <Tab.Screen
        name='Search'
        options={{
          tabBarLabel: 'Пошук',
          headerTitle: 'Пошук'
        }}
        component={SearchScreen} />
    </Tab.Navigator>
  )
}

export default MainScreen