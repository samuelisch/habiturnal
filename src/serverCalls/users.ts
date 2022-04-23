import axios, { AxiosResponse } from 'axios';
import { UserType } from '../utils/types';

const baseUrl = 'http://localhost:8000/users';

const getUsers = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${baseUrl}/user-list/`);
  return response.data;
};

const createUser = async (userObj: UserType): Promise<AxiosResponse> => {
  const response = await axios.post(`${baseUrl}/user-create/`, userObj);
  return response.data;
};

const userCalls = {
  getUsers,
  createUser,
};

export default userCalls;
