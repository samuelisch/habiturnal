import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import journalCalls from '../services/journals';
import { ErrorPayload, JournalType } from '../utils/types';
import { store, RootState } from './store';

interface JournalsState {
  data: JournalType[];
  isLoading: boolean;
  errors: Array<ErrorPayload> | null;
}

const initialState: JournalsState = {
  data: [],
  isLoading: false,
  errors: null,
};

export const journalsSlice = createSlice({
  name: 'journals',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<object>) => {
      state.data = action.payload as JournalType[];
      state.isLoading = false;
    },
    create: (state, action: PayloadAction<object>) => {
      state.data.push(action.payload as JournalType);
      state.isLoading = false;
    },
    update: (state, action: PayloadAction<object>) => {
      const { id } = action.payload as JournalType;
      state.data = state.data.map(journal =>
        journal.id !== id ? journal : (action.payload as JournalType)
      );
      state.isLoading = false;
    },
    remove: (state, action: PayloadAction<string | number>) => {
      state.data = state.data.filter(journal => journal.id !== action.payload);
      state.isLoading = false;
    },
  },
});

export const { init, create, update, remove } = journalsSlice.actions;

export const fetchJournals = createAsyncThunk('journals/init', async (): Promise<void> => {
  const data = await journalCalls.getJournals();
  store.dispatch(init(data));
});

export const getJournalsState = (state: RootState) => state.journals;

export const selectAllJournals = (state: RootState) => state.journals.data;

export default journalsSlice.reducer;
