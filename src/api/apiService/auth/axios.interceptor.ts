// import { api } from "../../axios.config";

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const refreshRes = await api.post("/api/auth/refresh");

//       localStorage.setItem("accessToken", refreshRes.data.accessToken);

//       originalRequest.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;

//       return api(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );
