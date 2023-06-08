import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MiIsIkhldEhhblN0cmluZyI6IjMwLzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NjAzMjAwMDAwMCIsIm5iZiI6MTY2NzA2MjgwMCwiZXhwIjoxNjk2MTc5NjAwfQ.i6JqYnGkwyHl6dkDHnjFWbPfBEl2l4SXAp4r7h9Ecpw",
  },
});

// Cấu hình headers trước khi gửi lên server:
axiosClient.interceptors.request.use((config) => {
  const isLogin = localStorage.getItem("accessToken") ? true : false;
  config.headers.Authorization = isLogin
    ? `Bearer ${localStorage.getItem("accessToken")}`
    : "";
  return config;
});

// Tìm lỗi "401" bằng console.log (error)
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = `/login?redirectUrl=${window.location.pathname}`;
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
