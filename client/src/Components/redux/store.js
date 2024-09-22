import { configureStore } from '@reduxjs/toolkit'
import userReducer from './setUserSlice';

export const store = configureStore({
  reducer: userReducer
})
