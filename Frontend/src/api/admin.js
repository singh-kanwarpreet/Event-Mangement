import axios from 'axios';

export const upload =(data)=>{
    return axios.post("http://localhost:3030/event/upload",data)
    .then((response)=>alert(response.data.message))
    .catch((err)=>{
        throw err;
    
    })
}