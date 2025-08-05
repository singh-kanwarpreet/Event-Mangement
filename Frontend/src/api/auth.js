import axios from 'axios';

const BASE_URL = "http://localhost:3030/auth";

export const login = async (data) => {
    if (!data.email || !data.password) {
        throw new Error("Email and password are required");
    }
    try {
        const response = await axios.post(`${BASE_URL}/login`, data);
        localStorage.setItem('authCredentials', JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || err.message);
    }
};

export const signup = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, data);
        localStorage.setItem('authCredentials', JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || err.message);
    }
};
