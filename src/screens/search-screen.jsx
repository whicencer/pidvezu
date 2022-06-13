import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';

import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase'

import UserTrips from '../components/user-trips';

const SearchScreen = () => {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    getDocs(collection(db, 'trips'))
      .then((snapshot) => {
        setTrips(
          snapshot.docs.map(doc => {
            return doc.data()
          })
        )
      })
  }, [])

  return (
    <ScrollView style={{ marginVertical: 20 }}>
      <View style={{ flex: 1, margin: 20 }}>
        {
          trips.length ? trips.map((trip, key) => {
            return (
              <UserTrips trip={trip} key={key} />
            )
          }) : <Text style={{ fontSize: 16, color: '#000' }}>Немає активних поїздок...</Text>
        }
      </View>
    </ScrollView>
  )
}

export default SearchScreen