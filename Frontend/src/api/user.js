import axios from 'axios';

export const registeredEvents = async (token) => {
  try {
    const response = await axios.post("http://localhost:3030/user/registered", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
