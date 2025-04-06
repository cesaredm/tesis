import axios, { isAxiosError } from "axios";

const axiosConfig = axios.create({
  baseURL: "/api",
});

export {axiosConfig as axios, isAxiosError}
