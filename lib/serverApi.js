import { RemoveTokens } from "@/app/actions";
import axios from "axios";
import { toast } from "react-toastify";

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




// 🔹 Response Interceptor: Handle Expired Tokens
serverInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("🔴 Token expired! Logging out..."); // Debugging

      await RemoveTokens(); // Clear tokens from cookies/localStorage
      toast.error("Session expired. Please log in again.");

      // ✅ Redirect using `window.location.href`
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

