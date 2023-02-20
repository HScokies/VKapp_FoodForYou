import axios from "axios";
const API = axios.create({
    baseURL: 'https://dev.hscokies.xyz/api'
  });
export default API;