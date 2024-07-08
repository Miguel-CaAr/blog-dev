// ----------UTILS--------//
import axios from "axios";

//-----------STATES AND VARIABLES-----------//
const baseURL = "http://127.0.0.1:8000/api/";

//-----------FUNCTIONS-----------//
const service = axios.create({
  baseURL,
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
