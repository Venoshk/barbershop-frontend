import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (confing) => {
    const token = localStorage.getItem("token");

    if (token) {
      confing.headers.Authorization = `Bearer ${token}`;
    }

    return confing;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;