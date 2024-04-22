import axios from "axios";
import { REACT_PORT } from "../Constant/constant";
import axiosInstance from "../utils/axiosInstance";
const PORT = REACT_PORT || 3001;
const API_URL = `http://localhost:${PORT}`;
export const USER_API = `${API_URL}/users`;
export const BLOG_API = `${API_URL}/blog`;

export const fetchBlogData = async () => {
  try {
    const response = await axiosInstance.get(`/blog/getblogdata`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get(`/submit/userdata`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
