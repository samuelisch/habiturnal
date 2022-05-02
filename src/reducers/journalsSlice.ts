import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import journalCalls, { JournalInputType, JournalType } from '../services/journals';
import { ErrorPayload } from './authSlice';
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
  },
})

export const { init, create } = journalsSlice.actions;

export const fetchJournals = createAsyncThunk('journals/init', async (): Promise<void> => {
  const data = await journalCalls.getJournals();
  store.dispatch(init(data));
})

export const createJournal = createAsyncThunk('journals/create', async (newJournal: JournalInputType): Promise<void> => {
  const data = await journalCalls.createJournal(newJournal);
  store.dispatch(create(data));
})

export const getJournalsState = (state: RootState) => state.journals;

export const selectAllJournals = (state: RootState) => state.journals.data;

export const selectJournalById = (state: RootState, journalId: string | number) => {
  const journal = state.journals.data.find(journal => journal.id === journalId);
  return journal
};

export default journalsSlice.reducer;