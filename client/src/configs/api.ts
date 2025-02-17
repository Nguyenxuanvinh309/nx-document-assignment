// src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // Change this to your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Customize error response handling
    const message =
      error.response?.data?.message || "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

const useGetData = async (endpoint: string) => {
  try {
    const { data } = await axiosInstance.get(endpoint);
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch data");
  }
};

const usePostData = async <TRequest, TResponse>(
  endpoint: string,
  payload: TRequest
): Promise<TResponse> => {
  try {
    const { data } = await axiosInstance.post<TResponse>(endpoint, payload);
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to post data");
  }
};

const useDeleteData = async <TResponse>(
  endpoint: string,
): Promise<TResponse> => {
  try {
    const { data } = await axiosInstance.delete(endpoint);
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to useDeleteData data");
  }
};

const usePatchData = async <TRequest, TResponse>(
  endpoint: string,
  payload: TRequest
): Promise<TResponse> => {
  try {
    const { data } = await axiosInstance.patch<TResponse>(endpoint, payload);
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to update data");
  }
};

export {
  useGetData,
  usePostData,
  useDeleteData,
  usePatchData
};