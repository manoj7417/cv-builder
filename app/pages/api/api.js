import { ThickArrowRightIcon } from "@radix-ui/react-icons";
import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const instance = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
  headers: {
    "x-api-key": apiKey,
    "Content-Type": "application/json"
  },
});

export const AnalyzeAts = async (message) => {
  try {
    const response = await instance.post("/openai/atsCheck", { message });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error;
  }
};

export const AskBot = async (message) => {
  try {
    const response = await instance.post("/openai/askBot", { message });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await instance.post("/user/login", data, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error;
  }
}


export const registerUser = async (data) => {
  try {
    const response = await instance.post("/user/register", data, {
      withCredentials: true
    });
    return response
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error
  }
}

export const getBetterResume = async (message) => {
  try {
    const response = await instance.post('/openai/generateBetterResume', { message }, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    return error
  }
}

export const printResume = async (html) => {
  try {
    const response = await fetch(`${baseURL}/api/print/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': "careerGenie_Key"
      },
      body: JSON.stringify(html)
    })
    return response;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    return error
  }
}


export const uploadImage = async (formData) => {
  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/df6f1nbmp/image/upload', formData)
    return response;
  } catch (error) {
    throw error
  }
}