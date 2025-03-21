import axios, { AxiosInstance } from "axios";

/**
 * NOTE: We are now using DummyJSON API instead of Escuela JS API.
 * The frontend will continue to work because we have a middleware adapter (dummyJsonAdapter.js)
 * that converts the DummyJSON API responses to match the Escuela JS API format.
 * 
 * This is just a fallback client for any direct axios calls that might exist in the codebase.
 * Most API calls should go through the api.js service which uses our middleware adapter.
 */
const api: AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  withCredentials: false,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export default api; 