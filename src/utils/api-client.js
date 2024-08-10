import axios from 'axios';

export default axios.create({
    // baseURL: `http://1:5000/api/`, 
    baseURL: `http://localhost:8000/api/`, 
    headers: {
    //    "Content-Type": "multipart/form-data"
    },
    withCredentials: true,
});
