import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const url = import.meta.env.VITE_SERVER_URL;
const port = import.meta.env.VITE_SERVER_PORT;
const protocol = import.meta.env.VITE_SERVER_PROTOCOL;

const BASE_URL = `${protocol}://${url}:${port}`;
const TIMEOUT = 25000;

const defaultOpts: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: TIMEOUT,
};

export function api<T extends unknown = Record<string, unknown>>(
  options: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> {
  const opts = {
    ...defaultOpts,
    ...options,
    headers: {
      ...defaultOpts.headers,
      ...options.headers,
    },
  };
  return axios.request(opts);
}
