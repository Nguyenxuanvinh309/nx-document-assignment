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

const usePostData = async <T,>(endpoint: string, payload: T) => {
  try {
    const { data } = await axiosInstance.post(endpoint, payload);
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to usePostData data");
  }
};

const useDeleteData = async (endpoint: string) => {
  try {
    const { data } = await axiosInstance.delete(endpoint);
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to useDeleteData data");
  }
};

const usePatchData = async <T,>(endpoint: string, payload: T) => {
  try {
    const { data } = await axiosInstance.patch(endpoint, payload);
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