import axios from "axios";
import { AxiosRequestConfig } from "axios";

const BASE_URL = `https://hacker-news.firebaseio.com/v0`;
const TIMEOUT = 5000;

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: TIMEOUT,
};

export const api = axios.create(config);
