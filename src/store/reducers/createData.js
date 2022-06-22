import { createSlice } from "@reduxjs/toolkit"

export const createDataSlice = createSlice({
  name: 'createData',
  initialState: {
    name: '',
    phone: '',
    date: new Date(),
    passengers: 0,
    route: '',
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setRoute: (state, action) => {
      state.route = action.payload
    },
    setPassengers: (state, action) => {
      state.passengers = action.payload
    },
    setDate: (state, action) => {
      state.date = action.payload
    },
    setPhone: (state, action) => {
      state.phone = action.payload
    }
  }
})

export const { setName, setRoute, setPassengers, setDate, setPhone } = createDataSlice.actions
export default createDataSlice.reducer