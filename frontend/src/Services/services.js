import axiosInstance from "../utils/axiosInstance";

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
