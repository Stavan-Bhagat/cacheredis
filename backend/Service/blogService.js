const Blog = require("../Models/blogModel");

// const secretKey = process.env.ENCRYPTED_PASSWORD_KEY;
const blogService = {

    addBlog: async (blogData) => {
        try {
          const createBlog = await Blog.create({
            title: blogData.title,
            description: blogData.description,
          });
          console.log("present blog", createBlog);
          return createBlog;
        } catch (error) {
          console.log("blog service register error ", error);
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
    }
    module.exports=blogService;