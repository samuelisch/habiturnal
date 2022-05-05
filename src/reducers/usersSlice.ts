import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import userCalls from '../services/users';
import { ErrorPayload } from './authSlice';
import { store, RootState } from './store';

export interface UserSchema {
  id: string | number;
  username: string;
  location: string;
  date_joined: string;
  last_login: string;
}

interface UsersState {
  data: UserSchema[];
  isLoading: boolean;
  errors: Array<ErrorPayload> | null;
}

const initialState: UsersState = {
  data: [],
  isLoading: false,
  errors: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<object>) => {
      state.data = action.payload as UserSchema[];
      state.isLoading = false;
    },
    create: (state, action: PayloadAction<object>) => {
      state.data.push(action.payload as UserSchema)
      state.isLoading = false;
    }
  },
});

export const { init, create } = userSlice.actions; // remove init in future

export const fetchUsers = createAsyncThunk('users/init', async (): Promise<void> => {
  const data = await userCalls.getUsers();
  store.dispatch(init(data));
});

export const selectAllUsers = (state: RootState) => state.users.data;

export const selectUserById = (state: RootState, userId: string | number) => {
  const user = state.users.data.find(user => user.id === userId);
  return user;
};

export default userSlice.reducer;
