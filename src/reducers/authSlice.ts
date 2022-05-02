import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface AuthSchema {
  access: string;
  refresh: string;
}

export interface ErrorPayload {
  data: string;
  status: string;
}

interface AuthState {
  data: AuthSchema | null;
  isLoading: boolean;
  errors: Array<ErrorPayload> | null;
  didComplete: boolean;
}

const initialState: AuthState = {
  data: null,
  isLoading: true,
  errors: null,
  didComplete: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    populate: (state, action: PayloadAction<object>) => {
      state.data = action.payload as AuthSchema;
      state.didComplete = false;
    },
    invalidate: state => {
      state.data = null;
      state.didComplete = false;
      localStorage.clear();
    },
    fetch: state => {
      state.isLoading = true;
      state.didComplete = false;
    },
    finish: state => {
      state.isLoading = false;
      state.didComplete = true;
    },
    success: (state, action: PayloadAction<object>) => {
      const payload = action.payload as AuthSchema;
      state.data = payload;
      state.isLoading = false;
      state.errors = null;
      state.didComplete = true;
      localStorage.setItem('token', JSON.stringify(payload));
    },
    fail: (state, action: PayloadAction<Array<ErrorPayload>>) => {
      state.errors = action.payload;
      state.isLoading = false;
      state.didComplete = true;
      localStorage.clear();
    },
  },
});

export const { populate, invalidate, fetch, success, fail } = authSlice.actions;

export const selectAuthData = (state: RootState): AuthSchema | null => state.auth.data;
export const selectErrorObject = (state: RootState) => state.auth.errors;
export const selectError = (state: RootState) => {
  return state.auth.errors && state.auth.errors[0];
};
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const selectDidComplete = (state: RootState) => state.auth.didComplete;

export default authSlice.reducer;
