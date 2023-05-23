import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api", // Địa chỉ gốc của API
  // headers: {
  //   "Content-Type": "application/json",
  // },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (req) => {
  const userservice = new UserService()

  if(!req.url.includes("/api/login")  && !req.url.includes("/api/register") && !req.url.includes("/api/book")){
      const token = userservice.getToken()
      req.headers.common.Authorization = "Bearer " + token;
      return req;
  }
  
  return req;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
