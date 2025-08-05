import axios from "axios";

// Fetch all events
export const allEvents = async (token) => {
  try {
    const response = await axios.get("http://localhost:3030/event/show", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register for a specific event
export const eventRegister = async (id, token) => {
  try {
    const response = await axios.post(
      `http://localhost:3030/event/${id}/register`,
      {}, // body is empty
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
