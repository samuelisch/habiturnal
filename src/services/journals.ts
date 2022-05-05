import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { JournalInputType, JournalType, LikesInputType } from '../utils/types';
import { token } from './login';

const baseUrl = 'http://localhost:8000/api/journals';

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

const updateJournal = async (
  journalObj: JournalInputType,
  id?: string | number
): Promise<AxiosResponse | JournalType> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/journal-update/${id}`, journalObj, config);
  return response.data;
};

const deleteJournal = async (journalId: string | number): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/journal-delete/${journalId}`, config);
  return response.data;
};

const getJournalLikesByUserId = async (
  userId: string | number
): Promise<AxiosResponse | JournalType[]> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/journal-list-user-likes/${userId}`, config);
  return response.data;
};

const createJournalLike = async (likesObj: LikesInputType): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseUrl}/likes-create/`, likesObj, config);
  return response.data;
};

const deleteJournalLike = async (
  journalId: string | number,
  userId: string | number
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/likes-delete/${journalId}/${userId}`, config);
  return response.data;
};

const journalCalls = {
  getJournals,
  getJournalsByUserId,
  getSingleJournal,
  createJournal,
  updateJournal,
  deleteJournal,
  getJournalLikesByUserId,
  createJournalLike,
  deleteJournalLike,
};

export default journalCalls;
