import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import journalsReducer from './journalsSlice';
import journalLikesReducer from './journalLikeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    journals: journalsReducer,
    journalLikes: journalLikesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
