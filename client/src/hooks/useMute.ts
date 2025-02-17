import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { usePostData, useDeleteData, usePatchData } from "../configs/api";

type Callbacks<TResponse> = {
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: TResponse, error?: Error) => void;
};

type Props <TRequest> = {
  url: string;
  payload: TRequest,
}
const useMute = <TRequest, TResponse>(
  options?: UseMutationOptions<TResponse, Error, Props<TRequest>>
) => {
  const mutationPost = useMutation({
    mutationFn: ({ url, payload }) => {
      return usePostData<TRequest, TResponse>(url, payload);
    },
    ...options, // Allows custom callbacks (onSuccess, onError, etc.)
  });
  const mutationDelete = useMutation({
    mutationFn: ({ url }) => {
      return useDeleteData<TResponse>(url);
    },
    ...options, // Allows custom callbacks (onSuccess, onError, etc.)
  });
  const mutationPatch = useMutation({
    mutationFn: ({ url, payload }) => {
      return usePatchData<TRequest, TResponse>(url, payload);
    },
    ...options, // Allows custom callbacks (onSuccess, onError, etc.)
  });

  let mutation = mutationPost;

  return {
    request: (
      {
        url,
        method = 'POST'
      }: {
        url: string,
        method?: 'POST' | 'PATCH' | 'DELETE' 
      },
      payload: TRequest, 
      { onSuccess, onError, onSettled }: Callbacks<TResponse> = {}) => {
        if (method === 'DELETE') mutation = mutationDelete;
        if (method === 'PATCH') mutation = mutationPatch;

        return mutation.mutate(
          { url, payload },
          {
            onSuccess: (data) => {
              onSuccess && onSuccess(data);
            },
            onError: (error) => {
              onError && onError(error);
            },
            onSettled: (data, error) => {
              onSettled &&  onSettled(data, error as Error);
            },
          }
        )
      },
    requestAsync: (
      {
        url,
        method = 'POST'
      }: {
        url: string,
        method?: 'POST' | 'PATCH' | 'DELETE' 
      },
      payload: TRequest,
      { onSuccess, onError, onSettled }: Callbacks<TResponse> = {}) => {
        mutation.mutateAsync(
          { url, payload },
          {
            onSuccess: (data) => {
              onSuccess && onSuccess(data);
            },
            onError: (error) => {
              onError && onError(error);
            },
            onSettled: (data, error) => {
              onSettled &&  onSettled(data, error as Error);
            },
          }
        )
      },
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useMute;