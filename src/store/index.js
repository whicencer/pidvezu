import { configureStore } from '@reduxjs/toolkit';
import tripSlice from './reducers/trips';

export default configureStore({
  reducer: {
    trips: tripSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})