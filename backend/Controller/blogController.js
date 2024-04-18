const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const blogService = require("../Service/blogService");

const blogController = {
  addBlogData: async (req, res) => {
    try {
      const { title,description } = req.body;
      console.log("addblogData", title, description);
      const getBlogData = await blogService.addBlog({
        title,
        description,
      });
      res
        .status(201)
        .json({ message: "blog add successfully", getBlogData });
    } catch (error) {
      console.error(`blog controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getBlogData: async (req, res) => {
    try {
      const blogData = await blogService.getBlogData();
      res.status(200).json(blogData);
    } catch (error) {
      console.error(`getblogData controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
module.exports = blogController;
