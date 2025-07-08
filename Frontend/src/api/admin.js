import axios from 'axios';

export const  upload = (data)=>{
    return axios.post("http://localhost:3030/admin/upload",data)
    .then((response)=>{return response.data.message;})
    .catch((err)=>{
        throw err;
    
    })
}

export const edit = (data)=>{
    return axios.post("http://localhost:3030/admin/edit",data)
    .then((response)=>{return response.data.message;})
    .catch((err)=>{
        throw err;
    
    })
}