import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import {FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';

import TaskReducer from './Slice/TaskSlice'
import UserReducer from './Slice/UserSlice'
import CounterReducer from './Slice/CounterSlice'


const rootReducers = combineReducers({
  task: TaskReducer, //persist
  userAuth: UserReducer,
  counter: CounterReducer //persist
})

const configPersist = {
  key: 'root',
  storage,
  whitelist: ['counter', 'task'], //allow to persist
}

const persistedReducer = persistReducer(configPersist, rootReducers)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);