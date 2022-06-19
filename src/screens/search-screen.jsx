import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TextInput } from 'react-native';

import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase'

import UserTrips from '../components/user-trips';

const SearchScreen = () => {
  const [trips, setTrips] = useState([])
  const [search, setSearch] = useState('')

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

  const filterBy = (data, field, value) => {
    value = value.replace(/\,|->/g, '').toUpperCase();
    return data.filter(item => {
      item[field] = item[field].replace(/\,/g, '').toUpperCase()

      return item[field].includes(value)
    })
  }

  const filteredData = filterBy(trips, 'route', search) || trips

  return (
    <ScrollView style={{ marginVertical: 20 }}>
      <View style={{ flex: 1, margin: 20 }}>
        <TextInput
          placeholderTextColor='#555'
          placeholder='Пошук...'
          style={styles.input}
          value={search}
          onChangeText={text => setSearch(text)}
        />
        {
          filteredData?.length ? filteredData.map((trip, key) => {
            return <UserTrips trip={trip} key={key} />
          }) : <Text style={{ fontSize: 16, color: '#000' }}>Немає активних поїздок...</Text>
        }
      </View>
    </ScrollView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  input: {
    elevation: 1,
    padding: 10,
    marginBottom: 10
  }
})