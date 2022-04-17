import axios, { AxiosResponse } from "axios";

const baseUrl = 'http://localhost:8000/habits'

const getHabits = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${baseUrl}/habit-list/`);
  return response.data
}

const habitCalls = {
  getHabits
}

export default habitCalls