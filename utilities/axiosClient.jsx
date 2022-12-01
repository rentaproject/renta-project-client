import axios from "axios";
import Cookies from "js-cookie";

const axiosApiIntances = axios.create({
  baseURL: process.env.URL_BACKEND,

  // baseURL: "http://localhost:8000",
});

// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      Authorization: `Bearer ${Cookies.get("token")}`, // Bearer
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApiIntances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response.data.status === 403) {
      Cookies.remove("token");
      window.location.href = "/auth/register";
    }
    return Promise.reject(error);
  }
);

export default axiosApiIntances;
