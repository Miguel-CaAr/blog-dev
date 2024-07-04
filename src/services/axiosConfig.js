// ----------UTILS--------//
import axios from "axios";

//-----------ESTADOS Y VARIABLES-----------//
const baseURL = "http://127.0.0.1:8000/api/";

//-----------FUNCIONES-----------//
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(async (request) => {});
instance.interceptors.response.use(async (request) => {});

export default instance;
