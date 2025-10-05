import axios from 'axios';

const BASE_URL = "http://localhost:3030/admin";

const api = axios.create({
  baseURL: BASE_URL,
});

export const upload = async (data,token) => {
  try {
    const response = await api.post("/upload", { data }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.message;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const edit = async (data) => {
  try {
    const response = await api.post("/edit", data);
    return response.data.message;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const deleteEvent = async (id, token) => {
  try {
    const response = await api.post("/delete", { id }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.message;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const sendCertificate = async (id, token) => {
  try {
    const response = await api.post("/send-certificate", { id }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.message;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const EventParticipants = async (eventId) => {
  try {
    const response = await api.get(`/event/${eventId}/participants`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const updateAttendance = async (eventId, participants, token) => {
  try {
    const response = await api.put(`/update-attendance`, { eventId, participants }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};
