// src/api/axiosInstance.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // Change this to your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error handling interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

const handleRequest = async <TResponse>(
  request: Promise<AxiosResponse<TResponse>>
): Promise<TResponse> => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "API request failed");
  }
};

// CRUD Operations
const useGetData = <TResponse>(endpoint: string, config?: AxiosRequestConfig) => 
  handleRequest<TResponse>(axiosInstance.get(endpoint, config));

const usePostData = <TRequest, TResponse>(endpoint: string, payload: TRequest, config?: AxiosRequestConfig) =>
  handleRequest<TResponse>(axiosInstance.post(endpoint, payload, config));

const useDeleteData = <TResponse>(endpoint: string, config?: AxiosRequestConfig) => 
  handleRequest<TResponse>(axiosInstance.delete(endpoint, config));

const usePatchData = <TRequest, TResponse>(endpoint: string, payload: TRequest, config?: AxiosRequestConfig) =>
  handleRequest<TResponse>(axiosInstance.patch(endpoint, payload, config));

const useApi = async <TRequest, TResponse>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  payload?: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  const requestMap = {
    GET: () => axiosInstance.get<TResponse>(endpoint, config),
    POST: () => axiosInstance.post<TResponse>(endpoint, payload, config),
    PATCH: () => axiosInstance.patch<TResponse>(endpoint, payload, config),
    DELETE: () => axiosInstance.delete<TResponse>(endpoint, config),
  };

  if (!(method in requestMap)) {
    throw new Error("Invalid HTTP method");
  }

  return handleRequest<TResponse>(requestMap[method]());
};

export { useGetData, usePostData, useDeleteData, usePatchData, useApi };
