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
      console.log("title",title,"descripiton",description)
      const newBlog = await blogService.addBlog(
        { title, description },
        req.file
      );
      res.status(201).json({ message: "Blog added successfully", newBlog });
    } catch (error) {
      console.error("Blog controller error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getBlogData: async (req, res) => {
    try {
      const blogData = await blogService.getBlogData();
      console.log("dataaaaaaaaaa",blogData);
      res.status(200).json(blogData); 
    } catch (error) {
      console.error("Error fetching blog data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteBlogData: async (req, res) => {
    try {
      const { id } = req.query;
      console.log("iddddd", id);
      const blogData = await blogService.deleteBlogData(id);
      res.status(200).json(blogData);
    } catch (error) {
      console.error(`deleteblogdata controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  updateBlogData: async (req, res) => {
    console.log("reqqqqqqqqqqqqqqqq"
    ,req.body)
    try {
      const { id, title, description } = req.body;
  
  
      // Check if there's a file uploaded
      let image;
      if (req.file) {
        image = req.file.buffer; // Access the image buffer
      }
  
      const updateBlogData = await blogService.updateBlogData(
        id,
        title,
        description,
        image // Pass the image buffer to the service function
      );
  
      res.status(200).json(updateBlogData);
    } catch (error) {
      console.error(`updateBlogData controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  
};
module.exports = blogController;
