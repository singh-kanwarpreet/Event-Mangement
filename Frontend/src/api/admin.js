import axios from 'axios';

export const  upload = async (data)=>{
    try {
        const response = await axios.post("http://localhost:3030/admin/upload", data);
        return response.data.message;
    } catch (err) {
        throw err;
    }
}

export const edit = async (data)=>{
    try {
        const response = await axios.post("http://localhost:3030/admin/edit", data);
        return response.data.message;
    } catch (err) {
        throw err;
    }
}

export const deleteEvent = async (id, token) => {
    try {
        const response = await axios.post("http://localhost:3030/admin/delete", { id, token });
        return response.data.message;
    } catch (err) {
        throw err;
    }
}

export const EventParticipants = async (eventId) => {
    try {
        const response = await axios.get(`http://localhost:3030/admin/event/${eventId}/participants`);
        return response.data;
    } catch (err) {
        throw err;
    }
}


