import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorPayload, JournalType } from '../utils/types';
import { RootState } from './store';

interface JournalsLikesState {
  data: JournalType[];
  isLoading: boolean;
  errors: Array<ErrorPayload> | null;
}

const initialState: JournalsLikesState = {
  data: [],
  isLoading: false,
  errors: null,
};

export const journalLikeSlice = createSlice({
  name: 'journalLikes',
  initialState,
  reducers: {
    initLikes: (state, action: PayloadAction<object>) => {
      state.data = action.payload as JournalType[];
      state.isLoading = false;
    },
    createLike: (state, action: PayloadAction<object>) => {
      state.data.push(action.payload as JournalType);
      state.isLoading = false;
    },
    removeLike: (state, action: PayloadAction<object>) => {
      const { id } = action.payload as JournalType;
      state.data = state.data.filter(data => data.id !== id);
      state.isLoading = false;
    },
  },
});

export const { initLikes, createLike, removeLike } = journalLikeSlice.actions;

export const selectAllJournalLikes = (state: RootState) => state.journalLikes.data;

export default journalLikeSlice.reducer;
