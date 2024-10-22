import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "https://api.ahmedhodeab.com/",
  baseURL: "http://localhost:5000/",

  //   withCredentials: true,
  //   headers: { "Access-Control-Allow-Origin": "*" },
  //   credentials: "include",
});

axiosInstance.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default axiosInstance;
