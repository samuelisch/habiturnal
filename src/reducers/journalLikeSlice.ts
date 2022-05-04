import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LikesType } from '../services/journals';
import { ErrorPayload } from './authSlice';

interface JournalsLikesState {
  data: LikesType[];
  isLoading: boolean;
  errors: Array<ErrorPayload> | null;
}

const initialState: JournalsLikesState = {
  data: [],
  isLoading: false,
  errors: null,
}

export const journalLikeSlice = createSlice({
  name: 'journalLikes',
  initialState,
  reducers: {
    initLikes: (state, action: PayloadAction<object>) => {
      state.data = action.payload as LikesType[];
      state.isLoading = false;
    },
    createLike: (state, action: PayloadAction<object>) => {
      state.data.push(action.payload as LikesType);
      state.isLoading = false;
    },
    removeLike: (state, action: PayloadAction<object>) => {
      const { id } = action.payload as LikesType;
      state.data = state.data.filter(like => like.id !== id);
      state.isLoading = false;
    },
  }
})

export const { initLikes, createLike, removeLike } = journalLikeSlice.actions;

export default journalLikeSlice.reducer;
