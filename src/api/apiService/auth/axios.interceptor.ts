import { store } from "../../../store";
import { clearAuth, setAuth } from "../../../store/slice/Auth/auth.slice";
import { api } from "../../axios.config";

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Not an auth error
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      store.dispatch(clearAuth());
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await api.get("/auth/refresh-token");

      const { accessToken, user } = response.data;
      console.log("The access token is inovked in the fronted", response);
      store.dispatch(
        setAuth({
          userId: user.id,
          role: user.role,
          email: user.email,
          name: user.name,
          patientId: user.patientId || null,
          hospitalId: user.hospitalId || null,
          doctorId: user.doctorId || null,
          accessToken,
          forcePasswordReset: user.forcePasswordReset ? true : false,
        })
      );

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (err) {
      store.dispatch(clearAuth());
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);
