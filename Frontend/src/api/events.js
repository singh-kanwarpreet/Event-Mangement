import axios from "axios";

export const allEvents = async (token) => {
  try {
    const response = await axios.post("http://localhost:3030/event/show", { token });
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const eventRegister = async (id,token) => {
  try {
    const response = await axios.post(`http://localhost:3030/event/${id}/register`,{token});
    return response.data;
  } catch (error) {
    throw error;
  }
}