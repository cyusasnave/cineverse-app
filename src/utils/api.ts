import useSWR, { mutate } from "swr";
import axios, { AxiosRequestConfig } from "axios";
import { DynamicData } from "../@types/DynamicTypes";
import { toast } from "sonner";

export const API = axios.create({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  baseURL: (import.meta as any).env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

API.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await API.get(url, { ...config });
  return res.data;
};

export function useFetcher(pathname: string, options?: DynamicData) {
  const { data, isLoading, error } = useSWR(pathname, fetcher, options);

  const refetch = async () => {
    mutate(pathname, undefined, true);
    try {
      const newData = await fetcher(pathname);
      mutate(pathname, newData, false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return {
    data,
    isLoading: isLoading || (!error && !data),
    isError: error,
    isSuccess: data && !error && !isLoading,
    refetch,
  };
}
