import axios from "axios";

// http://13.233.139.65/api/
export const api = axios.create({
  baseURL: "http://13.233.139.65/api",
  withCredentials: true,
});
