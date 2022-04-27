import axios, { AxiosResponse } from 'axios';

const baseUrl = 'http://localhost:8000/api/journals';

const getHabits = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${baseUrl}/`);
  return response.data;
};

const habitCalls = {
  getHabits,
};

export default habitCalls;
