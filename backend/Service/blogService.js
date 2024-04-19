const Blog = require("../Models/blogModel");

// const secretKey = process.env.ENCRYPTED_PASSWORD_KEY;
const blogService = {
  addBlog: async (blogData, file) => {
    try {
      const { title, description } = blogData;
      
      // Check if file exists and is an image
      if (!file || !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        throw new Error("Please upload a valid image file");
      }

      const newBlog = new Blog({
        title,
        description,
        filename: file.originalname,
        contentType: file.mimetype,
        image: file.buffer,
      });

      const createdBlog = await newBlog.save();
      return createdBlog;
    } catch (error) {
      console.error("Error adding blog:", error);
      throw error;
    }
  },
  getBlogData: async () => {
    try {
      const getBlogData = await Blog.find({});
      console.log("blogdata-----------------", getBlogData);
      return getBlogData;
    } catch (error) {
      console.log("getting blog Data error ", error);
      throw error;
    }
  },
  deleteBlogData: async (id) => {
    try {
      const deleteBlogData = await Blog.findByIdAndDelete(id);
      console.log("blogdata-----------------", deleteBlogData);
      return deleteBlogData;
    } catch (error) {
      console.log("getting blog Data error ", error);
      throw error;
    }
  },
  updateBlogData: async (id, title, description) => {
    try {
      const updatedBlogData = await Blog.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
      console.log("Updated blog data:", updatedBlogData);
      return updatedBlogData;
    } catch (error) {
      console.error("Error updating blog data:", error);
      throw error;
    }
  },
};
module.exports = blogService;
