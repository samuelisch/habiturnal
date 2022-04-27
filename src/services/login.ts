import axios, { AxiosResponse } from 'axios';
import { UserType } from '../utils/types';

const baseUrl = 'http://localhost:8000/api/token/';

const loginUser = async (credentials: UserType): Promise<AxiosResponse> => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const loginCalls = {
  loginUser,
};

export default loginCalls;
