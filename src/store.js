import { configureStore } from '@reduxjs/toolkit'
import TaskReducer from './Slice/TaskSlice'
import UserReducer from './Slice/UserSlice'

export const store = configureStore({
  reducer: {
    task:TaskReducer,
    userAuth:UserReducer
  },
})