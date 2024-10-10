import axios from "axios";

const baseURL = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

export const serverInstance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "x-api-key": apiKey,
    "Content-Type": "application/json"
  },
  timeout: 60000 // 60 seconds timeout
});
