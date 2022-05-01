import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { token } from './login';

const baseUrl = 'http://localhost:8000/api/journals';

export interface JournalType {
  title: string;
  content: string;
  user: string | number;
}

const getJournals = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${baseUrl}/journal-list/`);
  return response.data;
};

const createJournal = async (journalObj: JournalType): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseUrl}/journal-create/`, journalObj, config);
  return response.data;
}

const journalCalls = {
  getJournals,
  createJournal,
};

export default journalCalls;
