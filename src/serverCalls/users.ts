import axios, { AxiosResponse } from "axios";

const baseUrl = 'http://localhost:8000/users'

const getUsers = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${baseUrl}/user-list`);
  return response.data
}

const userCalls = {
  getUsers
}

export default userCalls