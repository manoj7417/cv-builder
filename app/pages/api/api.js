import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const instance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "x-api-key": apiKey,
    "Content-Type": "application/json"
  },
});

export const AnalyzeAts = async (message) => {
  try {
    const response = await instance.post("/openai/atsCheck", {message});
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error;
  }
};

export const AskBot = async (message) => {
  try {
    const response = await instance.post("/openai/askBot", {message});
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error;
  }
};
