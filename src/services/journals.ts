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
  location: string;
}

export interface LikesType {
  id: string | number;
  user: string | number;
  journals: string | number;
}

export interface LikesInputType {
  user: string | number;
  journals: string | number;
}

const getJournals = async (): Promise<AxiosResponse | JournalType[]> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/journal-list/`, config);
  return response.data;
};

const getJournalsByUserId = async (
  userId: string | number
): Promise<AxiosResponse | JournalType[]> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/journal-list-user/${userId}`, config);
  return response.data;
};

const getSingleJournal = async (id: number | string): Promise<AxiosResponse | JournalType> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/journal-detail/${id}`, config);
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

const getJournalLikesByUserId = async (userId: string | number): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/likes-list-user/${userId}`, config);
  return response.data;
}

const createJournalLike = async (likesObj: LikesInputType): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseUrl}/likes-create/`, likesObj, config);
  return response.data;
}

const deleteJournalLike = async (id: string | number): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/likes-delete/${id}`, config);
  return response.data;
}

const journalCalls = {
  getJournals,
  getJournalsByUserId,
  getSingleJournal,
  createJournal,
  getJournalLikesByUserId,
  createJournalLike,
  deleteJournalLike,
};

export default journalCalls;
