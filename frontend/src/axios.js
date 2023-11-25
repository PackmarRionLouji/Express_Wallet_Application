import axios from 'axios';

const baseURL ='http://localhost:3000' ;

const axiosInstance = axios.create({ baseURL, timeout: 120000 });
export default axiosInstance;
