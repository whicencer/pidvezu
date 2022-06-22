import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Input from '../components/ui/TextInput'

import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase'

import { useDispatch, useSelector } from 'react-redux'

import UserTrips from '../components/user-trips';
import { addGlobalTrip } from '../store/reducers/trips';

const SearchScreen = () => {
  const globalTrips = useSelector(state => state.trips.globalTrips)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    getDocs(collection(db, 'trips'))
      .then((snapshot) => {
        dispatch(addGlobalTrip(
          snapshot.docs.map(doc => {
            return doc.data()
          })
        ))
      })
  }, [])

  const filterBy = (data, field, value) => {
    value = value.replace(/\,|->/g, '').toUpperCase();
    return data.filter(item => {
      item[field] = item[field].replace(/\,/g, '').toUpperCase()

      return item[field].includes(value)
    })
  }

  const filteredData = filterBy(globalTrips, 'route', search)

  return (
    <ScrollView style={{ marginBottom: 40, backgroundColor: '#16151C' }}>
      <View style={{ flex: 1, margin: 20 }}>
        <Input
          changeHandler={text => setSearch(text)}
          placeholder='Пошук...'
          secure={false}
          value={search}
        />
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>Всього поїздок: {filteredData.length}</Text>
          {
            filteredData?.length ? filteredData.map((trip, key) => {
              return <UserTrips trip={trip} key={key} />
            }) : <Text style={{ fontSize: 16, color: '#000' }}>Немає активних поїздок...</Text>
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default SearchScreen