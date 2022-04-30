import axios, { AxiosResponse } from 'axios';
import { UserType } from '../utils/types';

const baseUrl = 'http://localhost:8000/api/token/';

export interface TokenSchema {
  access: string;
  refresh: string;
}

export let token: string = '';

export const setToken = (newToken: TokenSchema) => {
  token = `Bearer ${newToken.access}`;
};

const loginUser = async (credentials: UserType): Promise<AxiosResponse | TokenSchema> => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const loginCalls = {
  loginUser,
};

export default loginCalls;
