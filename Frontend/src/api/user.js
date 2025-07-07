import axios from 'axios';


export const registeredEvents = async (token) => {
  try {
    const response = await axios.post("http://localhost:3030/user/registered",{token});
    return response.data;
  } catch (error) {
    throw error;
  }
}
