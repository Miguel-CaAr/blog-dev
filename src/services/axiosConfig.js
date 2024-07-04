// ----------UTILS--------//
import axios from "axios";

//-----------STATES AND VARIABLES-----------//
const baseURL = "http://127.0.0.1:8000/api/";

//-----------FUNCTIONS-----------//
const instance = axios.create({
  baseURL,
});

// instance.interceptors.request.use(async (request) => {});
// instance.interceptors.response.use(async (request) => {});

export default instance;
