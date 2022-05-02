import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UserSchema } from '../reducers/usersSlice';
import { UserType } from '../utils/types';
import { token } from './login';

const baseUrl = 'http://localhost:8000/api/users';

const getUsers = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${baseUrl}/user-list/`);
  return response.data;
};

const getUserByUsername = async (username: string): Promise<AxiosResponse | UserSchema> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/user-detail-username/${username}`, config);
  return response.data;
};

const getUserById = async (id: string | number): Promise<AxiosResponse | UserSchema> => {
  const response = await axios.get(`${baseUrl}/user-detail-id/${id}`);
  return response.data;
}

const createUser = async (userObj: UserType): Promise<AxiosResponse> => {
  const response = await axios.post(`${baseUrl}/user-create/`, userObj);
  return response.data;
};

const userCalls = {
  getUsers,
  getUserByUsername,
  getUserById,
  createUser,
};

export default userCalls;
