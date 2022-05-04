import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { token } from './login';

const baseUrl = 'http://localhost:8000/api/journals';

export interface JournalInputType {
  title: string;
  content: string;
  user: string | number;
  owner: string;
}

export interface JournalType {
  id: string | number;
  title: string;
  content: string;
  user: string | number;
  owner: string;
  created_date: string | number | Date;
}

const getJournals = async (): Promise<AxiosResponse | JournalType[]> => {
  const response = await axios.get(`${baseUrl}/journal-list/`);
  return response.data;
};

const getJournalsByUserId = async (
  userId: string | number
): Promise<AxiosResponse | JournalType[]> => {
  const response = await axios.get(`${baseUrl}/journal-list-user/${userId}`);
  return response.data;
};

const getSingleJournal = async (id: number | string): Promise<AxiosResponse | JournalType> => {
  const response = await axios.get(`${baseUrl}/journal-detail/${id}`);
  return response.data;
};

const createJournal = async (
  journalObj: JournalInputType
): Promise<AxiosResponse | JournalType> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseUrl}/journal-create/`, journalObj, config);
  return response.data;
};

const journalCalls = {
  getJournals,
  getJournalsByUserId,
  getSingleJournal,
  createJournal,
};

export default journalCalls;
