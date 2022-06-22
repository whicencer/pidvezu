import { createSlice } from '@reduxjs/toolkit'

export const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    userTrips: [],
    globalTrips: []
  },
  reducers: {
    addTrip: (state, action) => {
      state.userTrips = action.payload
    },
    addGlobalTrip: (state, action) => {
      state.globalTrips = action.payload
    }
  }
})


export const { addTrip, addGlobalTrip } = tripSlice.actions
export default tripSlice.reducer