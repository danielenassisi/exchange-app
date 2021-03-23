import axios from "axios";
import { getToken } from "./auth";

const BASE_URL = 'http://localhost:8000/api'

export const api = axios.create({
  baseURL: BASE_URL
})

export const authApi = () => axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${getToken()}`
  }
})