import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserType } from '../utils/types';
import { DecodedTokenSchema } from '../Main/Login';


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

const getJwtDetails = async (): Promise<AxiosResponse | DecodedTokenSchema> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}jwt-details`, config);
  return response.data
}

const loginCalls = {
  loginUser,
  getJwtDetails
};

export default loginCalls;
