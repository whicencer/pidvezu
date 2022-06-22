import { configureStore } from '@reduxjs/toolkit';
import createDataSlice from './reducers/createData';
import tripSlice from './reducers/trips';

export default configureStore({
  reducer: {
    trips: tripSlice,
    createData: createDataSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})