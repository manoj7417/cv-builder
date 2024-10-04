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

export const uploadImage = async (formData) => {
  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/dqsalbg0o/image/upload', formData)
    return response;
  } catch (error) {
    throw error
  }
}
