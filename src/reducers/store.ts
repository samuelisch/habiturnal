import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import journalsReducer from './journalsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    journals: journalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
