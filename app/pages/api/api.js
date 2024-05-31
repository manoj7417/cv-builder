
import { GetTokens } from "@/app/actions";
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

export const getUserResume = async () => {
  try {
    const response = await instance.get('/user/resume', { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error creating user:", error.response || error);
    throw error
  }
}

export const getUserResumes = async (token) => {
  try {
    const response = await instance.get('/resume/allResume', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error getting user:", error.response || error);
    throw error
  }
}

export const createNewResume = async (token) => {
  try {
    const response = await instance.post('/resume/create', '', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    console.error("Error creating resume:", error.response || error);
    throw error
  }
}

export const deleteUserResume = async (id, token) => {
  try {
    const response = await instance.delete(`/resume/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    console.error("Error deleting resume:", error.response || error);
    throw error
  }
}