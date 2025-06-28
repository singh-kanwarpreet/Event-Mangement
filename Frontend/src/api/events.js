import axios from "axios";

export const allEvents = async () => {
  try {
    const response = await axios.get("http://localhost:3030/event/show");
    return response.data;
  } catch (error) {
    throw error;
  }
}