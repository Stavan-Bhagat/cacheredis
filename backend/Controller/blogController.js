const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const blogService = require("../Service/blogService");

const blogController = {
  addBlogData: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded" });
      }
      const { title, description } = req.body;
      const imageUrl = req.file.path; // Cloudinary URL
      const newBlog = await blogService.addBlog({ title, description, imageUrl });
      res.status(201).json({ message: "Blog added successfully", newBlog });
    } catch (error) {
      console.error("Blog controller error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // addBlogData: async (req, res) => {
  //   try {
  //     if (!req.file) {
  //       return res.status(400).json({ error: "No image file uploaded" });
  //     }
  //     const { title, description } = req.body;
  //     const newBlog = await blogService.addBlog(
  //       { title, description },
  //       req.file
  //     );
  //     res.status(201).json({ message: "Blog added successfully", newBlog });
  //   } catch (error) {
  //     console.error("Blog controller error:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // },

  getBlogData: async (req, res) => {
    try {
      const blogData = await blogService.getBlogData();
      res.status(200).json(blogData);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteBlogData: async (req, res) => {
    try {
      const { id } = req.query;
      const blogData = await blogService.deleteBlogData(id);
      res.status(200).json(blogData);
    } catch (error) {
      console.error(`deleteblogdata controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  updateBlogData: async (req, res) => {
    try {
      const { id, title, description } = req.body;
      let imageUrl;
      if (req.file) {
        imageUrl = req.file.path;
      }
      const updateBlogData = await blogService.updateBlogData(
        id,
        title,
        description,
        imageUrl
      );
      res.status(200).json(updateBlogData);
    } catch (error) {
      console.error(`updateBlogData controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
module.exports = blogController;
