import axios from 'axios';

export const login = async (data) => {
    if (!data.email || !data.password) {
        throw new Error("Email and password are required");
    }
    try {
        const response = await axios.post("http://localhost:3030/auth/login", data);
        localStorage.setItem('authCredentials', JSON.stringify(response.data));
    } catch (err) {
        throw err;
    }
};

export const signup = async (data) => {
    try {
        const response = await axios.post("http://localhost:3030/auth/signup", data);
        localStorage.setItem('authCredentials', JSON.stringify(response.data));
    } catch (err) {
        throw err;
    }
};