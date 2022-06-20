import { createSlice } from '@reduxjs/toolkit'

export const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: []
  },
  reducers: {
    addTrip: (state, action) => {
      state.trips = action.payload
    }
  }
})


export const { addTrip } = tripSlice.actions
export default tripSlice.reducer