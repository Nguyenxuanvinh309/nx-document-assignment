import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useGetData } from "../configs/api";

type Props<T> = {
  url: string;
  queryKey: string[];
} & Omit<UseQueryOptions<T, unknown>, "queryKey" | "queryFn">;

const useFetch = <T>({ url, queryKey, ...options }: Props<T>) => {
  return useQuery<T, unknown>({
    queryKey: [...queryKey], // Avoids nesting issues
    queryFn: () => useGetData<T>(url), // Ensures correct typing
    ...options, // Spreads any additional options
  });
};

export default useFetch;