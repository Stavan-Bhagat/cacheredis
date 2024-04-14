import axios from "axios";
import { REACT_PORT } from "../Constant/constant";

const PORT =REACT_PORT  || 3001;
const API_URL = `http://localhost:${PORT}`;
export const USER_API = `${API_URL}/users`;
export const BLOG_API = `${API_URL}/blog`;

export const fetchUserData = async (setUsers) => {
  try {
    const response = await axios.get(USER_API);
    setUsers(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchBlogData = async (setBlog) => {
  try {
    const response = await axios.get(BLOG_API);
    setBlog(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
