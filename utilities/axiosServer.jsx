import axios from "axios";

const axiosApiIntances = axios.create({
  baseURL: process.env.URL_BACKEND,
});

export default axiosApiIntances;
