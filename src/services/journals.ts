import axios, { AxiosResponse } from 'axios';

const baseUrl = 'http://localhost:8000/api/journals';

const getJournals = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${baseUrl}/journal-list/`);
  return response.data;
};

const createJournal = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${baseUrl}/journal-create/`);
  return response.data;
}

const journalCalls = {
  getJournals,
  createJournal,
};

export default journalCalls;
